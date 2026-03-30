import "./globals.css";

export const metadata = {
  title: "Aryan Wanve",
  description: "Portfolio landing page for Aryan Wanve",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
