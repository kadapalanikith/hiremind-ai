import { RouterProvider } from 'react-router';
import { Toaster } from 'react-hot-toast';
import router from './app.routes.jsx';
import { AuthProvider } from './features/auth/auth.context';
import { InterviewProvider } from './features/interview/interview.context';

function App() {
  return (
    <AuthProvider>
      <InterviewProvider>
        <RouterProvider router={router} />
        {/* Global toast notification system */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              fontFamily: 'var(--font)',
              fontSize: '0.9375rem',
              borderRadius: '0.75rem',
              padding: '0.875rem 1.25rem',
              boxShadow: '0 8px 40px rgba(25, 28, 29, 0.12)',
            },
            success: {
              style: {
                background: 'rgba(0, 116, 68, 0.95)',
                color: 'white',
              },
              iconTheme: { primary: 'white', secondary: 'rgba(0,116,68,0.95)' },
            },
            error: {
              style: {
                background: 'rgba(186, 26, 26, 0.95)',
                color: 'white',
              },
              iconTheme: { primary: 'white', secondary: 'rgba(186,26,26,0.95)' },
            },
            loading: {
              style: {
                background: 'rgba(51, 54, 151, 0.95)',
                color: 'white',
              },
              iconTheme: { primary: 'white', secondary: 'rgba(51,54,151,0.95)' },
            },
          }}
        />
      </InterviewProvider>
    </AuthProvider>
  );
}

export default App;
