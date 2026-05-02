// Router factory - creates the router with all component imports
import { createBrowserRouter, Navigate, useRouteError } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import MainLayout from '@app/layouts/MainLayout'
import AuthLayout from '@app/layouts/AuthLayout'
import LoginPage from '@modules/auth/pages/LoginPage';
import PageSkeleton from '@shared/components/PageSkeleton';
import PrivateRoute from '@modules/auth/components/PrivateRoute'

// Lazy load all protected pages
const DashboardPage = lazy(() => import('@modules/analytics/pages/DashboardPage'))
const PatientsPage = lazy(() => import('@modules/patients/pages/PatientsPage'))
const PatientDetailPage = lazy(() => import('@modules/patients/pages/PatientDetailPage'))
const AnalyticsPage = lazy(() => import('@modules/analytics/pages/AnalyticsPage'))

/**
 * RouteErrorBoundary: React Router v6+ errorElement must be a functional
 * component that calls useRouteError() — NOT a class-based Error Boundary.
 * Using a class component here caused a blank screen because it received
 * no `children` prop and immediately rendered its error fallback UI.
 */
const RouteErrorBoundary = () => {
    const error = useRouteError() as { statusText?: string; message?: string } | null;
    const message = error?.statusText ?? error?.message ?? 'An unexpected error occurred.';

    return (
        <div className="flex items-center justify-center min-h-screen bg-[var(--color-bg)]">
            <div className="card text-center p-8 flex flex-col items-center gap-4">
                <h1 className="text-2xl font-bold text-[var(--color-text)]">Something went wrong</h1>
                <p className="text-[var(--color-text-muted)]">{message}</p>
                <button
                    onClick={() => window.location.replace('/')}
                    className="btn-primary"
                >
                    Go to Dashboard
                </button>
            </div>
        </div>
    );
};

export const createRouter = () => createBrowserRouter([
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
        errorElement: <RouteErrorBoundary />,
        children: [
            { path: '/dashboard', element: <Suspense fallback={<PageSkeleton/>}><DashboardPage /></Suspense> },
            { path: '/patients', element: <Suspense fallback={<PageSkeleton/>}><PatientsPage /></Suspense> },
            { path: '/patients/:id', element: <Suspense fallback={<PageSkeleton/>}><PatientDetailPage /></Suspense> },
            { path: '/analytics', element: <Suspense fallback={<PageSkeleton/>}><AnalyticsPage /></Suspense> },
            // Catch-all: redirect unknown protected paths to dashboard instead of blank screen
            { path: '*', element: <Navigate to="/dashboard" replace /> },
        ]
    }
])