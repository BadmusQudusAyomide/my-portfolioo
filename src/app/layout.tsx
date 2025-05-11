import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Badmus Qudus Ayomide | Full Stack Developer",
    template: "%s | Badmus Qudus"
  },
  description: "Portfolio of Badmus Qudus Ayomide, a passionate full stack developer specializing in React, Next.js, and Node.js.",
  keywords: [
    "Badmus Qudus Ayomide",
    "Badmus Qudus",
    "Badmus",
    "Adufe",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Portfolio",
    "Web Developer",
    "Frontend Engineer",
    "Tailwind CSS",
    "TypeScript",
    "Flutter Developer"
  ],
  authors: [{ 
    name: "Badmus Qudus Ayomide", 
    url: "https://badmusqudusayomide.vercel.app/" 
  }],
  metadataBase: new URL("https://badmusqudusayomide.vercel.app"),
  openGraph: {
    title: "Badmus Qudus | Full Stack Developer",
    description: "Building modern web applications with React, Next.js, and Tailwind CSS",
    url: "https://badmusqudusayomide.vercel.app",
    siteName: "Badmus Qudus Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Badmus Qudus Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Badmus Qudus | Full Stack Developer",
    description: "Building modern web applications with React, Next.js, and Tailwind CSS",
    creator: "@AyomideQud49713",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
    
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  verification: {
    google: "bQPghGL9pRGvrRLNXuoSsTMXJOZw5MF3aZKEjkys2O8",
  },
  alternates: {
    canonical: 'https://badmusqudusayomide.vercel.app',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${robotoMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Favicon Links */}
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#6366f1" />
        <meta name="msapplication-TileColor" content="#6366f1" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#111827" media="(prefers-color-scheme: dark)" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/_next/static/media/your-font-file.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Badmus Qudus Ayomide",
            "jobTitle": "Full Stack Developer",
            "url": "https://badmusqudusayomide.vercel.app/",
            "sameAs": [
              "https://github.com/BadmusQudusAyomide",
              "https://ng.linkedin.com/in/qudus-ayomide-badmus",
              "https://x.com/AyomideQud49713"
            ],
            "description": "Full Stack Developer specializing in React, Next.js, Tailwind CSS and modern web technologies.",
            "skills": [
              "React",
              "Next.js",
              "TypeScript",
              "Tailwind CSS",
              "Node.js",
              "UI/UX Design",
              "Flutter"
            ],
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "Nigeria"
            }
          })}
        </script>
      </head>
      <body className={`${inter.className} bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}