-- Create experiments table
CREATE TABLE public.experiments (
    id BIGSERIAL PRIMARY KEY,
    participant_id TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create trials table
CREATE TABLE public.trials (
    id BIGSERIAL PRIMARY KEY,
    experiment_id BIGINT REFERENCES public.experiments(id),
    trial_number INTEGER NOT NULL,
    question_id TEXT NOT NULL, -- Format: [Pitch][Gap][Order] e.g., "LMN" or "HSR"
    sequence_a_first_tone INTEGER NOT NULL, -- Always 500Hz
    sequence_a_second_tone INTEGER NOT NULL, -- 400Hz, 500Hz, or 600Hz
    sequence_a_gap_duration INTEGER NOT NULL, -- 540ms, 600ms, or 660ms
    sequence_b_first_tone INTEGER NOT NULL, -- Always 500Hz
    sequence_b_second_tone INTEGER NOT NULL, -- 400Hz, 500Hz, or 600Hz
    sequence_b_gap_duration INTEGER NOT NULL, -- 540ms, 600ms, or 660ms
    response TEXT CHECK (response IN ('longer', 'equal', 'shorter')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes
CREATE INDEX idx_trials_experiment_id ON public.trials(experiment_id);
CREATE INDEX idx_trials_created_at ON public.trials(created_at);
CREATE INDEX idx_trials_question_id ON public.trials(question_id);

-- Create row level security policies
ALTER TABLE public.experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trials ENABLE ROW LEVEL SECURITY;

-- Allow anonymous insert but only select their own data
CREATE POLICY "Allow anonymous insert" ON public.experiments
    FOR INSERT TO anon
    WITH CHECK (true);

CREATE POLICY "Allow select own experiments" ON public.experiments
    FOR SELECT TO anon
    USING (true);

CREATE POLICY "Allow anonymous insert trials" ON public.trials
    FOR INSERT TO anon
    WITH CHECK (true);

CREATE POLICY "Allow select own trials" ON public.trials
    FOR SELECT TO anon
    USING (true);