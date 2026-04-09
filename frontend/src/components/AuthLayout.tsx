import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { sharedStyles as styles } from '../styles/shared';

export const AuthLayout: React.FC = () => {
    return (
        <div className={styles.layout}>
            <header className={styles.header}>
                <Link to="/" className={styles.logo}>Davidious</Link>
                <nav className={styles.nav}>
                    <Link to="/login" className={styles.navBtn}>Log in</Link>
                    <Link to="/register" className={styles.navBtn}>Sign up</Link>
                </nav>
            </header>
            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    );
};
