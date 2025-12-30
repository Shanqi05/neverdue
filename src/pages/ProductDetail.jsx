import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import {
  // Icons
  BarChart3, Activity, Zap, PieChart,
  Lock, Cloud, UploadCloud, Share2,
  Rocket, GitBranch, Terminal, RefreshCw,
  CheckCircle2, ShieldAlert, FileKey, Fingerprint,
  Smartphone, Key, Users, ArrowLeft,
  Brain, LineChart, TrendingUp, FileDigit,
  LayoutDashboard, Download, ClipboardCheck,
  Settings, Table, Wand2, FileSpreadsheet, Presentation,
  Code2, Bug, Laptop, ListTodo, CalendarRange,
  Network, History, Plug, Server
} from 'lucide-react';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // ==========================================
  // ALL PRODUCTS DATA (Full Content)
  // ==========================================
  const productsData = {
    // --- ☁️ CLOUD CATEGORY (ID 1-3) ---
    1: {
      title: "CloudStack Pro",
      subtitle: "A centralized platform to control multi-cloud environments efficiently and securely.",
      heroDesc: "Manage, monitor, and scale your cloud infrastructure with ease.",
      heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      overview: [
        "CloudStack Pro is a cloud infrastructure management platform designed to help organizations deploy, monitor, and scale applications across multiple cloud providers.",
        "It provides real-time monitoring, centralized control, and performance optimization to reduce operational complexity and cost."
      ],
      overviewImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      features: [
        { icon: <Activity size={32} color="#0052cc"/>, text: "Centralized multi-cloud management dashboard" },
        { icon: <BarChart3 size={32} color="#0052cc"/>, text: "Real-time performance and resource monitoring" },
        { icon: <Zap size={32} color="#0052cc"/>, text: "Automated scaling based on system load" },
        { icon: <PieChart size={32} color="#0052cc"/>, text: "Cost optimization and usage reports" }
      ],
      howItWorks: [
        "Connect your cloud providers to CloudStack Pro",
        "Monitor system performance through a unified dashboard",
        "Automatically scale resources based on demand",
        "Optimize cloud costs using detailed analytics"
      ],
      useCases: ["Startups managing multiple cloud environments", "IT teams monitoring server performance", "Businesses optimizing cloud resource usage"],
      price: "RM 29 / month",
      priceDesc: "Includes full dashboard access, monitoring, and auto-scaling features."
    },
    2: {
      title: "CloudVault Storage",
      subtitle: "Backup, store, and recover your files anytime, anywhere.",
      heroDesc: "Secure, scalable, and reliable cloud storage for your data.",
      heroImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      overview: [
        "CloudVault Storage is a secure cloud-based storage solution designed for data backup, file sharing, and disaster recovery.",
        "It ensures high availability and data protection through encryption and redundancy."
      ],
      overviewImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      features: [
        { icon: <Lock size={32} color="#16a34a"/>, text: "Secure data encryption" },
        { icon: <RefreshCw size={32} color="#16a34a"/>, text: "Automatic backup and recovery" },
        { icon: <Cloud size={32} color="#16a34a"/>, text: "Scalable storage capacity" },
        { icon: <Share2 size={32} color="#16a34a"/>, text: "Easy file sharing and access control" }
      ],
      howItWorks: [
        "Upload files to CloudVault Storage",
        "Data is encrypted and securely stored",
        "Access or restore files anytime",
        "Share files with controlled permissions"
      ],
      useCases: ["Businesses backing up critical data", "Teams sharing files securely", "Disaster recovery planning"],
      price: "RM 19 / month",
      priceDesc: "Secure storage with automatic backup and encryption."
    },
    3: {
      title: "CloudDeploy Manager",
      subtitle: "Simplify deployment and reduce downtime.",
      heroDesc: "Deploy applications faster with automated cloud workflows.",
      heroImage: "https://images.unsplash.com/photo-1667372393119-c81c0cda0b18?auto=format&fit=crop&w=1200&q=80",
      overview: [
        "CloudDeploy Manager automates application deployment and server configuration, enabling faster releases and reduced human error.",
        "It supports continuous integration and deployment (CI/CD) workflows."
      ],
      overviewImage: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80",
      features: [
        { icon: <Rocket size={32} color="#f59e0b"/>, text: "Automated application deployment" },
        { icon: <GitBranch size={32} color="#f59e0b"/>, text: "CI/CD pipeline integration" },
        { icon: <RefreshCw size={32} color="#f59e0b"/>, text: "Rollback and version control" },
        { icon: <Terminal size={32} color="#f59e0b"/>, text: "Deployment status monitoring" }
      ],
      howItWorks: [
        "Connect your code repository",
        "Configure deployment rules",
        "Deploy automatically to servers",
        "Monitor deployment status"
      ],
      useCases: ["Software teams automating release cycles", "Reducing deployment downtime", "Managing multiple server environments"],
      price: "RM 25 / month",
      priceDesc: "Automate your workflows with unlimited deployments."
    },

    // --- 🔐 SECURITY CATEGORY (ID 4-6) ---
    4: {
      title: "SecureShield Suite",
      subtitle: "Real-time security monitoring and threat prevention.",
      heroDesc: "Protect your systems from modern cyber threats.",
      heroImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
      overview: [
        "SecureShield Suite is an all-in-one cybersecurity solution that detects, prevents, and responds to cyber threats in real time.",
        "It helps organizations maintain system integrity and data security by constantly monitoring for anomalies."
      ],
      overviewImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
      features: [
        { icon: <ShieldAlert size={32} color="#16a34a"/>, text: "Real-time threat detection" },
        { icon: <Zap size={32} color="#16a34a"/>, text: "Malware and phishing protection" },
        { icon: <Activity size={32} color="#16a34a"/>, text: "Security alerts and reports" },
        { icon: <Terminal size={32} color="#16a34a"/>, text: "Automated response actions" }
      ],
      howItWorks: [
        "Install the SecureShield agent on your systems",
        "The system scans for vulnerabilities and malware",
        "Real-time alerts notify you of suspicious activity",
        "Automated protocols block threats instantly"
      ],
      useCases: ["Businesses protecting internal systems", "Organizations preventing cyber attacks", "IT teams managing network security"],
      price: "RM 35 / month",
      priceDesc: "Comprehensive protection for your entire network."
    },
    5: {
      title: "DataLock Encrypt",
      subtitle: "Keep your sensitive data secure with advanced encryption.",
      heroDesc: "End-to-end encryption ensuring confidentiality.",
      heroImage: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1200&q=80",
      overview: [
        "DataLock Encrypt provides end-to-end encryption for sensitive data, ensuring confidentiality during storage and transmission.",
        "It uses advanced cryptographic standards to make sure your data remains accessible only to authorized users."
      ],
      overviewImage: "https://images.unsplash.com/photo-1509822929063-6b6cfc9b42f2?auto=format&fit=crop&w=800&q=80",
      features: [
        { icon: <FileKey size={32} color="#16a34a"/>, text: "Data encryption at rest and in transit" },
        { icon: <Key size={32} color="#16a34a"/>, text: "Secure key management" },
        { icon: <CheckCircle2 size={32} color="#16a34a"/>, text: "Compliance-ready security standards" },
        { icon: <Lock size={32} color="#16a34a"/>, text: "AES-256 standard encryption" }
      ],
      howItWorks: [
        "Select the files or databases to encrypt",
        "Choose your encryption keys and permissions",
        "DataLock encrypts data before storage or transfer",
        "Authorized users decrypt data seamlessly with keys"
      ],
      useCases: ["Healthcare providers protecting patient records", "Financial institutions securing transaction data", "Enterprises meeting GDPR/HIPAA compliance"],
      price: "RM 22 / month",
      priceDesc: "Advanced encryption for total data privacy."
    },
    6: {
      title: "AccessGuard IAM",
      subtitle: "Control who can access your systems and data.",
      heroDesc: "Secure identity and access management for your organization.",
      heroImage: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80",
      overview: [
        "AccessGuard IAM is an identity and access management solution that allows organizations to manage user permissions and monitor login activities securely.",
        "It prevents unauthorized access by ensuring only the right people have the right access to the right resources."
      ],
      overviewImage: "https://images.unsplash.com/photo-1614064548237-096f735f344f?auto=format&fit=crop&w=800&q=80",
      features: [
        { icon: <Users size={32} color="#16a34a"/>, text: "Role-based access control (RBAC)" },
        { icon: <Activity size={32} color="#16a34a"/>, text: "Login activity monitoring" },
        { icon: <Smartphone size={32} color="#16a34a"/>, text: "Multi-factor authentication (MFA)" },
        { icon: <Fingerprint size={32} color="#16a34a"/>, text: "Single Sign-On (SSO) integration" }
      ],
      howItWorks: [
        "Define user roles and access policies",
        "Users log in via secure MFA portal",
        "AccessGuard validates identity and permissions",
        "Admins monitor real-time access logs"
      ],
      useCases: ["Managing remote employee access", "Securing sensitive corporate resources", "Simplifying login with Single Sign-On"],
      price: "RM 28 / month",
      priceDesc: "Secure identity management per user."
    },

    // --- 🤖 AI & DATA CATEGORY (ID 7-9) ---
    7: {
      title: "InsightAI Analytics",
      subtitle: "AI-powered analytics for smarter and faster decision-making.",
      heroDesc: "Turn raw data into actionable business insights.",
      heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      overview: [
        "InsightAI Analytics is an AI-powered data analytics platform that helps organizations analyze large datasets and uncover meaningful insights.",
        "Using machine learning models, it provides trend analysis, predictions, and interactive visualizations to support data-driven decisions."
      ],
      overviewImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
      features: [
        { icon: <Brain size={32} color="#2563eb"/>, text: "AI-driven data analysis and predictions" },
        { icon: <LayoutDashboard size={32} color="#2563eb"/>, text: "Interactive dashboards and reports" },
        { icon: <TrendingUp size={32} color="#2563eb"/>, text: "Automated trend detection" },
        { icon: <Download size={32} color="#2563eb"/>, text: "Exportable insights for business use" }
      ],
      howItWorks: [
        "Upload or connect your data sources",
        "AI models analyze historical patterns",
        "View insights through visual dashboards",
        "Use predictions to support decisions"
      ],
      useCases: ["Business intelligence and reporting", "Sales and performance analysis", "Strategic planning and forecasting"],
      price: "RM 39 / month",
      priceDesc: "Includes AI analytics, dashboards, and predictive insights."
    },
    8: {
      title: "SmartPredict Engine",
      subtitle: "Accurate forecasts powered by historical data.",
      heroDesc: "Predict future trends with machine learning.",
      heroImage: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80",
      overview: [
        "SmartPredict Engine is a machine learning solution designed to forecast trends, customer behavior, and performance metrics based on historical data.",
        "It helps organizations anticipate future outcomes and reduce uncertainty by leveraging advanced predictive models."
      ],
      overviewImage: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80",
      features: [
        { icon: <LineChart size={32} color="#2563eb"/>, text: "Machine learning-based forecasting" },
        { icon: <Settings size={32} color="#2563eb"/>, text: "Customizable prediction models" },
        { icon: <FileDigit size={32} color="#2563eb"/>, text: "Support for multiple data formats" },
        { icon: <ClipboardCheck size={32} color="#2563eb"/>, text: "Accuracy evaluation and reports" }
      ],
      howItWorks: [
        "Import historical datasets",
        "Train prediction models",
        "Generate forecasts",
        "Evaluate prediction accuracy"
      ],
      useCases: ["Demand and sales forecasting", "Customer behavior analysis", "Risk and performance prediction"],
      price: "RM 45 / month",
      priceDesc: "Advanced ML forecasting for enterprise needs."
    },
    9: {
      title: "DataSense Studio",
      subtitle: "Clean, analyze, and visualize data with ease.",
      heroDesc: "Simplify data processing and visualization.",
      heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      overview: [
        "DataSense Studio is a user-friendly data processing and visualization tool that helps teams clean, analyze, and present data efficiently.",
        "It is designed for users with both technical and non-technical backgrounds to transform raw data into clear stories."
      ],
      overviewImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      features: [
        { icon: <Wand2 size={32} color="#2563eb"/>, text: "Data cleaning and transformation tools" },
        { icon: <BarChart3 size={32} color="#2563eb"/>, text: "Visual chart and dashboard builder" },
        { icon: <FileSpreadsheet size={32} color="#2563eb"/>, text: "Multiple file format support" },
        { icon: <Presentation size={32} color="#2563eb"/>, text: "Export-ready reports" }
      ],
      howItWorks: [
        "Import raw datasets (CSV, JSON, SQL)",
        "Clean and organize data with smart tools",
        "Create visual dashboards via drag-and-drop",
        "Export reports and share insights"
      ],
      useCases: ["Preparing data for quarterly reports", "Visualizing marketing campaign results", "Cleaning messy datasets for analysis"],
      price: "RM 32 / month",
      priceDesc: "The complete toolkit for data visualization."
    },

    // --- 🛠️ DEV TOOLS CATEGORY (ID 10-12) ---
    10: {
      title: "CodeFlow IDE",
      subtitle: "A cloud-based IDE for modern development teams.",
      heroDesc: "Code, collaborate, and deploy in one environment.",
      heroImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=80",
      overview: [
        "CodeFlow IDE is a cloud-based integrated development environment that supports collaborative coding, debugging, and version control.",
        "It enables developers to work together in real time from anywhere, removing the need for complex local environment setups."
      ],
      overviewImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
      features: [
        { icon: <Code2 size={32} color="#f59e0b"/>, text: "Cloud-based code editor" },
        { icon: <Users size={32} color="#f59e0b"/>, text: "Real-time team collaboration" },
        { icon: <Bug size={32} color="#f59e0b"/>, text: "Built-in debugging tools" },
        { icon: <GitBranch size={32} color="#f59e0b"/>, text: "Git version control integration" }
      ],
      howItWorks: [
        "Create or open a project in the browser",
        "Write and edit code with smart syntax highlighting",
        "Invite team members to collaborate in real-time",
        "Debug, commit, and deploy changes instantly"
      ],
      useCases: ["Remote development teams collaborating on code", "Quick prototyping without local setup", "Pair programming and code reviews"],
      price: "RM 20 / month",
      priceDesc: "Full cloud IDE access with unlimited projects."
    },
    11: {
      title: "DevTrack Manager",
      subtitle: "Project management built for developers.",
      heroDesc: "Track tasks, bugs, and releases efficiently.",
      heroImage: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
      overview: [
        "DevTrack Manager is a project and task management tool designed specifically for software development teams.",
        "It helps teams track progress, manage bugs, and plan release cycles effectively using agile methodologies."
      ],
      overviewImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
      features: [
        { icon: <ListTodo size={32} color="#f59e0b"/>, text: "Task and bug tracking" },
        { icon: <CalendarRange size={32} color="#f59e0b"/>, text: "Sprint and release planning" },
        { icon: <Users size={32} color="#f59e0b"/>, text: "Team collaboration tools" },
        { icon: <BarChart3 size={32} color="#f59e0b"/>, text: "Progress and performance reports" }
      ],
      howItWorks: [
        "Create projects and define user stories",
        "Assign tasks to team members via Kanban board",
        "Track progress through development stages",
        "Generate sprint reports and release notes"
      ],
      useCases: ["Agile software development teams", "Bug tracking and issue resolution", "Managing product roadmaps and releases"],
      price: "RM 18 / month",
      priceDesc: "Complete project management for your dev team."
    },
    12: {
      title: "APIBuilder Pro",
      subtitle: "Accelerate integration and development workflows.",
      heroDesc: "Design, test, and manage APIs with confidence.",
      heroImage: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&w=1200&q=80",
      overview: [
        "APIBuilder Pro is a powerful tool for designing, testing, and managing APIs. It provides a visual interface to streamline integration processes.",
        "It ensures API reliability and performance, allowing developers to focus on building features rather than debugging connections."
      ],
      overviewImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      features: [
        { icon: <Network size={32} color="#f59e0b"/>, text: "API design and documentation" },
        { icon: <CheckCircle2 size={32} color="#f59e0b"/>, text: "Request testing and validation" },
        { icon: <History size={32} color="#f59e0b"/>, text: "Version control for APIs" },
        { icon: <Activity size={32} color="#f59e0b"/>, text: "Performance monitoring" }
      ],
      howItWorks: [
        "Define API endpoints and data structures",
        "Test requests and responses in real-time",
        "Monitor API uptime and latency",
        "Manage different API versions securely"
      ],
      useCases: ["Backend developers designing REST/GraphQL APIs", "QA teams testing API integrations", "Ensuring 99.9% API uptime"],
      price: "RM 24 / month",
      priceDesc: "Professional API tools for scaling apps."
    }
  };

  const product = productsData[id];

  if (!product) {
    return <div style={{padding: '100px', textAlign: 'center'}}>Product not found. <Link to="/products">Back to Products</Link></div>;
  }

  // ==========================================
  // HANDLERS
  // ==========================================

  // 👇 这个函数现在叫 handleSubscribe，因为这更符合按钮的意义
  const handleSubscribe = async () => {
    try {
      // 1. Check Login
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        if(window.confirm("Please login first.")) navigate('/login');
        return;
      }

      // 2. Check if user already subscribed to this product
      const { data: existingSubscription, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('product_id', parseInt(id))
        .maybeSingle();

      if (error) {
        console.error('Error checking subscription:', error);
        // Continue to payment if there's an error checking
      }

      // 3. 🔥 Check Duplicates (关键步骤)
      if (existingSubscription) {
          alert(`You are already subscribed to ${product.title}!`);
          return; // ⛔️ 停止，不跳转去付款页面
      }

      // 4. Navigate to Payment
      navigate(`/payment/${id}`);
    } catch (error) {
      console.error('Error in handleSubscribe:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="product-detail-page">

      {/* 1. Hero Section */}
      <section className="pd-hero">
        <div className="pd-hero-content">

          {/* Back Arrow Button */}
          <Link to="/products" className="back-btn">
            <ArrowLeft size={18} strokeWidth={2.5} />
            Back to Products
          </Link>

          <p style={{ fontWeight: '700', color: '#0052cc', marginBottom: '10px', textTransform: 'uppercase' }}>
            Product Details
          </p>
          <h1>{product.title}</h1>
          <p className="pd-hero-sub">{product.subtitle}</p>
          <p style={{ fontSize: '1.25rem', marginBottom: '40px', fontWeight: '500' }}>{product.heroDesc}</p>

          <div className="pd-hero-image-container">
            <img src={product.heroImage} alt={product.title} className="pd-hero-img" />
          </div>

        </div>
      </section>

      {/* 2. Overview */}
      <section className="pd-section">
        <div className="pd-overview">
          <div className="pd-overview-text">
            <h2>Product Overview</h2>
            {product.overview.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>
          <div className="pd-overview-img">
            <img src={product.overviewImage} alt="Overview" />
          </div>
        </div>
      </section>

      {/* 3. Key Features */}
      <section className="pd-section alt-bg">
        <div className="pd-content-wrapper">
          <h2>Key Features</h2>
          <div className="pd-features-grid">
            {product.features.map((feature, index) => (
              <div key={index} className="pd-feature-card">
                <div style={{ marginBottom: '15px' }}>{feature.icon}</div>
                <h3>{feature.text}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. How It Works */}
      <section className="pd-section">
        <h2>How It Works</h2>
        <div className="pd-steps">
          {product.howItWorks.map((step, index) => (
            <div key={index} className="pd-step-item">
              <div className="step-number">{index + 1}</div>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Use Cases */}
      <section className="pd-section alt-bg">
        <div className="pd-content-wrapper">
          <h2>Use Cases</h2>
          <div className="pd-use-cases">
            {product.useCases.map((useCase, index) => (
              <div key={index} className="pd-use-case-badge">
                <CheckCircle2 size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
                {useCase}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Pricing & CTA */}
      <section className="pd-section">
        <div className="pd-pricing-card">
          <h2>Pricing</h2>
          <div className="price-tag">{product.price}</div>
          <p className="price-desc">{product.priceDesc}</p>
          <div>
            {/* 👇 这里绑定 handleSubscribe */}
            <button className="btn-primary" onClick={handleSubscribe}>Get Started</button>

          </div>
        </div>
      </section>

    </div>
  );
};

export default ProductDetail;