import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import ProductCard from '../components/ProductCard';
import { Sparkles, LayoutGrid } from 'lucide-react';
import './Products.css';

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const productImages = {
    'CloudStack Pro': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    'CloudVault Storage': 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
    'CloudDeploy Manager': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
    'SecureShield Suite': 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=600&q=80',
    'DataLock Encrypt': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    'AccessGuard IAM': 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=600&q=80',
    'InsightAI Analytics': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80',
    'SmartPredict Engine': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    'DataSense Studio': 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80',
    'CodeFlow IDE': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    'DevTrack Manager': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
    'APIBuilder Pro': 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=600&q=80'
  };

  // ==========================================
  //  SCROLL & CATEGORY LOGIC (UPDATED)
  // ==========================================
  useEffect(() => {

    if (location.state) {
        let targetId = null;


        if (location.state.category) {
            setActiveCategory(location.state.category);
            targetId = 'category-section';
        }

        if (location.state.scrollTo === 'recommended') {
            targetId = 'recommended-section';
        }


        if (targetId) {
            setTimeout(() => {
                const element = document.getElementById(targetId);
                if (element) {
                    const yOffset = -100;
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 300);
        }
    } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location]);

  // --- Fetch Data ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from('products').select('*').order('id');
        if (error) { console.error(error); setLoading(false); return; }

        const productsWithImages = data.map(product => ({
          ...product,
          desc: product.description,
          image: productImages[product.title] || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80'
        }));
        setProducts(productsWithImages);
        setLoading(false);
      } catch (error) { console.error(error); setLoading(false); }
    };
    fetchProducts();
  }, []);

  const categories = ['All', 'Cloud', 'Security', 'AI & Data', 'Dev Tools'];
  const filteredProducts = activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory);
  const recommendedProducts = products.filter(p => p.recommended).slice(0, 3);

  const handleTryNow = async (product) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      if(window.confirm("Please login first to subscribe.")) navigate('/login');
      return;
    }
    const { data: existingSub } = await supabase.from('subscriptions').select('*').eq('user_id', session.user.id).eq('product_id', product.id).maybeSingle();
    if (existingSub) { alert(`You are already subscribed to ${product.title}!`); return; }
    navigate(`/payment/${product.id}`);
  };

  if (loading) {
    return <div className="products-page-atlassian"><div style={{ padding: '100px', textAlign: 'center' }}><h2>Loading...</h2></div></div>;
  }

  return (
    <div className="products-page-atlassian">
      <section className="atl-header">
        <div className="atl-header-content">
          <h1>Explore NeverDue Products</h1>
          <p>Software solutions for every team.</p>
        </div>
      </section>

      <section className="atl-section" id="recommended-section">
        <div className="section-label"><Sparkles size={18} /> Recommended</div>
        <h3>Top picks for your business</h3>
        <div className="atl-grid-recommended">
          {recommendedProducts.map(p => (
            <div key={p.id} className="atl-card-rec">
              <div className="atl-card-icon"><LayoutGrid color="#2563eb" /></div>
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
              <div className="atl-card-actions">
                <button className="btn-outline" onClick={() => handleTryNow(p)}>Try now</button>
                <span className="link-arrow" style={{ cursor: 'pointer' }} onClick={() => navigate(`/products/${p.id}`)}>Learn more →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/*  Added ID for scrolling */}
      <section className="atl-section gray-bg" id="category-section">
        <h3 style={{ textAlign: 'center', marginBottom: '30px' }}>Explore by category</h3>
        <div className="atl-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} id={p.id} title={p.title} description={p.desc} price={p.price} image={p.image} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Products;