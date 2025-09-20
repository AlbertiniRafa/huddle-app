import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Huddle - Where Sports Families Connect",
  description: "Join Huddle, the social platform for active families. Find activities, book venues, and connect with like-minded sports families in your area.",
  keywords: "sports, families, activities, social, community, fitness, kids sports, family fitness, London sports",
  authors: [{ name: "Huddle Team" }],
  creator: "Huddle",
  publisher: "Huddle",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://huddleapp.uk'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Huddle - Where Sports Families Connect",
    description: "The social platform for active families. Find activities, book venues, and connect with sports families.",
    url: 'https://huddleapp.uk',
    siteName: 'Huddle',
    images: [
      {
        url: '/icon-512.png',
        width: 512,
        height: 512,
        alt: 'Huddle - Sports Community',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Huddle - Where Sports Families Connect",
    description: "The social platform for active families. Find activities, book venues, and connect with sports families.",
    images: ['/icon-512.png'],
    creator: '@HuddleAppUK',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Huddle',
  },
  applicationName: 'Huddle',
  referrer: 'origin-when-cross-origin',
  category: 'sports',
  classification: 'Sports & Fitness',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <head>
        {/* PWA Meta Tags */}
        <meta name="application-name" content="Huddle" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Huddle" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#3B82F6" />

        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Icons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icon-192.png" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icon-192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icon-192.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icon-192.png" />

        {/* Splash Screens for iOS */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
              
              // Handle install prompt
              let deferredPrompt;
              window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                deferredPrompt = e;
                // Show install button or banner
                console.log('Install prompt available');
              });
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
