import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Manjeshwar Division Sahithyolsav",
  description: "India's Largest Chain Event",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`min-h-screen ${inter.className}`}>
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}