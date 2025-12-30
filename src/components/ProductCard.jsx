import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import '../pages/Products.css';

const ProductCard = ({ id, title, description, price, image }) => {
    const navigate = useNavigate();

    // --- HANDLER: Check Subscription & Redirect ---
    const handleSubscribe = async () => {
        try {
            // 1. Check if User is Logged In
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                const confirmLogin = window.confirm("You must be logged in to subscribe.\nGo to login page?");
                if (confirmLogin) {
                    navigate('/login');
                }
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

            // 3. CHECK IF ALREADY SUBSCRIBED
            if (existingSubscription) {
                alert(`You are already subscribed to ${title}!`);
                return; //  STOP HERE. Do not redirect to payment.
            }

            // 4. If not subscribed, Navigate to Payment Page
            navigate(`/payment/${id}`);
        } catch (error) {
            console.error('Error in handleSubscribe:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="product-card">
            <div className="card-image">
                <img src={image || 'https://via.placeholder.com/300'} alt={title} />
            </div>
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <p className="card-desc">{description}</p>
                <div className="card-footer">
                    {price && <span className="price">{price}</span>}

                    <div style={{display:'flex', gap:'10px'}}>
                        <Link to={`/products/${id}`} className="buy-btn" style={{textDecoration: 'none', textAlign: 'center'}}>
                            Details
                        </Link>

                        <button
                            onClick={handleSubscribe}
                            style={{
                                background: '#2563eb',
                                color:'white',
                                border:'none',
                                padding:'5px 12px',
                                borderRadius:'4px',
                                cursor:'pointer',
                                fontWeight: '600'
                            }}
                        >
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;