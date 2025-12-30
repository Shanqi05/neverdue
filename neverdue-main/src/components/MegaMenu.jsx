import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Server, Shield, Database, Wrench, ArrowRight, LayoutGrid,
    Cpu, Globe, Lock, Code, Users, Briefcase, Rocket, Star,
    Cloud, Fingerprint, Brain, LineChart, Wand2, ListTodo, Network
} from 'lucide-react';

const MegaMenu = ({ activeMenu, setActiveMenu }) => {
    const [activeCategory, setActiveCategory] = useState('');
    const navigate = useNavigate();

    // =========================================================
    // 1. DATA CONFIGURATION
    // =========================================================
    const menuConfig = {
        products: {
            title: "Products",
            categories: ['Featured', 'Cloud', 'Security', 'AI & Data', 'Dev Tools'],
            data: {
                // --- Featured  ---
                'Featured': [
                    { id: 1, name: 'CloudStack Pro', desc: 'All-in-one infrastructure.', icon: <Star size={24} color="#f59e0b" />, link: '/products/1' },
                    { id: 4, name: 'SecureShield Suite', desc: 'Top-tier cybersecurity.', icon: <Shield size={24} color="#16a34a" />, link: '/products/4' },
                    { id: 7, name: 'InsightAI Analytics', desc: 'Actionable business insights.', icon: <Brain size={24} color="#2563eb" />, link: '/products/7' },
                ],
                // --- Cloud (ID 1-3) ---
                'Cloud': [
                    { id: 1, name: 'CloudStack Pro', desc: 'Infrastructure platform.', icon: <Globe size={24} color="#0ea5e9" />, link: '/products/1' },
                    { id: 2, name: 'CloudVault', desc: 'Secure cloud storage.', icon: <Database size={24} color="#0ea5e9" />, link: '/products/2' },
                    { id: 3, name: 'CloudDeploy Manager', desc: 'Automated deployment.', icon: <Cloud size={24} color="#0ea5e9" />, link: '/products/3' },
                ],
                // --- Security (ID 4-6) ---
                'Security': [
                    { id: 4, name: 'SecureShield Suite', desc: 'System protection.', icon: <Shield size={24} color="#16a34a" />, link: '/products/4' },
                    { id: 5, name: 'DataLock Encrypt', desc: 'Advanced encryption.', icon: <Lock size={24} color="#16a34a" />, link: '/products/5' },
                    { id: 6, name: 'AccessGuard IAM', desc: 'Identity management.', icon: <Fingerprint size={24} color="#16a34a" />, link: '/products/6' },
                ],
                // --- AI & Data (ID 7-9) ---
                'AI & Data': [
                    { id: 7, name: 'InsightAI Analytics', desc: 'Actionable insights.', icon: <Brain size={24} color="#2563eb" />, link: '/products/7' },
                    { id: 8, name: 'SmartPredict Engine', desc: 'Future trend forecast.', icon: <LineChart size={24} color="#2563eb" />, link: '/products/8' },
                    { id: 9, name: 'DataSense Studio', desc: 'Visual data processing.', icon: <Wand2 size={24} color="#2563eb" />, link: '/products/9' },
                ],
                // --- Dev Tools (ID 10-12) ---
                'Dev Tools': [
                    { id: 10, name: 'CodeFlow IDE', desc: 'Cloud coding environment.', icon: <Code size={24} color="#f59e0b" />, link: '/products/10' },
                    { id: 11, name: 'DevTrack Manager', desc: 'Project management.', icon: <ListTodo size={24} color="#f59e0b" />, link: '/products/11' },
                    { id: 12, name: 'APIBuilder Pro', desc: 'API design & testing.', icon: <Network size={24} color="#f59e0b" />, link: '/products/12' },
                ]
            }
        },

        // --- SERVICES  ---
        services: {
            title: "Services & Impact",
            categories: ['Expert Services', 'Warranty', 'Green Initiative'],
            data: {
                'Expert Services': [
                    { id: 20, name: 'Custom Engineering', desc: 'Full-stack development.', icon: <Code size={24} color="#7c3aed" />, badge: 'Popular', link: '/services/custom-engineering' },
                    { id: 21, name: 'Legacy Modernization', desc: 'Transform aging systems.', icon: <Wrench size={24} color="#7c3aed" />, link: '/services/legacy-modernization' },
                    { id: 22, name: 'Staff Augmentation', desc: 'Elite senior developers.', icon: <Users size={24} color="#7c3aed" />, badge: 'New', link: '/services/staff-augmentation' },
                ],
                'Warranty': [
                    { id: 23, name: '90-Day Assurance', desc: 'Zero-cost bug fixes.', icon: <Shield size={24} color="#10b981" />, link: '/services#warranty' },
                    { id: 24, name: 'Performance SLA', desc: '99.9% uptime guarantee.', icon: <Server size={24} color="#10b981" />, link: '/services#warranty' },
                ],
                'Green Initiative': [
                    { id: 25, name: 'The Digital Forest', desc: '100 trees planted.', icon: <Globe size={24} color="#059669" />, badge: '15K+ Trees', link: '/services#green' },
                    { id: 26, name: 'Carbon Neutral Code', desc: 'Renewable energy infra.', icon: <Cpu size={24} color="#059669" />, link: '/services#green' },
                ]
            }
        },

        // --- ABOUT  ---
        about: {
            title: "About Us",
            categories: ['Company', 'How To Join Us', 'Partner'],
            data: {
                'Company': [
                    { id: 30, name: 'About NeverDue', desc: 'Excellence never overdue.', icon: <Globe size={24} color="#db2777" />, badge: 'Our Story', link: '/about#company' },
                    { id: 31, name: 'Mission & Vision', desc: 'Leading with innovation.', icon: <LayoutGrid size={24} color="#db2777" />, link: '/about/mission-vision' },
                    { id: 32, name: 'Our Director', desc: 'Industry veterans.', icon: <Users size={24} color="#db2777" />, link: '/about/our-director' },
                ],
                'How To Join Us': [
                    { id: 33, name: 'Life at NeverDue', desc: 'Flexible hours culture.', icon: <Rocket size={24} color="#db2777" />, link: '/about/life-at-neverdue' },
                    { id: 34, name: 'University Program', desc: 'Elite internships.', icon: <Code size={24} color="#db2777" />, badge: 'Hiring', link: '/about/university-program' },
                    { id: 35, name: 'Career Opportunities', desc: 'Join our global team.', icon: <Briefcase size={24} color="#db2777" />, link: '/about#join' },
                ],
                'Partner': [
                    { id: 36, name: 'Technology Partners', desc: 'Collaborating globally.', icon: <Cpu size={24} color="#db2777" />, link: '/about#partner' },
                    { id: 37, name: 'Become a Partner', desc: 'Build the future.', icon: <Users size={24} color="#db2777" />, badge: 'Join Us', link: '/about/become-partner' },
                ]
            }
        }
    };

    // =========================================================
    // 2. LOGIC
    // =========================================================

    useEffect(() => {
        if (activeMenu && menuConfig[activeMenu]) {
            const firstCategory = menuConfig[activeMenu].categories[0];
            setActiveCategory(firstCategory);
        }
    }, [activeMenu]);

    const handleCategoryClick = (category, e) => {
        if (activeMenu === 'products') {
            e.preventDefault();
            setActiveMenu(null);

            // Featured -> Scroll to Recommended Section
            if (category === 'Featured') {
                navigate('/products', { state: { scrollTo: 'recommended' } });
            } else {
                navigate('/products', { state: { category: category } });
            }
        } else {
            setActiveMenu(null);
        }
    };

    if (!activeMenu || !menuConfig[activeMenu]) return null;

    const currentContent = menuConfig[activeMenu];

    // =========================================================
    // 3. STYLES
    // =========================================================
    const styles = {
        overlay: { position: 'fixed', top: '80px', left: 0, width: '100%', height: '100vh', backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 998 },
        container: { position: 'fixed', top: '80px', left: '50%', transform: 'translateX(-50%)', width: '900px', backgroundColor: '#ffffff', borderRadius: '0 0 12px 12px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', display: 'flex', zIndex: 999, animation: 'slideDown 0.2s ease-out', overflow: 'hidden', borderTop: '1px solid #eee' },
        sidebar: { width: '240px', backgroundColor: '#f4f5f7', padding: '24px 16px', display: 'flex', flexDirection: 'column', borderRight: '1px solid #dfe1e6', flexShrink: 0 },
        contentArea: { flex: 1, padding: '32px', backgroundColor: '#fff' },
        catItem: (isActive) => ({ padding: '10px 16px', cursor: 'pointer', borderRadius: '6px', marginBottom: '4px', color: isActive ? '#0052cc' : '#42526e', backgroundColor: isActive ? '#deebff' : 'transparent', fontWeight: isActive ? '600' : '500', fontSize: '14px', transition: 'all 0.1s', textDecoration: 'none', display: 'block' }),
        grid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' },
        card: { display: 'flex', gap: '12px', textDecoration: 'none', padding: '12px', borderRadius: '8px', transition: 'background 0.2s', alignItems: 'flex-start' }
    };

    return (
        <>
            <div style={styles.overlay} onMouseEnter={() => setActiveMenu(null)} />
            <div style={styles.container} onMouseLeave={() => setActiveMenu(null)}>
                <style>{`@keyframes slideDown { from { opacity: 0; transform: translate(-50%, -10px); } to { opacity: 1; transform: translate(-50%, 0); } } .menu-card:hover { background-color: #f4f5f7; }`}</style>
                <div style={styles.sidebar}>
                    <div style={{ marginBottom: '16px', paddingLeft: '16px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#6b778c' }}>Categories</div>
                    {currentContent.categories.map((cat) => {
                        const categoryLinks = { 'Expert Services': '/services#expert-services', 'Warranty': '/services#warranty', 'Green Initiative': '/services#green', 'Company': '/about#company', 'How To Join Us': '/about#join', 'Partner': '/about#partner' };
                        return (
                            <Link key={cat} to={activeMenu === 'products' ? '/products' : (categoryLinks[cat] || `/${activeMenu}`)} style={styles.catItem(activeCategory === cat)} onMouseEnter={() => setActiveCategory(cat)} onClick={(e) => handleCategoryClick(cat, e)}>
                                {cat}
                            </Link>
                        );
                    })}
                    <Link to={`/${activeMenu}`} style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px', color: '#0052cc', fontWeight: '600', fontSize: '14px', textDecoration: 'none', padding: '12px 16px' }} onClick={() => setActiveMenu(null)}>
                        View all {currentContent.title} <ArrowRight size={14} />
                    </Link>
                </div>
                <div style={styles.contentArea}>
                    <div style={{ marginBottom: '24px', fontSize: '14px', fontWeight: '600', color: '#44546f' }}>{activeCategory} {currentContent.title}</div>
                    <div style={styles.grid}>
                        {currentContent.data[activeCategory]?.map((item) => (
                            <Link to={item.link || `/${activeMenu}`} key={item.id} style={styles.card} className="menu-card" onClick={() => setActiveMenu(null)}>
                                <div style={{ marginTop: '2px' }}>{item.icon}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                        <div style={{ color: '#172b4d', fontWeight: '600', fontSize: '15px' }}>{item.name}</div>
                                        {item.badge && <span style={{ fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '12px', backgroundColor: activeMenu === 'services' ? '#10b98133' : '#db277733', color: activeMenu === 'services' ? '#059669' : '#db2777', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.badge}</span>}
                                    </div>
                                    <div style={{ color: '#6b778c', fontSize: '13px', lineHeight: '1.4' }}>{item.desc}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MegaMenu;