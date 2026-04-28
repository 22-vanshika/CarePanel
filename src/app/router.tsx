// Defines the global React Router browser routing configuration.
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import MainLayout from '@app/layouts/MainLayout'
import AuthLayout from '@app/layouts/AuthLayout'
import LoginPage from '@modules/auth/pages/LoginPage';
import PageSkeleton from '@shared/components/PageSkeleton';
import PrivateRoute from '@modules/auth/components/PrivateRoute'
import ErrorBoundary from '@shared/components/ErrorBoundary'

// Lazy load all protected pages
const DashboardPage = lazy(() => import('@modules/analytics/pages/DashboardPage'))
const PatientsPage = lazy(() => import('@modules/patients/pages/PatientsPage'))
const PatientDetailPage = lazy(() => import('@modules/patients/pages/PatientDetailPage'))
const AnalyticsPage = lazy(() => import('@modules/analytics/pages/AnalyticsPage'))

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/dashboard" replace />
    },
    {
        element: <AuthLayout />,
        children: [
            { path: '/login', element: <LoginPage /> }
        ]
    },
    {
        element: <PrivateRoute><MainLayout /></PrivateRoute>,
        errorElement: <ErrorBoundary />,
        children: [
            { path: '/dashboard', element: <Suspense fallback={<PageSkeleton/>}><DashboardPage /></Suspense> },
            { path: '/patients', element: <Suspense fallback={<PageSkeleton/>}><PatientsPage /></Suspense> },
            { path: '/patients/:id', element: <Suspense fallback={<PageSkeleton/>}><PatientDetailPage /></Suspense> },
            { path: '/analytics', element: <Suspense fallback={<PageSkeleton/>}><AnalyticsPage /></Suspense> },
        ]
    }
])