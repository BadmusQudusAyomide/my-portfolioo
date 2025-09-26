import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import ParticlesBackground from "../components/ParticlesBackground";

export const viewport = { width: "device-width", initialScale: 1 };

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
  applicationName: "Badmus Qudus Portfolio",
  title: {
    default: "Badmus Qudus Ayomide | Full Stack Developer",
    template: "%s | Badmus Qudus Ayomide",
  },
  description:
    "Portfolio of Badmus Qudus Ayomide, a passionate full stack developer specializing in React, Next.js, and Node.js.",
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
    "Flutter Developer",
  ],
  authors: [
    {
      name: "Badmus Qudus Ayomide",
      url: "https://badmusqudusayomide.vercel.app/",
    },
  ],
  metadataBase: new URL("https://badmusqudusayomide.vercel.app"),
  openGraph: {
    title: "Badmus Qudus | Full Stack Developer",
    description:
      "Building modern web applications with React, Next.js, and Tailwind CSS",
    url: "https://badmusqudusayomide.vercel.app",
    siteName: "Badmus Qudus Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Badmus Qudus Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Badmus Qudus | Full Stack Developer",
    description:
      "Building modern web applications with React, Next.js, and Tailwind CSS",
    creator: "@AyomideQud49713",
    site: "@AyomideQud49713",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png?v=2", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png?v=2", type: "image/png", sizes: "16x16" },
    ],
    shortcut: "/favicon.ico?v=2",
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
    canonical: "https://badmusqudusayomide.vercel.app",
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
        <meta name="msapplication-TileColor" content="#6366f1" />
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#111827"
          media="(prefers-color-scheme: dark)"
        />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Removed invalid font preload (file not present) */}

        {/* Structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Badmus Qudus Ayomide",
            jobTitle: "Full Stack Developer",
            image: "https://badmusqudusayomide.vercel.app/og-image.png",
            url: "https://badmusqudusayomide.vercel.app/",
            sameAs: [
              "https://github.com/BadmusQudusAyomide",
              "https://ng.linkedin.com/in/qudus-ayomide-badmus",
              "https://x.com/AyomideQud49713",
            ],
            description:
              "Full Stack Developer specializing in React, Next.js, Tailwind CSS and modern web technologies.",
            skills: [
              "React",
              "Next.js",
              "TypeScript",
              "Tailwind CSS",
              "Node.js",
              "UI/UX Design",
              "Flutter",
            ],
            address: {
              "@type": "PostalAddress",
              addressCountry: "Nigeria",
            },
          })}
        </script>
        {/* WebSite structured data with SearchAction */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Badmus Qudus Portfolio",
            url: "https://badmusqudusayomide.vercel.app/",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://badmusqudusayomide.vercel.app/?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          })}
        </script>
        {/* Breadcrumb structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://badmusqudusayomide.vercel.app/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "About",
                item: "https://badmusqudusayomide.vercel.app/#about",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Projects",
                item: "https://badmusqudusayomide.vercel.app/#projects",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Contact",
                item: "https://badmusqudusayomide.vercel.app/#contact",
              },
            ],
          })}
        </script>
      </head>
      <body
        className={`${inter.className} bg-[#0b0a1f] text-gray-100 antialiased min-h-screen relative`}
      >
        <ParticlesBackground />
        {children}
      </body>
    </html>
  );
}
