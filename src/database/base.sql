-- Tabelas Administrativas
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE questionnaires (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(20) NOT NULL CHECK (status IN ('draft', 'published')),
  created_by INT NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE pages (
  id SERIAL PRIMARY KEY,
  questionnaire_id INT NOT NULL REFERENCES questionnaires(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  sequence_number INT NOT NULL,
  is_identification_page BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(20) NOT NULL CHECK (
    type IN ('text', 'number', 'date', 'file', 'choice')
  ),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE page_questions (
  id SERIAL PRIMARY KEY,
  page_id INT NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  question_id INT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  sequence_number INT NOT NULL,
  required BOOLEAN NOT NULL DEFAULT false,
  configuration JSONB NOT NULL DEFAULT '{}'
);

-- Tabelas de Respostas
CREATE TABLE submissions (
  id SERIAL PRIMARY KEY,
  questionnaire_id INT NOT NULL REFERENCES questionnaires(id),
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  status VARCHAR(20) NOT NULL CHECK (status IN ('partial', 'complete')) DEFAULT 'partial'
);

CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  submission_id INT NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
  page_question_id INT NOT NULL REFERENCES page_questions(id),
  value JSONB NOT NULL
);

CREATE TABLE alerts (
  id SERIAL PRIMARY KEY,
  submission_id INT NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
  answer_id INT NOT NULL REFERENCES answers(id) ON DELETE CASCADE,
  alert_config JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status VARCHAR(20) NOT NULL CHECK (status IN ('new', 'viewed', 'resolved')) DEFAULT 'new'
);

-- Índices importantes
CREATE INDEX idx_page_questions_page ON page_questions(page_id);

CREATE INDEX idx_page_questions_question ON page_questions(question_id);

CREATE INDEX idx_answers_submission ON answers(submission_id);

CREATE INDEX idx_alerts_submission ON alerts(submission_id);

CREATE INDEX idx_questionnaires_owner ON questionnaires(created_by);