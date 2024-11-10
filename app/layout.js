import Nav from "./components/Nav";
import "./globals.css";

export const metadata = {
  title: "Post App",
  description: "Post App by RACE"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
