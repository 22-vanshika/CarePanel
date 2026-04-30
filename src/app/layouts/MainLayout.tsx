import React, { useState } from 'react';
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
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
        { 
            path: '/dashboard', 
            label: 'Dashboard',
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></svg>
        },
        { 
            path: '/patients', 
            label: 'Patients',
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
        },
        { 
            path: '/analytics', 
            label: 'Analytics',
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
        },
    ];

    const initials = user?.displayName ? user.displayName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'DR';

    return (
        <div className="flex h-screen bg-[var(--color-bg)] text-[var(--color-text)] overflow-hidden font-sans">
            {/* Narrow Icon Rail */}
            <div className="w-[52px] h-full bg-[var(--color-surface)] border-r border-[var(--color-border)] flex flex-col items-center py-[var(--space-4)] z-20 shrink-0">
                <div className="flex-1 flex flex-col items-center gap-[var(--space-6)] mt-14">
                    {navTabs.map(tab => {
                        const isActive = location.pathname.startsWith(tab.path);
                        return (
                            <Link 
                                key={tab.path} 
                                to={tab.path} 
                                className={`transition-colors ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}`}
                                title={tab.label}
                            >
                                {tab.icon}
                            </Link>
                        );
                    })}
                </div>
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
                        
                        <button onClick={requestNotificationPermission} className="relative text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                            <span className="absolute top-0 right-0 w-2 h-2 bg-[var(--color-error)] rounded-full border border-[var(--color-surface)]"></span>
                        </button>
                        
                        <div 
                            className="relative"
                            onMouseEnter={() => setIsDropdownOpen(true)}
                            onMouseLeave={() => setIsDropdownOpen(false)}
                        >
                            <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/15 border border-[var(--color-primary)]/30 flex items-center justify-center text-[var(--text-sm)] font-medium text-[var(--color-primary)] cursor-pointer hover:bg-[var(--color-primary)]/25 transition-colors">
                                {initials}
                            </div>
                            
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] shadow-[var(--shadow-lg)] py-1 z-50">
                                    <div className="px-4 py-2 border-b border-[var(--color-border)]">
                                        <div className="text-[var(--text-sm)] font-medium text-[var(--color-text)] truncate opacity-85">
                                            Dr. {user?.displayName || 'User'}
                                        </div>
                                        <div className="text-[0.75rem] text-[var(--color-text-muted)] opacity-45">
                                            Attending Physician
                                        </div>
                                    </div>
                                    <button 
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-[var(--text-sm)] text-[var(--color-text-muted)] hover:text-[var(--color-error)] hover:bg-[var(--color-border)] transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
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