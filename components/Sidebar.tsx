
import React from 'react';
import { PlaneIcon } from './icons/PlaneIcon';
import { WrenchScrewdriverIcon } from './icons/WrenchScrewdriverIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';
import { CogIcon } from './icons/CogIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { Logo } from './icons/Logo';
import { useTranslation } from '../lib/i18n';
import { XMarkIcon } from './icons/XMarkIcon';
import { TranslationKey } from '../translations';
import { User } from '../types';

export type View = 'dashboard' | 'fleet' | 'requests' | 'billing' | 'settings';

interface SidebarProps {
    user: User;
    activeView: View;
    setActiveView: (view: View) => void;
    isOpen: boolean;
    toggleSidebar: () => void;
    onLogoClick: () => void;
}

const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
    <li
        onClick={onClick}
        className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors duration-200 ${
            isActive
                ? 'bg-secondary text-white'
                : 'text-gray-400 hover:bg-accent hover:text-white'
        }`}
    >
        {icon}
        <span className="ml-4 font-medium">{label}</span>
    </li>
);

export const Sidebar: React.FC<SidebarProps> = ({ user, activeView, setActiveView, isOpen, toggleSidebar, onLogoClick }) => {
    const { t } = useTranslation();
    
    const handleNavigation = (view: View) => {
        setActiveView(view);
        if (window.innerWidth < 1024) { // Close sidebar on mobile after navigation
            toggleSidebar();
        }
    }

    const allNavItems: { view: View; icon: React.ReactNode; labelKey: TranslationKey }[] = [
        { view: 'dashboard', icon: <ChartBarIcon className="h-6 w-6" />, labelKey: 'sidebar.dashboard' },
        { view: 'fleet', icon: <PlaneIcon className="h-6 w-6" />, labelKey: 'sidebar.fleet' },
        { view: 'requests', icon: <WrenchScrewdriverIcon className="h-6 w-6" />, labelKey: 'sidebar.requests' },
        { view: 'billing', icon: <DocumentTextIcon className="h-6 w-6" />, labelKey: 'sidebar.billing' },
        { view: 'settings', icon: <CogIcon className="h-6 w-6" />, labelKey: 'sidebar.settings' },
    ];
    
    // Both user roles currently have access to the same set of views.
    // This can be customized later if operator-specific views are added.
    const visibleNavItems = allNavItems;


    return (
        <>
            {/* Overlay for mobile */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleSidebar}
            ></div>
            <aside className={`fixed top-0 left-0 h-full w-64 bg-primary text-white flex flex-col p-4 z-40 transform transition-transform lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between h-16 mb-6">
                     <button onClick={onLogoClick} aria-label="Go to homepage">
                        <Logo className="h-10 w-auto" />
                     </button>
                     <button onClick={toggleSidebar} className="text-gray-400 hover:text-white lg:hidden">
                        <XMarkIcon className="h-6 w-6" />
                     </button>
                </div>
                <nav>
                    <ul>
                       {visibleNavItems.map(item => (
                            <NavItem
                                key={item.view}
                                icon={item.icon}
                                label={t(item.labelKey)}
                                isActive={activeView === item.view}
                                onClick={() => handleNavigation(item.view)}
                            />
                        ))}
                    </ul>
                </nav>
                <div className="mt-auto p-4 bg-accent rounded-lg text-center">
                    <p className="text-sm text-gray-300">{t('sidebar.concierge')}</p>
                    <button className="mt-2 w-full bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                        {t('sidebar.contactSupport')}
                    </button>
                </div>
            </aside>
        </>
    );
};