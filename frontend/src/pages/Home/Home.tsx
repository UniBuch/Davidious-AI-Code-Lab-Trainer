import React from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './Home.module.css';

export const Home: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Davidious AI Lab</h1>
        <div className={styles.userInfo}>
          <span className={styles.welcome}>Hello, {user?.name || user?.email}</span>
          <button className={styles.logoutBtn} onClick={logout}>
            Sign Out
          </button>
        </div>
      </header>

      <main className={styles.content}>
        <h2 className={styles.subtitle}>Welcome to the Coding Sandbox</h2>
        <p className={styles.description}>
          You are successfully authenticated. Ready to start your AI-driven coding tasks
          and track your progress.
        </p>
      </main>
    </div>
  );
};
