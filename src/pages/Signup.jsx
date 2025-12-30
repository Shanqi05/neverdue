import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import './Signup.css';

function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSignup = (e) => {
        e.preventDefault();
        
        if (!agreedToTerms) {
            alert('Please agree to the Terms and Conditions and Privacy Policy to continue.');
            return;
        }
        
        // Save user to browser memory (Simulating a Database)
        localStorage.setItem('user_data', JSON.stringify(formData));
        alert("Account created! Please Login.");
        navigate('/login');
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <input className="signup-input" placeholder="Name" onChange={e => setFormData({...formData, name: e.target.value})} />
                <input className="signup-input" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} />
                <div style={{ position: 'relative' }}>
                    <input className="signup-input" type={showPassword ? "text" : "password"} placeholder="Password" onChange={e => setFormData({...formData, password: e.target.value})} />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: 'absolute',
                            right: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            color: '#6b7280'
                        }}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                
                <div className="terms-checkbox">
                    <input 
                        type="checkbox" 
                        id="terms" 
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                    />
                    <label htmlFor="terms">
                        I agree to the <Link to="/terms" target="_blank">Terms and Conditions</Link> and <Link to="/privacy" target="_blank">Privacy Policy</Link>
                    </label>
                </div>
                
                <button className="signup-btn">Register</button>
            </form>
        </div>
    );
}
export default Signup;