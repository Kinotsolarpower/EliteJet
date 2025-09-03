import React, { useState } from 'react';
import { BellIcon } from './icons/BellIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { PlusIcon } from './icons/PlusIcon';
import { MenuIcon } from './icons/MenuIcon';
import { useTranslation } from '../lib/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MOCK_NOTIFICATIONS, MOCK_USER } from '../constants';
import { Notification } from '../types';

interface HeaderProps {
    onNewRequestClick: () => void;
    toggleSidebar: () => void;
}

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => (
    <div className="p-3 hover:bg-accent-dark border-b border-accent">
        <p className="text-sm text-slate-200">{notification.text}</p>
        <p className="text-xs text-slate-400 mt-1">{new Date(notification.timestamp).toLocaleString()}</p>
    </div>
);

export const Header: React.FC<HeaderProps> = ({ onNewRequestClick, toggleSidebar }) => {
    const { t } = useTranslation();
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.isRead).length;

    return (
        <header className="bg-primary shadow-sm p-4 flex justify-between items-center z-20 relative border-b border-accent">
            {/* Hamburger menu for mobile */}
            <button onClick={toggleSidebar} className="text-slate-400 hover:text-white lg:hidden">
                <MenuIcon className="h-6 w-6" />
            </button>
            
            <div className="flex-1 flex justify-end items-center space-x-4 md:space-x-6">
                <button
                    onClick={onNewRequestClick}
                    className="flex items-center justify-center bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                >
                    <PlusIcon className="h-5 w-5 md:mr-2" />
                    <span className="hidden md:inline">{t('header.newRequest')}</span>
                </button>

                <LanguageSwitcher />

                <div className="relative">
                    <button onClick={() => setNotificationsOpen(!notificationsOpen)} className="relative text-slate-400 hover:text-white">
                        <BellIcon className="h-6 w-6" />
                        {unreadCount > 0 && (
                             <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                        )}
                    </button>
                    {notificationsOpen && (
                        <div className="absolute right-0 mt-2 w-80 bg-accent rounded-lg shadow-xl overflow-hidden border border-accent-dark animate-fade-in-up">
                            <div className="p-3 bg-accent-dark border-b border-accent">
                                <h4 className="font-semibold text-white">{t('header.notifications')}</h4>
                            </div>
                            <div>
                                {MOCK_NOTIFICATIONS.map(n => <NotificationItem key={n.id} notification={n} />)}
                            </div>
                            <div className="p-2 text-center bg-accent-dark border-t border-accent">
                                <button className="text-sm font-semibold text-secondary hover:underline">{t('header.viewAll')}</button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center space-x-3">
                    <img className="h-10 w-10 rounded-full object-cover" src={MOCK_USER.avatarUrl} alt="User" />
                    <div className="hidden md:block">
                        <p className="font-semibold text-white">{MOCK_USER.name}</p>
                        <p className="text-sm text-slate-400">{t('user.role.operator')}</p>
                    </div>
                    <button className="text-slate-400 hover:text-white hidden md:block">
                        <ChevronDownIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </header>
    );
};