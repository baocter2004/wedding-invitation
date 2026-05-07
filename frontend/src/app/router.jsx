import { createBrowserRouter } from 'react-router-dom';
import PublicLayout from '../shared/layouts/PublicLayout';
import AuthLayout from '../shared/layouts/AuthLayout';
import CustomerLayout from '../shared/layouts/CustomerLayout';
import AdminLayout from '../shared/layouts/AdminLayout';

import HomePage from '../features/public/pages/HomePage';
import TemplatesPage from '../features/public/pages/TemplatesPage';
import TemplatePreviewPage from '../features/public/pages/TemplatePreviewPage';
import PublicWeddingPage from '../features/public/pages/PublicWeddingPage';

import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';

import CustomerDashboardPage from '../features/customer/pages/CustomerDashboardPage';
import WeddingListPage from '../features/customer/pages/WeddingListPage';

import AdminDashboardPage from '../features/admin/pages/AdminDashboardPage';
import AdminUserListPage from '../features/admin/pages/users/AdminUserListPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'templates', element: <TemplatesPage /> },
    ],
  },
  {
    path: '/templates/:code',
    element: <TemplatePreviewPage />,
  },
  {
    path: '/w/:slug',
    element: <PublicWeddingPage />,
  },
  {
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
  {
    path: '/customer',
    element: <CustomerLayout />,
    children: [
      { path: 'dashboard', element: <CustomerDashboardPage /> },
      { path: 'weddings', element: <WeddingListPage /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { path: 'dashboard', element: <AdminDashboardPage /> },
      { path: 'users', element: <AdminUserListPage /> },
    ],
  },
]);
