import Header from "@/components/Header/header";
import "@/styles/globals.css";


export default function LandingLayout({ children }) {
    return (
      <html lang="en">
            <body>
          <Header/>

                    {children}
            </body>
      </html>
    )
  }