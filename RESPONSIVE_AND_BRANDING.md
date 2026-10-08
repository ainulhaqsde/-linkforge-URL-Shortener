# Branding and responsive UI

- Removed the external developer portfolio links from the header and footer.
- Retained LinkForge branding and Ainul Haq attribution.
- Copyright notice is limited to original contributions and enhancements; existing third-party rights remain applicable.
- Layout has mobile breakpoints at 650px and 380px, responsive form fields, wrapping actions, and horizontal-overflow safeguards.

## Test on your devices

Open Chrome DevTools (F12), toggle Device Toolbar (Ctrl+Shift+M), and test widths 320, 375, 390, 768, 1024, and 1440 px. Verify URL submission, link copying, QR display, analytics, keyboard navigation, and no horizontal scrolling. Actual device/browser validation is still recommended.

## Rebuild

`docker compose up --build -d`

Then hard-refresh the page (Ctrl+Shift+R).
