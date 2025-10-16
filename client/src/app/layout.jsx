import "../styles/globals.css";
import NavBar from "@/components/NavBar";

export const metadata = {
  title: "OurShelves",
  description: "Track the books you’re reading and progress in each book.",
  icons: {
    icon: "/Favicon.png"
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main className="page">
          {children}
        </main>
      </body>
    </html>
  );
}