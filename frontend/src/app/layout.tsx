import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TripPlanner - Your Ultimate Guide to Unforgettable Journeys",
  description: "Discover hidden gems and local secrets with TripPlanner. Plan your perfect trip with authentic travel experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
