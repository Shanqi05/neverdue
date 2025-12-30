-- =============================================
-- DROP ALL EXISTING TABLES
-- =============================================
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS subscriptions CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS products CASCADE;

-- =============================================
-- CREATE PRODUCTS TABLE
-- =============================================
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    price VARCHAR(50) NOT NULL,
    recommended BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- CREATE USERS TABLE
-- =============================================
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'Member',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- CREATE SUBSCRIPTIONS TABLE
-- =============================================
CREATE TABLE subscriptions (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'active',
    UNIQUE(user_id, product_id)
);

-- =============================================
-- CREATE MESSAGES TABLE
-- =============================================
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'unread',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- INSERT PRODUCT DATA
-- =============================================
INSERT INTO products (title, category, description, price, recommended) VALUES
-- Cloud Products
('CloudStack Pro', 'Cloud', 'All-in-one cloud infrastructure management platform.', 'RM29/mo', true),
('CloudVault Storage', 'Cloud', 'Secure and scalable cloud storage solution for backup.', 'RM19/mo', false),
('CloudDeploy Manager', 'Cloud', 'Automate application deployment with minimal downtime.', 'RM25/mo', false),

-- Security Products
('SecureShield Suite', 'Security', 'Comprehensive cybersecurity against malware and phishing.', 'RM35/mo', true),
('DataLock Encrypt', 'Security', 'Advanced data encryption for data at rest and in transit.', 'RM22/mo', false),
('AccessGuard IAM', 'Security', 'Identity and access management for user permissions.', 'RM28/mo', false),

-- AI & Data Products
('InsightAI Analytics', 'AI & Data', 'Transform raw data into actionable business insights.', 'RM39/mo', true),
('SmartPredict Engine', 'AI & Data', 'Forecast trends and behavior using historical data.', 'RM45/mo', false),
('DataSense Studio', 'AI & Data', 'Clean, analyze, and present data efficiently.', 'RM32/mo', false),

-- Dev Tools Products
('CodeFlow IDE', 'Dev Tools', 'Cloud-based environment for collaborative coding.', 'RM20/mo', false),
('DevTrack Manager', 'Dev Tools', 'Project management tool for software teams.', 'RM18/mo', false),
('APIBuilder Pro', 'Dev Tools', 'Design, test, and manage APIs for faster integration.', 'RM24/mo', false);

-- =============================================
-- CREATE INDEXES FOR BETTER PERFORMANCE
-- =============================================
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_product_id ON subscriptions(product_id);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_messages_user_id ON messages(user_id);
CREATE INDEX idx_messages_status ON messages(status);

-- =============================================
-- ENABLE ROW LEVEL SECURITY
-- =============================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- =============================================
-- CREATE RLS POLICIES
-- =============================================

-- Products: Everyone can read
CREATE POLICY "Products are viewable by everyone" 
ON products FOR SELECT 
USING (true);

-- Users: Users can view their own data
CREATE POLICY "Users can view own profile" 
ON users FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON users FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
ON users FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Subscriptions: Users can manage their own subscriptions
CREATE POLICY "Users can view own subscriptions" 
ON subscriptions FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscriptions" 
ON subscriptions FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own subscriptions" 
ON subscriptions FOR DELETE 
USING (auth.uid() = user_id);

-- Messages: Users can view their own messages, anyone can insert (for contact form)
CREATE POLICY "Users can view own messages" 
ON messages FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can insert messages" 
ON messages FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update own messages" 
ON messages FOR UPDATE 
USING (auth.uid() = user_id);
