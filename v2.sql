-- Criação das tabelas do sistema de reserva de salas (versão refinada 2.0)

-- Tipos enumerados
CREATE TYPE status_tipo AS ENUM ('ativo', 'inativo', 'pendente', 'cancelado', 'concluido');
CREATE TYPE permission_tipo AS ENUM ('admin', 'gestor', 'usuario', 'visitante');
CREATE TYPE payment_status_tipo AS ENUM ('ativo', 'cancelado', 'pendente', 'falha', 'trial', 'expirado');

-- Tabela de categorias de empresa
CREATE TABLE company_categories (
    id serial PRIMARY KEY,
    description varchar(100) NOT NULL,
    partition_prefix varchar(20)
);

-- Tabela de planos
CREATE TABLE plans (
    id serial PRIMARY KEY,
    name varchar(100) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    interval varchar(20) NOT NULL, -- mensal, anual, etc
    features jsonb,
    active boolean DEFAULT true,
    stripe_plan_id varchar(100),
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de empresas
CREATE TABLE companies (
    id serial PRIMARY KEY,
    cpf_cnpj varchar(20) NOT NULL, -- CPF/CNPJ
    cep varchar(10),
    category_id integer REFERENCES company_categories(id),
    created_by integer NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by integer NOT NULL,
    updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    logo_url text,
    provider integer,
    status status_tipo NOT NULL DEFAULT 'ativo',
    current_plan_id integer REFERENCES plans(id),
    current_payment_status payment_status_tipo DEFAULT 'trial',
    stripe_customer_id varchar(100),
    name varchar(200),
    phone varchar(20),
    city varchar(100),
    state varchar(50),
    country varchar(50),
    address varchar(200),
    address_number varchar(20),
    default_availability jsonb
);

-- Histórico de assinaturas de planos
CREATE TABLE company_subscription_history (
    id serial PRIMARY KEY,
    company_id integer NOT NULL REFERENCES companies(id),
    plan_id integer NOT NULL REFERENCES plans(id),
    payment_status payment_status_tipo NOT NULL,
    started_at timestamp with time zone NOT NULL,
    ended_at timestamp with time zone,
    amount_paid numeric(10,2),
    stripe_subscription_id varchar(100),
    stripe_payment_intent_id varchar(100),
    metadata jsonb,
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de pessoas
CREATE TABLE people (
    id serial PRIMARY KEY,
    cpf varchar(20), -- CPF/CNPJ
    phone_number varchar(20) NOT NULL,
    cep varchar(10),
    created_by integer NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by integer NOT NULL,
    updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    company_id integer NOT NULL REFERENCES companies(id),
    photo_url text,
    name varchar(200),
    role varchar(100),
    city varchar(100),
    state varchar(50),
    country varchar(50),
    address varchar(200),
    address_number varchar(20),
    birth_date date
);

-- Tabela de usuários
CREATE TABLE users (
    id serial PRIMARY KEY,
    status status_tipo DEFAULT 'ativo',
    reset_code varchar(100),
    created_by integer NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by integer NOT NULL,
    updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    permission permission_tipo NOT NULL DEFAULT 'usuario',
    company_id integer REFERENCES companies(id),
    person_id integer REFERENCES people(id),
    username varchar(100) NOT NULL,
    password varchar(255) NOT NULL,
    push_token varchar(255),
    UNIQUE(username, company_id)
);

-- Tabela de espaços
CREATE TABLE spaces (
    id serial PRIMARY KEY,
    status status_tipo DEFAULT 'ativo',
    multiple_bookings boolean DEFAULT false,
    photo_url text,
    company_id integer NOT NULL REFERENCES companies(id),
    name varchar(100) NOT NULL,
    created_by integer NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by integer NOT NULL,
    updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de disponibilidade
CREATE TABLE availabilities (
    id serial PRIMARY KEY,
    active boolean DEFAULT true,
    min_days_cancel integer,
    weekday_index integer,
    interval_minutes integer,
    space_id integer REFERENCES spaces(id),
    opening_time number NOT NULL,
    closing_time number NOT NULL,
    weekday varchar(20) NOT NULL,
    company_id integer NOT NULL REFERENCES companies(id)
);

-- Tabela de responsáveis por espaços
CREATE TABLE space_managers (
    id serial PRIMARY KEY,
    space_id integer NOT NULL REFERENCES spaces(id),
    user_id integer NOT NULL REFERENCES users(id),
    company_id integer NOT NULL REFERENCES companies(id),
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(space_id, user_id)
);

-- Tabela de reservas (com status direto na tabela)
CREATE TABLE bookings (
    id serial PRIMARY KEY,
    booking_date timestamp with time zone NOT NULL,
    weekday_index integer,
    space_id integer NOT NULL REFERENCES spaces(id),
    user_id integer NOT NULL REFERENCES users(id),
    company_id integer NOT NULL REFERENCES companies(id),
    start_time number NOT NULL,
    end_time number NOT NULL,
    notes text,
    status status_tipo NOT NULL DEFAULT 'pendente',
    status_updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de histórico de status de reservas
CREATE TABLE booking_status_history (
    id serial PRIMARY KEY,
    booking_id integer NOT NULL REFERENCES bookings(id),
    status status_tipo NOT NULL,
    status_date timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    company_id integer NOT NULL REFERENCES companies(id),
    changed_by integer NOT NULL REFERENCES users(id)
);

-- Criar índices para otimização
CREATE INDEX idx_bookings_space_id ON bookings(space_id);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_company_id ON bookings(company_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_spaces_company_id ON spaces(company_id);
CREATE INDEX idx_users_company_id ON users(company_id);
CREATE INDEX idx_people_company_id ON people(company_id);
CREATE INDEX idx_companies_current_plan_id ON companies(current_plan_id);
CREATE INDEX idx_companies_payment_status ON companies(current_payment_status);
CREATE INDEX idx_subscription_company_id ON company_subscription_history(company_id);
CREATE INDEX idx_subscription_plan_id ON company_subscription_history(plan_id);