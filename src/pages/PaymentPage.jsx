import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import {
  CreditCard, Smartphone, Building2, Lock, ShieldCheck,
  Check, ArrowLeft, Loader2
} from 'lucide-react';
import './PaymentPage.css';

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [product, setProduct] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiration: '',
    cvc: ''
  });

  // Fetch product from database
  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching product:', error);
        return;
      }

      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    // Check login status immediately
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        alert("Please login first.");
        navigate('/login');
      }
    };
    checkAuth();
  }, [navigate]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Check if all fields are filled
  const isFormValid = () => {
    // For TNG and online banking, no form required
    if (paymentMethod === 'tng' || paymentMethod === 'online banking') {
      return true;
    }
    // For card payment, all fields must be filled
    return formData.cardholderName.trim() !== '' &&
           formData.cardNumber.trim() !== '' &&
           formData.expiration.trim() !== '' &&
           formData.cvc.trim() !== '';
  };

  const handleConfirmPayment = async () => {
    setIsProcessing(true);

    try {
      // 1. Get current session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        alert("Please login first.");
        navigate('/login');
        return;
      }

      // 2. Ensure user exists in users table
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('id', session.user.id)
        .maybeSingle();

      if (!existingUser) {
        // Create user record if doesn't exist
        await supabase
          .from('users')
          .insert([{
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.name || session.user.email.split('@')[0],
            role: 'Member'
          }]);
      }

      // 3. Create subscription in database
      const { data, error } = await supabase
        .from('subscriptions')
        .insert([{
          user_id: session.user.id,
          product_id: product.id
        }])
        .select();

      if (error) {
        console.error('Subscription error:', error);
        alert(`Payment failed: ${error.message}`);
        setIsProcessing(false);
        return;
      }

      console.log('Subscription created:', data);

      // 4. Show Success View
      setIsProcessing(false);
      setIsSuccess(true);

      // 5. Redirect to profile after 2.5 seconds
      setTimeout(() => {
        navigate('/profile', { state: { reload: true } });
      }, 2500);

    } catch (error) {
      console.error('Payment error:', error);
      alert('Cannot connect to server. Please try again.');
      setIsProcessing(false);
    }
  };

  if (!product) return <div style={{padding:50, textAlign:'center'}}>Loading...</div>;

  // --- RENDER SUCCESS VIEW ---
  if (isSuccess) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f8fafc'
      }}>
        <div style={{
          background: 'white',
          padding: '50px',
          borderRadius: '16px',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            width: 80, height: 80, background: '#dcfce7', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px'
          }}>
            <Check size={40} color="#00875a" strokeWidth={3} />
          </div>
          <h2 style={{color: '#0f172a', marginBottom: 10}}>Payment Successful!</h2>
          <p style={{color: '#64748b'}}>You are now subscribed to <strong>{product.title}</strong>.</p>
          <p style={{marginTop: 20, fontSize: '0.9rem', color: '#94a3b8'}}>Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  // --- RENDER PAYMENT FORM VIEW ---
    return (
        // 2. USE CSS CLASS FOR WRAPPER (Removed inline styles)
        <div className="payment-page-wrapper">

            <div style={{maxWidth: 1000, margin: '0 auto 20px'}}>
                <button onClick={() => navigate(-1)} className="back-button">
                    <ArrowLeft size={18}/> Cancel & Go Back
                </button>
            </div>

            {/* 3. CONTAINER: Removed "flexDirection: row" so CSS can control it */}
            <div className="payment-page-container">

                {/* 4. LEFT SECTION: Added className "payment-form-section" */}
                <div className="payment-form-section">
                    <h2>Checkout</h2>
                    <p style={{marginBottom: 10, fontWeight: 600, color: '#334155'}}>Payment Method</p>

                    <div className="payment-methods">
                        {['card', 'tng', 'online banking'].map(method => (
                            <div key={method}
                                 onClick={() => setPaymentMethod(method)}
                                 className={`payment-method-option ${paymentMethod === method ? 'active' : ''}`}
                            >
                                {method === 'card' && <CreditCard />}
                                {method === 'tng' && <Smartphone />}
                                {method === 'online banking' && <Building2 />}
                                <span style={{textTransform: 'capitalize', fontSize: '0.9rem', fontWeight: 500, marginTop: '8px'}}>{method}</span>
                            </div>
                        ))}
                    </div>

                    {paymentMethod === 'card' ? (
                        <div className="card-form">
                            <div className="form-group">
                                <label>Cardholder Name</label>
                                <input type="text" name="cardholderName" value={formData.cardholderName} onChange={handleInputChange} placeholder="John Doe" />
                            </div>
                            <div className="form-group">
                                <label>Card Number</label>
                                <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="0000 0000 0000 0000" />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Expiration</label>
                                    <input type="text" name="expiration" value={formData.expiration} onChange={handleInputChange} placeholder="MM / YY" />
                                </div>
                                <div className="form-group">
                                    <label>CVC</label>
                                    <input type="text" name="cvc" value={formData.cvc} onChange={handleInputChange} placeholder="123" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div style={{padding: '40px 20px', textAlign: 'center', color: '#64748b', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0'}}>
                            {paymentMethod === 'tng' ? <Smartphone size={48} style={{margin: '0 auto 15px', color: '#0052cc'}} /> : <Building2 size={48} style={{margin: '0 auto 15px', color: '#0052cc'}} />}
                            <p style={{fontSize: '1rem', fontWeight: 500, marginBottom: 8}}>{paymentMethod === 'tng' ? "Touch 'n Go eWallet" : "Online Banking"}</p>
                            <p style={{fontSize: '0.9rem'}}>Redirecting to secure gateway...</p>
                        </div>
                    )}
                </div>

                {/* 5. RIGHT SECTION: Added className "order-summary-section" */}
                <div className="order-summary-section">
                    <div>
                        <h3>Order Summary</h3>
                        <div className="summary-row"><span>Product</span><span style={{fontWeight: 600, color:'#0f172a'}}>{product.title}</span></div>
                        <div className="summary-row"><span>Billing Cycle</span><span>Monthly</span></div>
                        <div className="summary-row"><span>Price</span><span>{product.price}</span></div>

                        <div className="summary-divider">
                            <span style={{fontSize: '1.1rem'}}>Total Due</span>
                            <span className="summary-total-amount">{product.price}</span>
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={handleConfirmPayment}
                            disabled={isProcessing || !isFormValid()}
                            className="payment-button"
                        >
                            {isProcessing ? <><Loader2 className="spin" style={{marginRight:8}}/> Processing...</> : `Pay ${product.price}`}
                        </button>
                        {!isFormValid() && <p style={{marginTop: 10, fontSize: '0.85rem', color: '#ef4444', textAlign: 'center'}}>Please fill in all payment information</p>}

                        <div style={{marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: '#64748b', fontSize: '0.85rem'}}>
                            <ShieldCheck size={16} color="#00875a"/> Secure SSL Encrypted Payment
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PaymentPage;