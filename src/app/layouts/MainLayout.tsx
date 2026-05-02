import React, { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../modules/auth/hooks/useAuth';
import { useAuthStore, selectUser } from '../store/authStore';
import Input from '@shared/components/Input';
import { NotificationBadge } from '../../modules/notifications/components/NotificationBadge';
import { Vortex } from '../../shared/components/Vortex/Vortex';

const CarePanelLogo = () => (
    <div className="flex items-center gap-[var(--space-2)] px-[var(--space-2)] md:px-[var(--space-4)]">
        <img src="/favicon.png" alt="CarePanel" className="w-8 h-8 object-contain" />
        <span className="font-bold text-[var(--color-text)] text-[var(--text-lg)] tracking-wide hidden sm:block">CarePanel</span>
    </div>
);

const MainLayout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const user = useAuthStore(selectUser);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

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
        <Vortex
            backgroundColor="#0b0b0d"
            rangeY={200}
            particleCount={70}
            baseHue={140}
            containerClassName="h-screen w-screen overflow-hidden"
            className="flex flex-col h-full w-full"
        >
            <div className="flex h-full w-full bg-transparent text-[var(--color-text)] overflow-hidden">
                {/* Narrow Icon Rail */}
                <div className="hidden sm:flex w-[52px] h-full bg-[var(--color-surface)] border-[var(--color-border)] flex-col items-center py-[var(--space-6)] z-20 shrink-0">
                    <div className="flex-1 flex flex-col items-center gap-[var(--space-8)] mt-12">
                        {navTabs.map(tab => {
                            const isActive = location.pathname.startsWith(tab.path);
                            return (
                                <Link
                                    key={tab.path}
                                    to={tab.path}
                                    className={`transition-all duration-200 transform hover:scale-110 ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}`}
                                    title={tab.label}
                                >
                                    {tab.icon}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Logout at bottom of rail */}
                    <button
                        onClick={handleLogout}
                        className="p-3 text-[var(--color-text-muted)] hover:text-[var(--color-error)] transition-colors mt-auto mb-[var(--space-4)] group"
                        title="Logout"
                    >
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-w-0 bg-transparent">
                    {/* Top Navbar */}
                    <header className="h-[52px] bg-[var(--color-surface)] border-b border-[var(--color-border)] flex items-center justify-between px-[var(--space-2)] md:px-[var(--space-4)] z-[50] shrink-0">
                        {/* Left: Logo */}
                        <div className="flex items-center shrink-0 w-auto lg:w-64">
                            <CarePanelLogo />
                        </div>

                        {/* Center: Tab Pills */}
                        <div className="flex items-center justify-center flex-1 shrink-0 px-[var(--space-4)]">
                            <nav className="flex space-x-1 bg-[var(--color-bg)] p-1 rounded-full border border-[var(--color-border)] whitespace-nowrap">
                                {navTabs.map(tab => {
                                    const isActive = location.pathname.startsWith(tab.path);
                                    return (
                                        <Link
                                            key={tab.path}
                                            to={tab.path}
                                            className={`px-[var(--space-3)] md:px-[var(--space-4)] py-1 text-[var(--text-sm)] rounded-full transition-all duration-200 flex items-center justify-center ${isActive
                                                ? 'bg-[var(--color-primary)] text-[var(--color-surface)] font-medium shadow-[var(--shadow-sm)]'
                                                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-border)]'
                                                }`}
                                        >
                                            <span className="hidden md:block">{tab.label}</span>
                                            <span className="md:hidden">{tab.icon}</span>
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* Right: Search, Bell, Avatar */}
                        <div className="flex items-center space-x-[var(--space-2)] md:space-x-[var(--space-4)] shrink-0 w-auto lg:w-64 justify-end">
                            <div className="relative hidden xl:block">
                                <Input
                                    id="search"
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                                    placeholder="Search..."
                                    className="bg-[var(--color-bg)]/50 backdrop-blur-sm border border-[var(--color-border)] text-[var(--text-sm)] rounded-full pl-8 pr-4 py-1.5 focus:outline-none focus:border-[var(--color-primary)] w-48 text-[var(--color-text)] placeholder-[var(--color-text-muted)] transition-colors"
                                />
                                <svg className="w-4 h-4 text-[var(--color-text-muted)] absolute left-2.5 top-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>

                            <NotificationBadge />

                            <div className="relative" ref={dropdownRef}>
                                <div
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className={`w-8 h-8 rounded-full border flex items-center justify-center text-[var(--text-sm)] font-medium cursor-pointer transition-all ${isDropdownOpen
                                        ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white'
                                        : 'bg-[var(--color-primary)]/15 border-[var(--color-primary)]/30 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/25'
                                        }`}
                                >
                                    {initials}
                                </div>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] shadow-[var(--shadow-lg)] py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
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
                                            className="w-full text-left px-4 py-2 text-[var(--text-sm)] text-[var(--color-text-muted)] hover:text-[var(--color-error)] hover:bg-[var(--color-border)] transition-colors flex items-center gap-2"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </header>

                    {/* Page Content */}
                    <main className="flex-1 overflow-y-auto bg-transparent">
                        <Outlet />
                    </main>
                </div>
            </div>
        </Vortex>
    );
};

export default MainLayout;