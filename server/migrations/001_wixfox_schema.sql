-- ==============================================================================
-- WixFox Technologies — Database Schema (PostgreSQL / Supabase / Neon / AWS RDS)
-- Version: 2.1.0
-- ==============================================================================

-- 1. Company Profile Table
CREATE TABLE IF NOT EXISTS company_profile (
    id VARCHAR(50) PRIMARY KEY DEFAULT 'primary',
    name VARCHAR(255) NOT NULL DEFAULT 'Wixfox Technologies',
    tagline VARCHAR(255) DEFAULT 'Your Growth, Our Technology.',
    subtitle VARCHAR(255) DEFAULT 'WEBSITES | SOFTWARE | MARKETING | GROWTH SYSTEMS',
    phone VARCHAR(50) DEFAULT '+91 8511083277',
    email VARCHAR(100) DEFAULT 'info@wixfox.com',
    website VARCHAR(100) DEFAULT 'www.wixfox.com',
    address TEXT DEFAULT 'Borichi, Gandhidham, Gujarat 370110, India',
    slogan TEXT DEFAULT 'MORE VISIBILITY | MORE CUSTOMERS | MORE GROWTH',
    services_list JSONB DEFAULT '["Websites & E-commerce", "Mobile Apps", "CRM & ERP Software", "Digital Marketing", "Business Automation"]',
    authorized_signatory VARCHAR(100) DEFAULT 'Wixfox Technologies',
    bank_details JSONB DEFAULT '{"bankName": "HDFC Bank", "accountNumber": "50200088992211", "ifscCode": "HDFC0001234", "upiId": "wixfox@upi"}',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Services Catalog Table
CREATE TABLE IF NOT EXISTS services (
    id VARCHAR(50) PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    short_desc TEXT,
    details JSONB NOT NULL DEFAULT '[]',
    default_duration VARCHAR(100) DEFAULT 'One Time',
    default_price NUMERIC(12, 2) NOT NULL DEFAULT 0,
    price_unit VARCHAR(100) DEFAULT 'INR',
    popular BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);

-- 3. Leads Pipeline Table
CREATE TABLE IF NOT EXISTS leads (
    id VARCHAR(50) PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255),
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    service_interest VARCHAR(255),
    estimated_budget NUMERIC(12, 2) DEFAULT 0,
    status VARCHAR(50) NOT NULL DEFAULT 'New', -- New, Contacted, In Discussion, Proposal Sent, Won, Lost
    source VARCHAR(100) DEFAULT 'Direct',
    last_contact_date DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);

-- 4. Projects Tracker Table
CREATE TABLE IF NOT EXISTS projects (
    id VARCHAR(50) PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    services JSONB DEFAULT '[]',
    total_price NUMERIC(12, 2) NOT NULL DEFAULT 0,
    paid_amount NUMERIC(12, 2) DEFAULT 0,
    start_date DATE,
    deadline DATE,
    status VARCHAR(50) NOT NULL DEFAULT 'In Progress', -- Planning, In Progress, Review, Completed
    progress_percent INT DEFAULT 0,
    deliverables TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_client ON projects(client_name);

-- 5. Quotations & Invoices Table
CREATE TABLE IF NOT EXISTS quotations (
    id VARCHAR(50) PRIMARY KEY,
    quotation_no VARCHAR(100) UNIQUE NOT NULL,
    document_type VARCHAR(50) NOT NULL DEFAULT 'QUOTATION', -- QUOTATION, TAX INVOICE, PROFORMA INVOICE
    category_title VARCHAR(255) DEFAULT 'DIGITAL MARKETING SERVICES',
    date DATE NOT NULL,
    valid_till VARCHAR(100),
    client JSONB NOT NULL DEFAULT '{}',
    items JSONB NOT NULL DEFAULT '[]',
    total_amount NUMERIC(12, 2) NOT NULL DEFAULT 0,
    amount_in_words TEXT,
    service_breakdown JSONB DEFAULT '[]',
    terms_and_conditions JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_quotations_no ON quotations(quotation_no);
CREATE INDEX IF NOT EXISTS idx_quotations_type ON quotations(document_type);

-- 6. Audit & System Activity Logs
CREATE TABLE IF NOT EXISTS audit_logs (
    id SERIAL PRIMARY KEY,
    action VARCHAR(100) NOT NULL,
    entity VARCHAR(50) NOT NULL,
    entity_id VARCHAR(50),
    details JSONB DEFAULT '{}',
    ip_address VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at);
