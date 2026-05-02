import { Link } from "react-router-dom";
import { sharedStyles } from "../styles/shared";

export default function DashboardPage() {
    return (
        <div className={sharedStyles.page}>
            <div className={sharedStyles.pageHeader}>
                <h1 className={sharedStyles.pageTitle}>Dashboard</h1>
            </div>

            <div className={sharedStyles.emptyState}>
                <div className={sharedStyles.emptyIcon}>📊</div>
                <h2
                    style={{
                        fontSize: "1.25rem",
                        fontWeight: 600,
                        marginBottom: "0.5rem",
                    }}
                >
                    Coming soon
                </h2>
                <p className={sharedStyles.muted}>
                    Your personal dashboard with progress tracking, streaks and
                    analytics is under development.
                </p>
                <Link
                    to="/paths"
                    className={sharedStyles.btnPrimary}
                    style={{ marginTop: "1rem" }}
                >
                    Browse your paths
                </Link>
            </div>
        </div>
    );
}
