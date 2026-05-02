import { Link } from "react-router-dom";

export default function DashboardPage() {
    return (
        <div className="page">
            <div className="page-header">
                <h1>Dashboard</h1>
            </div>

            <div className="empty-state">
                <div className="empty-icon">📊</div>
                <h2
                    style={{
                        fontSize: "1.25rem",
                        fontWeight: 600,
                        marginBottom: "0.5rem",
                    }}
                >
                    Coming soon
                </h2>
                <p className="muted">
                    Your personal dashboard with progress tracking, streaks and
                    analytics is under development.
                </p>
                <Link
                    to="/paths"
                    className="btn-primary"
                    style={{ marginTop: "1rem" }}
                >
                    Browse your paths
                </Link>
            </div>
        </div>
    );
}
