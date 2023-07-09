import { QueryClient, QueryClientProvider } from 'react-query'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabase'
import { useEffect , ReactNode } from 'react'

declare module "react-query/types/react/QueryClientProvider" {
  interface QueryClientProviderProps {
    children?: ReactNode;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  const { push, pathname } = useRouter()
  const validateSession = async () => {
    const user = supabase.auth.user()
    if (user && pathname === '/') push('/notes')
    if (!user && pathname !== '/') await push('/')
  }
  supabase.auth.onAuthStateChange((event, _) => {
    if (event === 'SIGNED_IN' && pathname === '/') push('/notes')
    if (event === 'SIGNED_OUT') push('/')
  })
  useEffect(() => {
    validateSession()
  }, [])
  
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />

    </QueryClientProvider>
  ) 
}

export default MyApp
