# Hostinger Deployment Checklist

This site is configured for a static Hostinger/LiteSpeed deployment. The production build outputs the upload-ready files into `out/`.

## 1. Set Production Environment Variables

Set these before building:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
GOOGLE_DRIVE_API_KEY=your_google_drive_api_key_here
```

`NEXT_PUBLIC_SITE_URL` controls canonical URLs, Open Graph URLs, `robots.txt`, and `sitemap.xml`.

`NEXT_PUBLIC_GA_MEASUREMENT_ID` enables Google Analytics 4. Leave it empty if analytics should be disabled.

`GOOGLE_DRIVE_API_KEY` is only needed at build time so the static `/work/` page can sync the latest public Drive portfolio snapshot.

## 2. Build

```bash
npm install
npm run build:hostinger
```

Upload the contents of the generated `out/` folder to Hostinger's `public_html` directory. Do not upload the project root as-is.

## 3. Hostinger Settings

In Hostinger hPanel, enable:

- SSL certificate and force HTTPS
- CDN, if included in the business plan
- LiteSpeed Cache / server cache
- Web Application Firewall or malware scanner, if available
- automatic backups

The included `public/.htaccess` adds HTTPS redirect, directory listing protection, browser cache rules, compression, security headers, basic method blocking, and common scanner URL blocking.

## 4. DDoS And Rate Limiting

For a static site, true DDoS protection and rate limiting must happen before requests hit the files. Use Hostinger CDN/WAF or put the domain behind Cloudflare and enable:

- DNS proxy/CDN
- WAF managed rules
- bot fight / bot protection
- rate limiting for aggressive paths
- "Under Attack" mode during traffic spikes

The site currently has no public backend endpoint. The contact form opens a mail draft, so there is nothing server-side here to rate-limit.

## 5. Google Search Setup

After deployment:

1. Add the domain in Google Search Console.
2. Submit `https://your-domain.com/sitemap.xml`.
3. Confirm `https://your-domain.com/robots.txt` is reachable.
4. Use PageSpeed Insights after the CDN has warmed.

## 6. Google Analytics Setup

Create a GA4 Web Data Stream in Google Analytics, copy the measurement ID that starts with `G-`, and set it as:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Rebuild and upload `out/` again after changing the measurement ID.
