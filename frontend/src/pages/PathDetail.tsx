import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
    getLearningPath,
    addDocumentToPath,
    addYouTubeToPath
} from "../api/api";
import type { DailyPlan, LearningPathDetail } from "../types/types";
import { sharedStyles } from "../styles/shared";

function formatMinutes(mins: number) {
    if (mins < 60) return `${mins} min`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

function DayCard({ plan }: { plan: DailyPlan }) {
    return (
        <div className={sharedStyles.dayCard}>
            <div className={sharedStyles.dayNumber}>Day {plan.day_number}</div>
            <div className={sharedStyles.dayBody}>
                <h3 className={sharedStyles.dayTitle}>{plan.title}</h3>
                {plan.description && <p className={sharedStyles.dayDescription}>{plan.description}</p>}
                <div className={sharedStyles.dayMeta}>
                    <span>⏱ {formatMinutes(plan.estimated_minutes)}</span>
                    <span>📦 {plan.chunk_ids.length} section{plan.chunk_ids.length !== 1 ? "s" : ""}</span>
                </div>
            </div>
        </div>
    );
}

function ProcessingBanner({ totalDocs }: { totalDocs: number }) {
    return (
        <div className={sharedStyles.processingBanner}>
            <div className={sharedStyles.spinnerSm} />
            <div>
                <strong className={sharedStyles.processingBannerStrong}>Building your roadmap…</strong>
                <p className={sharedStyles.processingBannerP}>
                    We're processing {totalDocs} source{totalDocs !== 1 ? "s" : ""}:{" "}
                    chunking, embedding, extracting concepts and generating your day-by-day plan.
                    This may take a minute. This page will refresh automatically.
                </p>
            </div>
        </div>
    );
}

export default function PathDetailPage() {
    const { id } = useParams<{ id: string }>();
    const pathId = Number(id);

    const [path, setPath] = useState<LearningPathDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Add-source panel state
    const [showAddSource, setShowAddSource] = useState(false);
    const [addFiles, setAddFiles] = useState<File[]>([]);
    const [addUrl, setAddUrl] = useState("");
    const [addBusy, setAddBusy] = useState(false);
    const [addMsg, setAddMsg] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

    async function fetchPath() {
        try {
            const data = await getLearningPath(pathId);
            setPath(data);
            if (data.status !== "processing" && pollRef.current) {
                clearInterval(pollRef.current);
                pollRef.current = null;
            }
        } catch (err) {
            setError((err as Error).message);
            if (pollRef.current) {
                clearInterval(pollRef.current);
                pollRef.current = null;
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPath();
        return () => {
            if (pollRef.current) clearInterval(pollRef.current);
        };
    }, [pathId]);

    // Start polling when status is "processing"
    useEffect(() => {
        if (path?.status === "processing" && !pollRef.current) {
            pollRef.current = setInterval(fetchPath, 4000);
        }
        if (path?.status !== "processing" && pollRef.current) {
            clearInterval(pollRef.current);
            pollRef.current = null;
        }
    }, [path?.status]);

    async function handleAddSources(e: React.FormEvent) {
        e.preventDefault();
        setAddBusy(true);
        setAddMsg(null);
        const msgs: string[] = [];

        for (const file of addFiles) {
            try {
                await addDocumentToPath(pathId, file);
                msgs.push(`✓ "${file.name}" added`);
            } catch (err) {
                msgs.push(`✗ "${file.name}": ${(err as Error).message}`);
            }
        }

        const trimmedUrl = addUrl.trim();
        if (trimmedUrl) {
            try {
                await addYouTubeToPath(pathId, trimmedUrl);
                msgs.push("✓ YouTube URL added");
            } catch (err) {
                msgs.push(`✗ YouTube: ${(err as Error).message}`);
            }
        }

        setAddMsg(msgs.join("\n"));
        setAddFiles([]);
        setAddUrl("");
        if (fileRef.current) fileRef.current.value = "";
        setAddBusy(false);

        // Refresh and start polling
        await fetchPath();
        if (!pollRef.current) {
            pollRef.current = setInterval(fetchPath, 4000);
        }
    }

    if (loading) return <div className={sharedStyles.page}><p className={sharedStyles.muted}>Loading…</p></div>;
    if (error) return <div className={sharedStyles.page}><div className={`${sharedStyles.message} ${sharedStyles.messageErr}`}>{error}</div></div>;
    if (!path) return null;

    const isProcessing = path.status === "processing";
    const isError = path.status === "error";
    const totalDocs = path.daily_plans.length === 0 && isProcessing ? 1 : 0;

    return (
        <div className={sharedStyles.pathDetailPage}>
            {/* Header */}
            <div className={sharedStyles.pathDetailHeader}>
                <Link to="/paths" className={sharedStyles.backLink}>← My paths</Link>
                <h1 className={sharedStyles.pathDetailTitle}>{path.title}</h1>
                {path.description && <p className={sharedStyles.muted}>{path.description}</p>}
                <div className={sharedStyles.pathDetailMeta}>
                    <span>⏱ {path.hours_per_day} hr/day</span>
                    {path.total_days != null && path.total_days > 0 && (
                        <span>📅 {path.total_days}-day plan</span>
                    )}
                    {path.daily_plans.length > 0 && (
                        <span>
                            🕐 Total ~{formatMinutes(
                                path.daily_plans.reduce((s: number, d: any) => s + d.estimated_minutes, 0)
                            )}
                        </span>
                    )}
                </div>
            </div>

            {/* Status banners */}
            {isProcessing && <ProcessingBanner totalDocs={totalDocs || 1} />}
            {isError && (
                <div className={`${sharedStyles.message} ${sharedStyles.messageErr}`}>
                    Something went wrong while building your roadmap. Try adding your sources again.
                </div>
            )}

            {/* Roadmap */}
            {path.daily_plans.length > 0 && (
                <section>
                    <h2 className={sharedStyles.sectionTitle}>Your {path.total_days}-Day Roadmap</h2>
                    <div className={sharedStyles.dayTimeline}>
                        {path.daily_plans.map((plan: any) => (
                            <DayCard key={plan.id} plan={plan} />
                        ))}
                    </div>
                </section>
            )}

            {!isProcessing && path.daily_plans.length === 0 && !isError && (
                <div className={sharedStyles.emptyState} style={{ marginTop: "2rem" }}>
                    <div className={sharedStyles.emptyIcon}>📂</div>
                    <p>No sources yet. Add a document or YouTube URL below to generate your roadmap.</p>
                </div>
            )}

            {/* Add sources panel */}
            <section className={sharedStyles.addSourceSection}>
                <button
                    type="button"
                    className={sharedStyles.btnToggleAdd}
                    onClick={() => setShowAddSource((v) => !v)}
                >
                    {showAddSource ? "▲ Hide" : "＋ Add more sources"}
                </button>

                {showAddSource && (
                    <form className={sharedStyles.addSourceForm} onSubmit={handleAddSources}>
                        <div className={sharedStyles.addSourceRow}>
                            <label className={sharedStyles.cpLabel} style={{ flex: 1 }}>
                                Documents (PDF, DOCX, TXT, MD)
                                <div
                                    className={`${sharedStyles.fileDropArea} ${sharedStyles.fileDropSm}`}
                                    onClick={() => fileRef.current?.click()}
                                >
                                    <span>Click to pick files</span>
                                    <input
                                        ref={fileRef}
                                        type="file"
                                        multiple
                                        accept=".pdf,.docx,.txt,.md"
                                        style={{ display: "none" }}
                                        onChange={(e) => {
                                            const picked = Array.from(e.target.files || []);
                                            setAddFiles((prev) => {
                                                const ex = new Set(prev.map((f) => f.name + f.size));
                                                return [...prev, ...picked.filter((f) => !ex.has(f.name + f.size))];
                                            });
                                            if (fileRef.current) fileRef.current.value = "";
                                        }}
                                    />
                                </div>
                                {addFiles.map((f, i) => (
                                    <div key={i} className={sharedStyles.fileItem} style={{ marginTop: "0.25rem" }}>
                                        <span className={sharedStyles.fileName}>{f.name}</span>
                                        <button
                                            type="button"
                                            className={sharedStyles.fileRemove}
                                            onClick={() => setAddFiles((prev) => prev.filter((_, j) => j !== i))}
                                        >✕</button>
                                    </div>
                                ))}
                            </label>

                            <label className={sharedStyles.cpLabel} style={{ flex: 1 }}>
                                YouTube URL
                                <input
                                    type="url"
                                    className={sharedStyles.cpInput}
                                    placeholder="https://youtube.com/watch?v=…"
                                    value={addUrl}
                                    onChange={(e) => setAddUrl(e.target.value)}
                                />
                            </label>
                        </div>

                        {addMsg && (
                            <pre className={sharedStyles.addSourceMsg}>{addMsg}</pre>
                        )}

                        <button
                            type="submit"
                            className={sharedStyles.btnSubmit}
                            disabled={addBusy || (addFiles.length === 0 && !addUrl.trim())}
                        >
                            {addBusy ? "Processing…" : "Add sources & regenerate roadmap"}
                        </button>
                    </form>
                )}
            </section>
        </div>
    );
}
