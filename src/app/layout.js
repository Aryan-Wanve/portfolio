import "./globals.css";

export const metadata = {
  title: "Aryan Wanve | Oneway",
  description: "Portfolio landing page for Aryan Wanve and the Oneway creative identity",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
