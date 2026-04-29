import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../modules/auth/hooks/useAuth';
import { useAuthStore } from '../store/authStore';

const CarePanelLogo = () => (
    <div className="flex items-center gap-[var(--space-2)] px-[var(--space-4)]">
        <div className="w-8 h-8 rounded-[var(--radius-md)] bg-[var(--color-primary)] flex items-center justify-center shadow-[var(--shadow-lg)] shadow-[var(--color-primary)]/20">
            <svg className="w-5 h-5 text-[var(--color-surface)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
        </div>
        <span className="font-bold text-[var(--color-text)] text-[var(--text-lg)] tracking-wide">CarePanel</span>
    </div>
);

const MainLayout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const user = useAuthStore(state => state.user);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const requestNotificationPermission = () => {
        if ('Notification' in window) {
            Notification.requestPermission();
        }
    };

    const navTabs = [
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/patients', label: 'Patients' },
        { path: '/analytics', label: 'Analytics' },
        { path: '/reports', label: 'Reports' },
        { path: '/settings', label: 'Settings' },
    ];

    return (
        <div className="flex h-screen bg-[var(--color-bg)] text-[var(--color-text)] overflow-hidden font-sans">
            {/* Narrow Icon Rail */}
            <div className="w-[52px] h-full bg-[var(--color-surface)] border-r border-[var(--color-border)] flex flex-col items-center py-[var(--space-4)] z-20 shrink-0">
                <div className="flex-1 flex flex-col items-center gap-[var(--space-6)] mt-14">
                    <button className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors" title="Search Records">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                    <button onClick={requestNotificationPermission} className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors relative" title="Notifications">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                    </button>
                </div>
                <button onClick={handleLogout} className="text-[var(--color-text-muted)] hover:text-[var(--color-error)] transition-colors mb-[var(--space-4)]" title="Logout">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Navbar */}
                <header className="h-[52px] bg-[var(--color-surface)] border-b border-[var(--color-border)] flex items-center justify-between px-[var(--space-4)] z-10 shrink-0">
                    {/* Left: Logo */}
                    <div className="flex items-center w-64">
                        <CarePanelLogo />
                    </div>

                    {/* Center: Tab Pills */}
                    <div className="flex items-center justify-center flex-1">
                        <nav className="flex space-x-1 bg-[var(--color-bg)] p-1 rounded-full border border-[var(--color-border)]">
                            {navTabs.map(tab => {
                                const isActive = location.pathname.startsWith(tab.path);
                                return (
                                    <Link
                                        key={tab.path}
                                        to={tab.path}
                                        className={`px-[var(--space-4)] py-1 text-[var(--text-sm)] rounded-full transition-all duration-200 ${
                                            isActive 
                                                ? 'bg-[var(--color-primary)] text-[var(--color-surface)] font-medium shadow-[var(--shadow-sm)]' 
                                                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-border)]'
                                        }`}
                                    >
                                        {tab.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Right: Search, Bell, Avatar */}
                    <div className="flex items-center space-x-[var(--space-4)] w-64 justify-end">
                        <div className="relative hidden md:block">
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                className="bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--text-sm)] rounded-full pl-8 pr-4 py-1.5 focus:outline-none focus:border-[var(--color-primary)] w-48 text-[var(--color-text)] placeholder-[var(--color-text-muted)] transition-colors"
                            />
                            <svg className="w-4 h-4 text-[var(--color-text-muted)] absolute left-2.5 top-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                        
                        <button className="relative text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                            <span className="absolute top-0 right-0 w-2 h-2 bg-[var(--color-error)] rounded-full border border-[var(--color-surface)]"></span>
                        </button>
                        
                        <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-[var(--text-sm)] font-bold shadow-inner cursor-pointer border border-[var(--color-border)] hover:opacity-90 transition-opacity text-white">
                            {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'D'}
                        </div>
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