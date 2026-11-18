import "./globals.css";

export const metadata = {
  title: "Dhruvin · Senior Web Designer & Software Developer",
  description:
    "Senior web designer and software developer. Web development, web design, UI/UX design, and software development for modern digital experiences.",
  icons: {
    icon: "/favicon-32.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ECEAE2",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="is3d">
      <head>
        <link
          rel="preload"
          href="/fonts/bebas-neue-pro-semiexp-bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/bebas-neue-pro-semiexp-middle.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Geist:wght@300;400;500&family=Geist+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
