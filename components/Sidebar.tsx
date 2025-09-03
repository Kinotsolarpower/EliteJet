import React from 'react';
import { PlaneIcon } from './icons/PlaneIcon';
import { WrenchScrewdriverIcon } from './icons/WrenchScrewdriverIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';
import { CogIcon } from './icons/CogIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { Logo } from './icons/Logo';
import { useTranslation } from '../lib/i18n';
import { XMarkIcon } from './icons/XMarkIcon';

export type View = 'dashboard' | 'fleet' | 'requests' | 'billing' | 'settings';

interface SidebarProps {
    activeView: View;
    setActiveView: (view: View) => void;
    isOpen: boolean;
    toggleSidebar: () => void;
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

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, isOpen, toggleSidebar }) => {
    const { t } = useTranslation();
    
    const handleNavigation = (view: View) => {
        setActiveView(view);
        if (window.innerWidth < 1024) { // Close sidebar on mobile after navigation
            toggleSidebar();
        }
    }

    return (
        <>
            {/* Overlay for mobile */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleSidebar}
            ></div>
            <aside className={`fixed top-0 left-0 h-full w-64 bg-primary text-white flex flex-col p-4 z-40 transform transition-transform lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between h-16 mb-6">
                     <Logo className="h-10 w-auto" />
                     <button onClick={toggleSidebar} className="text-gray-400 hover:text-white lg:hidden">
                        <XMarkIcon className="h-6 w-6" />
                     </button>
                </div>
                <nav>
                    <ul>
                        <NavItem
                            icon={<ChartBarIcon className="h-6 w-6" />}
                            label={t('sidebar.dashboard')}
                            isActive={activeView === 'dashboard'}
                            onClick={() => handleNavigation('dashboard')}
                        />
                        <NavItem
                            icon={<PlaneIcon className="h-6 w-6" />}
                            label={t('sidebar.fleet')}
                            isActive={activeView === 'fleet'}
                            onClick={() => handleNavigation('fleet')}
                        />
                        <NavItem
                            icon={<WrenchScrewdriverIcon className="h-6 w-6" />}
                            label={t('sidebar.requests')}
                            isActive={activeView === 'requests'}
                            onClick={() => handleNavigation('requests')}
                        />
                        <NavItem
                            icon={<DocumentTextIcon className="h-6 w-6" />}
                            label={t('sidebar.billing')}
                            isActive={activeView === 'billing'}
                            onClick={() => handleNavigation('billing')}
                        />
                         <NavItem
                            icon={<CogIcon className="h-6 w-6" />}
                            label={t('sidebar.settings')}
                            isActive={activeView === 'settings'}
                            onClick={() => handleNavigation('settings')}
                        />
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