import './globals.css'
import Header from './Header';
import AuthProvider from "./Provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <AuthProvider>
      <body>
        <Header/>
        {children}
      </body>
      </AuthProvider>
    </html>
  )
}
