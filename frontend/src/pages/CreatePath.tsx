import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
    createLearningPath,
    addDocumentToPath,
    addYouTubeToPath,
} from "../api/api";
import { sharedStyles } from "../styles/shared";

type UrlEntry = { id: number; value: string };

let urlCounter = 0;

export default function CreatePathPage() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [hoursPerDay, setHoursPerDay] = useState(1);
    const [files, setFiles] = useState<File[]>([]);
    const [urlEntries, setUrlEntries] = useState<UrlEntry[]>([{ id: ++urlCounter, value: "" }]);
    const [submitting, setSubmitting] = useState(false);
    const [progress, setProgress] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    function addUrlEntry() {
        setUrlEntries((prev) => [...prev, { id: ++urlCounter, value: "" }]);
    }

    function removeUrlEntry(id: number) {
        setUrlEntries((prev) => prev.filter((e) => e.id !== id));
    }

    function updateUrlEntry(id: number, value: string) {
        setUrlEntries((prev) => prev.map((e) => (e.id === id ? { ...e, value } : e)));
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const picked = Array.from(e.target.files || []);
        setFiles((prev) => {
            const existing = new Set(prev.map((f) => f.name + f.size));
            return [...prev, ...picked.filter((f) => !existing.has(f.name + f.size))];
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    function removeFile(index: number) {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    }

    const validUrls = urlEntries.map((e) => e.value.trim()).filter(Boolean);
    const hasAnySources = files.length > 0 || validUrls.length > 0;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!title.trim()) { setError("Please enter a path title."); return; }
        setError(null);
        setSubmitting(true);
        setProgress([]);

        try {
            // 1. Create the learning path
            setProgress(["Creating your learning path…"]);
            const path = await createLearningPath({
                title: title.trim(),
                description: description.trim() || undefined,
                hours_per_day: hoursPerDay,
            });

            // 2. Upload files
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                setProgress((p) => [...p, `Uploading "${file.name}" (${i + 1}/${files.length})…`]);
                try {
                    await addDocumentToPath(path.id, file);
                } catch (err) {
                    setProgress((p) => [...p, `  ⚠ ${(err as Error).message}`]);
                }
            }

            // 3. Add YouTube URLs
            for (let i = 0; i < validUrls.length; i++) {
                const url = validUrls[i];
                const short = url.length > 60 ? url.slice(0, 57) + "…" : url;
                setProgress((p) => [...p, `Adding YouTube URL (${i + 1}/${validUrls.length}): ${short}`]);
                try {
                    await addYouTubeToPath(path.id, url);
                } catch (err) {
                    setProgress((p) => [...p, `  ⚠ ${(err as Error).message}`]);
                }
            }

            setProgress((p) => [...p, "Done! Redirecting to your roadmap…"]);
            setTimeout(() => navigate(`/paths/${path.id}`), 800);
        } catch (err) {
            setError((err as Error).message);
            setSubmitting(false);
        }
    }

    return (
        <div className={`${sharedStyles.page} create-path-page`}>
            <h1 className={sharedStyles.cpPageTitle}>Create a Learning Path</h1>
            <p className={sharedStyles.muted}>
                Describe what you want to learn, set your daily study time, and add your materials.
                We'll build a personalised day-by-day roadmap for you.
            </p>

            {error && <div className={`${sharedStyles.message} ${sharedStyles.messageErr}`}>{error}</div>}

            {submitting ? (
                <div className={sharedStyles.progressPanel}>
                    <div className={sharedStyles.progressSpinner} />
                    <ul className={sharedStyles.progressLog}>
                        {progress.map((line, i) => (
                            <li key={i}>{line}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    {/* ── Path details ─────────────────────────────────── */}
                    <section className={sharedStyles.cpSection}>
                        <h2 className={sharedStyles.cpSectionTitle}>Path details</h2>

                        <label className={sharedStyles.cpLabel}>
                            Title <span className={sharedStyles.required}>*</span>
                            <input
                                type="text"
                                className={sharedStyles.cpInput}
                                placeholder="e.g. Machine Learning Fundamentals"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                maxLength={512}
                                required
                            />
                        </label>

                        <label className={sharedStyles.cpLabel}>
                            What do you want to learn?
                            <textarea
                                className={sharedStyles.cpInput}
                                placeholder="Describe your learning goal. The AI uses this to write your day titles."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                            />
                        </label>

                        <div className={sharedStyles.cpLabel}>
                            <span>
                                Daily study time&ensp;
                                <strong className={sharedStyles.accent}>{hoursPerDay} hour{hoursPerDay !== 1 ? "s" : ""}</strong>
                            </span>
                            <div className={sharedStyles.hoursRow}>
                                <span className={sharedStyles.hoursBound}>30 min</span>
                                <input
                                    type="range"
                                    min={0.5}
                                    max={8}
                                    step={0.5}
                                    value={hoursPerDay}
                                    onChange={(e) => setHoursPerDay(Number(e.target.value))}
                                    className={sharedStyles.hoursSlider}
                                />
                                <span className={sharedStyles.hoursBound}>8 hrs</span>
                            </div>
                            <p className={sharedStyles.cpHint}>
                                We estimate ~15 min per content chunk, so {hoursPerDay} hr/day ≈{" "}
                                <strong className="text-zinc-300">{Math.max(1, Math.round(hoursPerDay * 4))} chunks</strong> per session.
                            </p>
                        </div>
                    </section>

                    {/* ── Documents ─────────────────────────────────────── */}
                    <section className={sharedStyles.cpSection}>
                        <h2 className={sharedStyles.cpSectionTitle}>Documents <span className={sharedStyles.optional}>(optional)</span></h2>
                        <p className={sharedStyles.cpHint}>PDF, DOCX, TXT, or Markdown files.</p>

                        <div className={sharedStyles.fileDropArea} onClick={() => fileInputRef.current?.click()}>
                            <span className={sharedStyles.fileDropIcon}>📄</span>
                            <span>Click to select files</span>
                            <span className={sharedStyles.cpHint}>or drag & drop</span>
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                accept=".pdf,.docx,.txt,.md,text/plain,text/markdown"
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                            />
                        </div>

                        {files.length > 0 && (
                            <ul className={sharedStyles.fileList}>
                                {files.map((f, i) => (
                                    <li key={i} className={sharedStyles.fileItem}>
                                        <span className={sharedStyles.fileName}>{f.name}</span>
                                        <span className={sharedStyles.fileSize}>{(f.size / 1024).toFixed(0)} KB</span>
                                        <button
                                            type="button"
                                            className={sharedStyles.fileRemove}
                                            onClick={() => removeFile(i)}
                                            aria-label="Remove file"
                                        >
                                            ✕
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>

                    {/* ── YouTube URLs ──────────────────────────────────── */}
                    <section className={sharedStyles.cpSection}>
                        <h2 className={sharedStyles.cpSectionTitle}>YouTube URLs <span className={sharedStyles.optional}>(optional)</span></h2>
                        <p className={sharedStyles.cpHint}>Paste video URLs — we'll extract the transcript automatically.</p>

                        <div className={sharedStyles.urlList}>
                            {urlEntries.map((entry) => (
                                <div key={entry.id} className={sharedStyles.urlRow}>
                                    <input
                                        type="url"
                                        className={sharedStyles.cpInput}
                                        placeholder="https://youtube.com/watch?v=…"
                                        value={entry.value}
                                        onChange={(e) => updateUrlEntry(entry.id, e.target.value)}
                                    />
                                    {urlEntries.length > 1 && (
                                        <button
                                            type="button"
                                            className={sharedStyles.urlRemove}
                                            onClick={() => removeUrlEntry(entry.id)}
                                            aria-label="Remove URL"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button type="button" className={sharedStyles.btnAddUrl} onClick={addUrlEntry}>
                            + Add another URL
                        </button>
                    </section>

                    {/* ── Submit ────────────────────────────────────────── */}
                    <button
                        type="submit"
                        className={sharedStyles.btnSubmit}
                        disabled={!title.trim() || submitting}
                    >
                        {hasAnySources ? "Create path & start processing" : "Create path"}
                    </button>
                    {!hasAnySources && (
                        <p className={sharedStyles.cpHint} style={{ marginTop: "0.5rem", textAlign: "center" }}>
                            You can add documents later from the path page.
                        </p>
                    )}
                </form>
            )}
        </div>
    );
}
