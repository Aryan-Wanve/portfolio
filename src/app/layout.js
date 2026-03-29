import "./globals.css";

export const metadata = {
  title: "Aryan Visuals",
  description: "Portfolio landing page for a video editor and visual storyteller",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
