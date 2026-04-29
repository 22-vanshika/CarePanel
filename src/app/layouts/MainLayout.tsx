import React from 'react';
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../modules/auth/hooks/useAuth';
import { useAuthStore } from '../store/authStore';
import { useUiStore, selectIsSidebarOpen } from '../store/uiStore';
import { NotificationBadge } from '../../modules/notifications/components/NotificationBadge';
const DashboardIcon = () => (
    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
);

const PatientsIcon = () => (
    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const AnalyticsIcon = () => (
    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

const MainLayout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    // Atomic selectors
    const user = useAuthStore(state => state.user);
    const isSidebarOpen = useUiStore(selectIsSidebarOpen);
    const toggleSidebar = useUiStore(state => state.toggleSidebar);

    const getPageTitle = (path: string) => {
        if (path.startsWith('/dashboard')) return 'Dashboard';
        if (path.startsWith('/patients')) return 'Patients';
        if (path.startsWith('/analytics')) return 'Analytics';
        return 'Healthcare SaaS';
    };

    const title = getPageTitle(location.pathname);

    const navLinks = [
        { path: '/dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
        { path: '/patients', label: 'Patients', icon: <PatientsIcon /> },
        { path: '/analytics', label: 'Analytics', icon: <AnalyticsIcon /> },
    ];

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-[var(--color-bg)] overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 z-20 md:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-30 w-64 bg-[var(--color-surface)] border-r border-[var(--color-secondary)]/20 transform transition-transform duration-300 ease-in-out md:relative ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:-translate-x-full'}`}
            >
                <div className="flex items-center justify-center h-16 border-b border-[var(--color-secondary)]/20">
                    <span className="text-xl font-bold text-[var(--color-text)]">Healthcare SaaS</span>
                </div>
                <nav className="p-4 space-y-1">
                    {navLinks.map((link) => {
                        const isActive = location.pathname.startsWith(link.path);
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${isActive
                                    ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                                    : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]'
                                    }`}
                            >
                                {link.icon}
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex flex-col flex-1 min-w-0">
                {/* Header */}
                <header className="flex items-center justify-between h-16 px-4 sm:px-6 bg-[var(--color-surface)] border-b border-[var(--color-secondary)]/20 z-10">
                    <div className="flex items-center">
                        <button
                            onClick={toggleSidebar}
                            className="p-2 mr-4 text-[var(--color-text-muted)] rounded-lg hover:bg-[var(--color-secondary)]/10 focus:outline-none"
                            aria-label="Toggle sidebar"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <h1 className="text-xl font-semibold text-[var(--color-text)]">{title}</h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <NotificationBadge />
                        <span className="text-sm font-medium text-[var(--color-text)] hidden sm:block">
                            {user?.displayName || 'User'}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="text-sm font-medium text-[var(--color-error)] hover:bg-[var(--color-error)]/10 px-3 py-2 rounded-lg transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;