import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import {
  CreditCard, Smartphone, Building2, Lock, ShieldCheck,
  Check, ArrowLeft, Loader2
} from 'lucide-react';
import './ProductDetail.css'; // We can reuse some styles or write inline

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
    <div style={{minHeight: '100vh', background: '#f8fafc', padding: '40px 20px'}}>

      {/* Header */}
      <div style={{maxWidth: 1000, margin: '0 auto 20px'}}>
        <button onClick={() => navigate(-1)} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 5, color: '#64748b'
        }}>
          <ArrowLeft size={18}/> Cancel & Go Back
        </button>
      </div>

      <div className="payment-page-container" style={{
        maxWidth: 1000, margin: '0 auto', background: 'white',
        borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        display: 'flex', flexDirection: 'row', minHeight: 600, marginTop: 50
      }}>

        {/* LEFT: FORM */}
        <div style={{flex: 1.5, padding: 40, borderRight: '1px solid #f1f5f9'}}>
          <h2 style={{marginBottom: 30, color: '#0f172a'}}>Checkout</h2>

          <p style={{marginBottom: 10, fontWeight: 600, color: '#334155'}}>Payment Method</p>
          <div style={{display: 'flex', gap: 15, marginBottom: 30}}>
             {['card', 'tng', 'online banking'].map(method => (
               <div key={method}
                 onClick={() => setPaymentMethod(method)}
                 style={{
                   flex: 1, padding: 15, border: `2px solid ${paymentMethod === method ? '#0052cc' : '#e2e8f0'}`,
                   borderRadius: 8, cursor: 'pointer', background: paymentMethod === method ? '#eff6ff' : 'white',
                   display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: paymentMethod === method ? '#0052cc' : '#64748b'
                 }}
               >
                 {method === 'card' && <CreditCard />}
                 {method === 'tng' && <Smartphone />}
                 {method === 'online banking' && <Building2 />}
                 <span style={{textTransform: 'capitalize', fontSize: '0.9rem', fontWeight: 500}}>{method}</span>
               </div>
             ))}
          </div>

          {/* Payment Form - Only show for card payment */}
          {paymentMethod === 'card' ? (
            <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
              <div>
                <label style={{display:'block', marginBottom: 8, fontSize:'0.9rem', fontWeight:600, color:'#475569'}}>Cardholder Name</label>
                <input 
                  type="text" 
                  name="cardholderName"
                  value={formData.cardholderName}
                  onChange={handleInputChange}
                  placeholder="John Doe" 
                  style={{width:'100%', padding: 12, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '1rem'}} 
                />
              </div>
              <div>
                <label style={{display:'block', marginBottom: 8, fontSize:'0.9rem', fontWeight:600, color:'#475569'}}>Card Number</label>
                <input 
                  type="text" 
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="0000 0000 0000 0000" 
                  style={{width:'100%', padding: 12, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '1rem'}} 
                />
              </div>
              <div style={{display: 'flex', gap: 20}}>
                <div style={{flex: 1}}>
                  <label style={{display:'block', marginBottom: 8, fontSize:'0.9rem', fontWeight:600, color:'#475569'}}>Expiration</label>
                  <input 
                    type="text" 
                    name="expiration"
                    value={formData.expiration}
                    onChange={handleInputChange}
                    placeholder="MM / YY" 
                    style={{width:'100%', padding: 12, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '1rem'}} 
                  />
                </div>
                <div style={{flex: 1}}>
                  <label style={{display:'block', marginBottom: 8, fontSize:'0.9rem', fontWeight:600, color:'#475569'}}>CVC</label>
                  <input 
                    type="text" 
                    name="cvc"
                    value={formData.cvc}
                    onChange={handleInputChange}
                    placeholder="123" 
                    style={{width:'100%', padding: 12, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '1rem'}} 
                  />
                </div>
              </div>
            </div>
          ) : (
            <div style={{padding: '40px 20px', textAlign: 'center', color: '#64748b', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0'}}>
              {paymentMethod === 'tng' && (
                <div>
                  <Smartphone size={48} style={{margin: '0 auto 15px', color: '#0052cc'}} />
                  <p style={{fontSize: '1rem', fontWeight: 500, marginBottom: 8}}>Touch 'n Go eWallet</p>
                  <p style={{fontSize: '0.9rem'}}>You will be redirected to complete payment</p>
                </div>
              )}
              {paymentMethod === 'online banking' && (
                <div>
                  <Building2 size={48} style={{margin: '0 auto 15px', color: '#0052cc'}} />
                  <p style={{fontSize: '1rem', fontWeight: 500, marginBottom: 8}}>Online Banking</p>
                  <p style={{fontSize: '0.9rem'}}>You will be redirected to your bank's secure payment gateway</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT: SUMMARY */}
        <div style={{flex: 1, padding: 40, background: '#f8fafc', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <div>
            <h3 style={{marginBottom: 20, color: '#334155'}}>Order Summary</h3>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom: 15, color:'#475569'}}>
              <span>Product</span>
              <span style={{fontWeight: 600, color:'#0f172a'}}>{product.title}</span>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom: 15, color:'#475569'}}>
              <span>Billing Cycle</span>
              <span>Monthly</span>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom: 15, color:'#475569'}}>
              <span>Price</span>
              <span>{product.price}</span>
            </div>

            <div style={{borderTop: '2px dashed #cbd5e1', marginTop: 20, paddingTop: 20, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <span style={{fontSize: '1.1rem', fontWeight: 700}}>Total Due</span>
              <span style={{fontSize: '1.5rem', fontWeight: 800, color: '#0052cc'}}>{product.price}</span>
            </div>
          </div>

          <div>
            <button
              onClick={handleConfirmPayment}
              disabled={isProcessing || !isFormValid()}
              style={{
                width: '100%', padding: 16, borderRadius: 8, border: 'none',
                background: (isProcessing || !isFormValid()) ? '#94a3b8' : '#0052cc', color: 'white',
                fontSize: '1.1rem', fontWeight: 600, cursor: (isProcessing || !isFormValid()) ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                transition: 'background 0.2s',
                opacity: !isFormValid() ? 0.6 : 1
              }}
            >
              {isProcessing ? <><Loader2 className="spin"/> Processing...</> : `Pay ${product.price}`}
            </button>
            {!isFormValid() && (
              <p style={{marginTop: 10, fontSize: '0.85rem', color: '#ef4444', textAlign: 'center'}}>
                Please fill in all payment information
              </p>
            )}
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