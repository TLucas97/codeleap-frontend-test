import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import MainPage from './pages/MainPage';
import ErrorPage from './ErrorPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { store } from './store';
import { Provider } from 'react-redux';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/main',
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div className="w-full h-screen bg-metal font-sans">
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
