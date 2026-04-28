// Defines the global React Router browser routing configuration.
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import LoginPage from '@modules/auth/pages/LoginPage'
import PrivateRoute from '../modules/auth/components/PrivateRoute'

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
        children: [
            { path: '/dashboard', element: <Suspense fallback={<div>Loading...</div>}><DashboardPage /></Suspense> },
            { path: '/patients', element: <Suspense fallback={<div>Loading...</div>}><PatientsPage /></Suspense> },
            { path: '/patients/:id', element: <Suspense fallback={<div>Loading...</div>}><PatientDetailPage /></Suspense> },
            { path: '/analytics', element: <Suspense fallback={<div>Loading...</div>}><AnalyticsPage /></Suspense> },
        ]
    }
])