import { fallbackPortfolioGroups, portfolioRootId } from "./portfolioData";

const DRIVE_BASE_URL = "https://drive.google.com/drive/folders";
const DRIVE_API_BASE_URL = "https://www.googleapis.com/drive/v3/files";
const GOOGLE_DRIVE_API_KEY = process.env.GOOGLE_DRIVE_API_KEY;
const DRIVE_REFRESH_SECONDS = 60;

function escapeForRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function decodeDriveText(value) {
  return value
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/\\x22/g, '"')
    .replace(/\\x5b/g, "[")
    .replace(/\\x5d/g, "]")
    .replace(/\\\//g, "/")
    .replace(/\\"/g, '"');
}

async function fetchFolderHtml(folderId) {
  const response = await fetch(`${DRIVE_BASE_URL}/${folderId}`, {
    next: { revalidate: DRIVE_REFRESH_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Drive fetch failed for folder ${folderId}: ${response.status}`);
  }

  return response.text();
}

async function fetchDriveApiList({ q, fields, orderBy = "name_natural" }) {
  const params = new URLSearchParams({
    key: GOOGLE_DRIVE_API_KEY ?? "",
    q,
    fields,
    orderBy,
    pageSize: "1000",
    includeItemsFromAllDrives: "true",
    supportsAllDrives: "true",
  });

  const response = await fetch(`${DRIVE_API_BASE_URL}?${params.toString()}`, {
    next: { revalidate: DRIVE_REFRESH_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Drive API request failed: ${response.status}`);
  }

  return response.json();
}

function extractFolders(html, parentId) {
  const pattern = new RegExp(
    `\\\\x5b\\\\x22([A-Za-z0-9_-]+)\\\\x22,\\\\x5b\\\\x22${escapeForRegex(parentId)}\\\\x22\\\\x5d,\\\\x22([^\\\\]+?)\\\\x22,\\\\x22application\\\\/vnd.google-apps.folder\\\\x22`,
    "g"
  );

  return Array.from(html.matchAll(pattern)).map((match) => ({
    folderId: match[1],
    genre: decodeDriveText(match[2]),
  }));
}

function extractVideos(html, parentId) {
  const pattern = new RegExp(
    `\\\\x5b\\\\x22([A-Za-z0-9_-]+)\\\\x22,\\\\x5b\\\\x22${escapeForRegex(parentId)}\\\\x22\\\\x5d,\\\\x22([^\\\\]+?)\\\\x22,\\\\x22(video\\\\/[^\\\\]+?)\\\\x22`,
    "g"
  );

  return Array.from(html.matchAll(pattern)).map((match) => ({
    id: match[1],
    title: decodeDriveText(match[2]),
    mime: decodeDriveText(match[3]),
  }));
}

async function getPortfolioGroupsFromApi() {
  if (!GOOGLE_DRIVE_API_KEY) {
    throw new Error("Missing GOOGLE_DRIVE_API_KEY");
  }

  const folderResponse = await fetchDriveApiList({
    q: `'${portfolioRootId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
    fields: "files(id,name)",
  });

  const folders = (folderResponse.files ?? []).map((folder) => ({
    folderId: folder.id,
    genre: folder.name,
  }));

  if (!folders.length) {
    return fallbackPortfolioGroups;
  }

  const groups = await Promise.all(
    folders.map(async (folder) => {
      const filesResponse = await fetchDriveApiList({
        q: `'${folder.folderId}' in parents and trashed = false`,
        fields: "files(id,name,mimeType)",
      });

      const videos = (filesResponse.files ?? [])
        .filter((file) => typeof file.mimeType === "string" && file.mimeType.startsWith("video/"))
        .map((file) => ({
          id: file.id,
          title: file.name,
        }));

      return {
        ...folder,
        videos,
      };
    })
  );

  const nonEmptyGroups = groups.filter((group) => group.videos.length > 0);
  return nonEmptyGroups.length ? nonEmptyGroups : fallbackPortfolioGroups;
}

async function getPortfolioGroupsFromScrape() {
  const rootHtml = await fetchFolderHtml(portfolioRootId);
  const folders = extractFolders(rootHtml, portfolioRootId);

  if (!folders.length) {
    return fallbackPortfolioGroups;
  }

  const groups = await Promise.all(
    folders.map(async (folder) => {
      const folderHtml = await fetchFolderHtml(folder.folderId);
      const videos = extractVideos(folderHtml, folder.folderId).map(({ id, title }) => ({
        id,
        title,
      }));

      return {
        ...folder,
        videos,
      };
    })
  );

  const nonEmptyGroups = groups.filter((group) => group.videos.length > 0);
  return nonEmptyGroups.length ? nonEmptyGroups : fallbackPortfolioGroups;
}

export async function getPortfolioGroups() {
  try {
    return await getPortfolioGroupsFromApi();
  } catch (error) {
    if (GOOGLE_DRIVE_API_KEY) {
      console.error("Drive API sync failed, falling back to scrape:", error);
    }
  }

  try {
    return await getPortfolioGroupsFromScrape();
  } catch (error) {
    console.error("Drive scrape fallback failed:", error);
    return fallbackPortfolioGroups;
  }
}
