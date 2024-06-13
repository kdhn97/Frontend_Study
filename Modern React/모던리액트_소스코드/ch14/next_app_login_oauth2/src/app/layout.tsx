import './globals.css'
import Header from './Header';
import Provider from "./Provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Provider>
      <body>
        <Header/>
        {children}
      </body>
      </Provider>
    </html>
  )
}
