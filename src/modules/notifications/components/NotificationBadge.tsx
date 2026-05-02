import React, { useState, useRef, useEffect } from 'react';
import { useNotifications } from '../hooks/useNotifications';
import { NotificationList } from './NotificationList';

export const NotificationBadge: React.FC = () => {
    const {
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        permission,
        requestPermission,
        triggerTestNotification
    } = useNotifications();

    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const toggleOpen = () => setIsOpen((prev) => !prev);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleEnableNotifications = async (e: React.MouseEvent) => {
        e.stopPropagation();
        await requestPermission();
    };

    // Render the appropriate icon/button based on permission state
    const renderTrigger = () => {
        if (permission === 'denied') {
            return (
                <button
                    disabled
                    className="p-2 flex items-center gap-2 text-[var(--color-text-muted)] opacity-50 cursor-not-allowed rounded-lg text-xs"
                    title="Notifications disabled in browser settings"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                    <span className="hidden lg:inline">Notifications Off</span>
                </button>
            );
        }

        if (permission === 'default') {
            return (
                <button
                    onClick={handleEnableNotifications}
                    className="px-3 py-1.5 flex items-center gap-2 bg-[var(--color-primary)]/10 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/20 rounded-full text-xs font-medium transition-all animate-pulse"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    Enable Notifications
                </button>
            );
        }

        return (
            <button
                onClick={toggleOpen}
                className="p-2 relative text-[var(--color-text-muted)] hover:bg-[var(--color-secondary)]/10 rounded-lg focus:outline-none transition-colors"
                aria-label="Notifications"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-[var(--color-error)] rounded-full border-2 border-[var(--color-surface)]">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>
        );
    };

    return (
        <div className="relative flex items-center" ref={containerRef}>
            {renderTrigger()}

            {isOpen && permission === 'granted' && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-[var(--color-surface)] rounded-lg shadow-xl border border-[var(--color-border)] z-[100] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-3 border-b border-[var(--color-border)] bg-[var(--color-surface)] flex justify-between items-center">
                        <h3 className="text-sm font-semibold text-[var(--color-text)]">Notifications</h3>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={triggerTestNotification}
                                className="text-[10px] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                            >
                                🔔 Demo
                            </button>
                            {unreadCount > 1 && (
                                <button
                                    onClick={() => markAllAsRead()}
                                    className="text-[10px] text-[var(--color-primary)] hover:underline"
                                >
                                    Mark all as read
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto">
                        <NotificationList
                            notifications={notifications}
                            onMarkAsRead={markAsRead}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

