import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "react-datepicker/dist/react-datepicker.css";
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Router.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'
import { HelmetProvider } from 'react-helmet-async'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <Toaster />
          <RouterProvider router={router} />
        </HelmetProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
