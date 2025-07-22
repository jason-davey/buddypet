-- Create quote_steps table for Supabase integration
CREATE TABLE IF NOT EXISTS quote_steps (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  step_number INT NOT NULL,
  step_name TEXT NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_quote_steps_session_id ON quote_steps(session_id);
CREATE INDEX IF NOT EXISTS idx_quote_steps_step_number ON quote_steps(step_number);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_quote_steps_updated_at 
    BEFORE UPDATE ON quote_steps 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
