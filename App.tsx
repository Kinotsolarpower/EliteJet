
import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { useTranslation } from './lib/i18n';
import { LandingPage } from './pages/LandingPage';
import { User } from './types';
import { OnboardingFlow } from './pages/OnboardingFlow';

export type Page = 'landing' | 'signup' | 'login';

const App: React.FC = () => {
    const [page, setPage] = useState<Page>('landing');
    const [user, setUser] = useState<User | null>(null);
    const { lang, t } = useTranslation();

    React.useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    const handleLogout = () => {
        setUser(null);
        setPage('landing');
    };

    const handleSignUpSuccess = (newUserData: Omit<User, 'avatarUrl' | 'onboardingCompleted' | 'role'> & {role: 'Client'}) => {
        const userToOnboard: User = {
            ...newUserData,
            avatarUrl: `https://i.pravatar.cc/150?u=${newUserData.name}`, // placeholder
            onboardingCompleted: false,
        };
        setUser(userToOnboard);
    };
    
    const handleOnboardingComplete = () => {
        if (user) {
            setUser({ ...user, onboardingCompleted: true });
        }
    };

    if (user && !user.onboardingCompleted) {
        return <OnboardingFlow user={user} onComplete={handleOnboardingComplete} />;
    }

    if (user && user.onboardingCompleted) {
        // A bit of a hack to update the welcome message with the user's name
        const welcomeUser = user.firstName || user.name;
        document.title = `EliteJet Care - ${t('dashboard.welcome', [welcomeUser])}`;
        return <Dashboard user={user} onLogout={handleLogout} />;
    }

    const renderPage = () => {
        switch (page) {
            case 'signup':
                return <SignUp setPage={setPage} onSignUpSuccess={handleSignUpSuccess} />;
            case 'login':
                return <Login setPage={setPage} onLoginSuccess={setUser} />;
            case 'landing':
            default:
                return <LandingPage setPage={setPage} />;
        }
    };

    return <div className="antialiased">{renderPage()}</div>;
};

export default App;
