"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

function formatTitle(title) {
  return title.replace(/\.(mp4|mov)$/i, "").replace(/^Copy of\s+/i, "");
}

function buildPreviewUrl(id) {
  return `https://drive.google.com/file/d/${id}/preview`;
}

function buildThumbnailUrl(id) {
  return `https://drive.google.com/thumbnail?id=${id}&sz=w1200`;
}

function buildThumbnailCandidates(id) {
  return [
    `https://drive.google.com/thumbnail?id=${id}&sz=w1200`,
    `https://drive.google.com/thumbnail?id=${id}&sz=w800`,
    `https://drive.google.com/thumbnail?id=${id}&sz=w600`,
  ];
}

export default function WorkPageClient({ groups, portfolioRootId, isDynamic }) {
  const [activeFolder, setActiveFolder] = useState(groups[0]?.genre ?? null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [videoRatios, setVideoRatios] = useState({});
  const [thumbnailAttempts, setThumbnailAttempts] = useState({});
  const totalVideos = useMemo(
    () => groups.reduce((sum, group) => sum + group.videos.length, 0),
    [groups]
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveVideo(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeVideo ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeVideo]);

  const selectedFolder = groups.find((group) => group.genre === activeFolder) ?? groups[0];

  const handleThumbnailLoad = (videoId, event) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;

    if (!naturalWidth || !naturalHeight) {
      return;
    }

    const ratio = naturalWidth / naturalHeight;

    setVideoRatios((current) => {
      const previous = current[videoId];
      if (previous && Math.abs(previous - ratio) < 0.01) {
        return current;
      }

      return { ...current, [videoId]: ratio };
    });
  };

  const handleThumbnailError = (videoId) => {
    setThumbnailAttempts((current) => {
      const nextAttempt = (current[videoId] ?? 0) + 1;
      return { ...current, [videoId]: nextAttempt };
    });
  };

  return (
    <>
      <main className="work-page work-page-drive">
        <div className="work-cloud work-cloud-one" />
        <div className="work-cloud work-cloud-two" />
        <div className="work-cloud work-cloud-three" />

        <header className="work-topbar">
          <Link className="brand" href="/">
            Aryan Wanve
          </Link>
          <nav className="topnav" aria-label="Work navigation">
            <Link href="/">Home</Link>
            <a href="#folders">Folders</a>
            <a href={`https://drive.google.com/drive/folders/${portfolioRootId}`}>Drive</a>
          </nav>
        </header>

        <section className="work-drive-hero">
          <p className="eyebrow">Work</p>
          <h1>
            <span className="work-hero-line">Visual stories,</span>
            <span className="work-hero-line">That don’t get skipped.</span>
          </h1>
          <p className="work-hero-copy">
            Ads, brands, and cinematic edits designed to hold attention and convert.
            Scroll through the work, every frame has intent.
          </p>

          <div className="work-drive-pills">
            <span>{groups.length} folders</span>
            <span>{totalVideos} videos</span>
            <span>{isDynamic ? "Auto-sync active" : "Fallback snapshot"}</span>
          </div>
        </section>

        <section className="drive-shell" id="folders">
          <aside className="drive-sidebar">
            <div className="drive-sidebar-heading">
              <p className="eyebrow">Folder view</p>
              <h2>Genres</h2>
            </div>

            <div className="drive-folder-list" role="tablist" aria-label="Portfolio folders">
              {groups.map((group, index) => {
                const isActive = group.genre === selectedFolder?.genre;
                return (
                  <button
                    key={group.genre}
                    className={`drive-folder-card ${isActive ? "drive-folder-card-active" : ""}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveFolder(group.genre)}
                    style={{ "--folder-delay": `${index * 70}ms` }}
                  >
                    <div className="drive-folder-icon" aria-hidden="true">
                      <span className="drive-folder-notch" />
                    </div>
                    <div className="drive-folder-meta">
                      <strong>{group.genre}</strong>
                      <span>
                        {group.videos.length} file{group.videos.length > 1 ? "s" : ""}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="drive-stage" aria-live="polite">
            {selectedFolder ? (
              <>
                <div className="drive-stage-header">
                  <div>
                    <p className="eyebrow">Opened folder</p>
                    <h2>{selectedFolder.genre}</h2>
                  </div>
                  <a
                    className="button button-ghost"
                    href={`https://drive.google.com/drive/folders/${selectedFolder.folderId}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open in Drive
                  </a>
                </div>

                <div className="drive-video-grid">
                  {selectedFolder.videos.map((video, index) => (
                    (() => {
                      const thumbnailCandidates = buildThumbnailCandidates(video.id);
                      const currentAttempt = thumbnailAttempts[video.id] ?? 0;
                      const thumbnailSrc = thumbnailCandidates[currentAttempt];
                      const hasThumbnail = Boolean(thumbnailSrc);

                      return (
                        <button
                          className="drive-video-card"
                          key={video.id}
                          type="button"
                          onClick={() =>
                            setActiveVideo({
                              ...video,
                              genre: selectedFolder.genre,
                              folderId: selectedFolder.folderId,
                            })
                          }
                          style={{ "--card-delay": `${index * 90}ms` }}
                        >
                          <div
                            className={`drive-video-thumb-wrap ${!hasThumbnail ? "drive-video-thumb-fallback" : ""}`}
                            style={{ "--thumb-aspect": videoRatios[video.id] ?? 16 / 10 }}
                          >
                            {hasThumbnail ? (
                              <Image
                                className="drive-video-thumb"
                                src={thumbnailSrc}
                                alt={`${formatTitle(video.title)} thumbnail`}
                                fill
                                sizes="(max-width: 960px) 100vw, 40vw"
                                unoptimized
                                onLoad={(event) => handleThumbnailLoad(video.id, event)}
                                onError={() => handleThumbnailError(video.id)}
                              />
                            ) : (
                              <div className="drive-video-thumb-placeholder" aria-hidden="true">
                                <span>{selectedFolder.genre}</span>
                              </div>
                            )}
                            <span className="drive-video-play">Play</span>
                          </div>
                          <div className="drive-video-copy">
                            <span className="drive-video-tag">{selectedFolder.genre}</span>
                            <strong>{formatTitle(video.title)}</strong>
                          </div>
                        </button>
                      );
                    })()
                  ))}
                </div>
              </>
            ) : (
              <div className="drive-empty-state">
                <p className="eyebrow">No content</p>
                <h2>Nothing found yet.</h2>
                <p>Add public video files to the Drive folders and this page will pick them up.</p>
              </div>
            )}
          </section>
        </section>
      </main>

      {activeVideo ? (
        <div className="video-modal" role="dialog" aria-modal="true" aria-label={activeVideo.title}>
          <button
            className="video-modal-backdrop"
            type="button"
            aria-label="Close preview"
            onClick={() => setActiveVideo(null)}
          />

          <div className="video-modal-panel">
            <div className="video-modal-meta">
              <p className="eyebrow">{activeVideo.genre}</p>
              <h2>{formatTitle(activeVideo.title)}</h2>
              <p>
                This opens from the public Google Drive preview so audio and playback controls
                stay available in the expanded player.
              </p>
            </div>

            <div className="video-modal-frame">
              <iframe
                src={buildPreviewUrl(activeVideo.id)}
                title={activeVideo.title}
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>

            <div className="video-modal-actions">
              <a
                className="button button-ghost"
                href={`https://drive.google.com/file/d/${activeVideo.id}/view`}
                target="_blank"
                rel="noreferrer"
              >
                Open in Drive
              </a>
              <button
                className="button button-solid"
                type="button"
                onClick={() => setActiveVideo(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
