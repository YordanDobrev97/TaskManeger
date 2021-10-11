import Navbar from '../components/Navbar'
import { AuthContextProvider } from '../context/authContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : (
        <AuthContextProvider>
          <Navbar />
          <Component {...pageProps} />
        </AuthContextProvider>
      )}
    </div>
  )
}

export default MyApp
