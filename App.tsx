import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { useTranslation } from './lib/i18n';

export type Page = 'landing' | 'signup' | 'login' | 'dashboard';

const App: React.FC = () => {
    const [page, setPage] = useState<Page>('landing');
    const { lang } = useTranslation();

    React.useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    const renderPage = () => {
        switch (page) {
            case 'signup':
                return <SignUp setPage={setPage} />;
            case 'login':
                return <Login setPage={setPage} />;
            case 'dashboard':
                return <Dashboard />;
            case 'landing':
            default:
                return <LandingPage setPage={setPage} />;
        }
    };

    return <div className="antialiased">{renderPage()}</div>;
};

export default App;