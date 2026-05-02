export type DocumentItem = {
    id: number;
    user_id: number;
    title: string;
    source: string;
    created_at: string;
    updated_at: string;
};

export type QuestionItem = {
    id: number;
    concept_id: number;
    question_text: string;
    correct_answer: string;
    options: { difficulty?: string } | null;
};

export type UserItem = {
    id: number;
    email: string;
    full_name: string | null;
};

export type DailyPlan = {
    id: number;
    learning_path_id: number;
    day_number: number;
    title: string;
    description: string | null;
    chunk_ids: number[];
    estimated_minutes: number;
    created_at: string;
};

export type LearningPathSummary = {
    id: number;
    title: string;
    description: string | null;
    hours_per_day: number;
    total_days: number | null;
    status: string;
    created_at: string;
    updated_at: string;
    document_count: number;
};

export type LearningPathDetail = LearningPathSummary & {
    user_id: number;
    daily_plans: DailyPlan[];
};