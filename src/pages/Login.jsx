import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Eye, EyeOff } from 'lucide-react';
import './Login.css';

function Login() {
    const [isLogin, setIsLogin] = useState(true); // Default to login page
    const navigate = useNavigate();
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. REGISTER
        if (!isLogin) {
            if (!agreedToTerms) {
                alert('Please agree to the Terms and Conditions and Privacy Policy to continue.');
                return;
            }
            
            try {
                // Create auth user in Supabase (auto-confirm enabled in Supabase dashboard)
                const { data: authData, error: authError } = await supabase.auth.signUp({
                    email: formData.email,
                    password: formData.password,
                    options: {
                        data: { name: formData.name }
                    }
                });

                if (authError) {
                    alert("Error: " + authError.message);
                    return;
                }

                if (!authData.user) {
                    alert("Registration failed. Please try again.");
                    return;
                }

                // Create user profile in users table
                const { error: profileError } = await supabase
                    .from('users')
                    .insert([{
                        id: authData.user.id,
                        email: formData.email,
                        name: formData.name,
                        role: 'Member'
                    }]);

                if (profileError && !profileError.message.includes('duplicate')) {
                    console.error('Profile creation error:', profileError);
                }

                alert("Account created successfully! You can now login.");
                setIsLogin(true);
            } catch (err) {
                console.error(err);
                alert("Registration failed. Please try again.");
            }
        }

        // 2. LOGIN
        else {
            try {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password
                });

                if (error) {
                    alert("Login Failed: " + error.message);
                    return;
                }

                // Fetch user profile
                const { data: userData } = await supabase
                    .from('users')
                    .select('*')
                    .eq('email', formData.email)
                    .maybeSingle();

                // Store basic info in localStorage (optional, for quick access)
                localStorage.setItem('user', JSON.stringify(userData || { email: formData.email }));
                navigate('/profile');
            } catch (err) {
                console.error(err);
                alert("Login failed. Please try again.");
            }
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card fade-in">
                <h2 className="auth-title">
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="auth-subtitle">
                    {isLogin ? 'Enter your details to sign in' : 'Start your journey with NeverDue'}
                </p>

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Full Name"
                                required
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                    )}
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            required
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    <div className="input-group" style={{ position: 'relative' }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            required
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
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
                    
                    {!isLogin && (
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
                    )}
                    
                    <button type="submit" className="auth-btn">
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>

                <div className="auth-switch-text">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <span className="auth-link" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? " Register Now" : " Login Here"}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Login;