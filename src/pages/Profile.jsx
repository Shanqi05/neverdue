import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    User, LogOut, Trash2, Package,
    Settings, Lock, Save, LayoutDashboard, AlertTriangle
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import './Profile.css';

function Profile() {
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Added to track errors

    // Modal State
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    // Password State
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });

    // Editable name state
    const [editableName, setEditableName] = useState('');
    const [isEditingName, setIsEditingName] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // 1. Check if user is logged in
                const { data: { session } } = await supabase.auth.getSession();
                
                if (!session) {
                    navigate('/login');
                    return;
                }

                // 2. Fetch user profile - use maybeSingle() instead of single()
                const { data: userData, error: userError } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', session.user.id)
                    .maybeSingle();

                if (userError) {
                    console.error("User fetch error:", userError);
                    setError("Database error: " + userError.message);
                    setLoading(false);
                    return;
                }

                // If user doesn't exist in users table, create it
                if (!userData) {
                    const { error: insertError } = await supabase
                        .from('users')
                        .insert([{
                            id: session.user.id,
                            email: session.user.email,
                            name: session.user.user_metadata?.name || session.user.email.split('@')[0],
                            role: 'Member'
                        }]);

                    if (insertError) {
                        console.error("Insert error:", insertError);
                        // Profile might already exist, try to fetch again
                        const { data: retryData } = await supabase
                            .from('users')
                            .select('*')
                            .eq('id', session.user.id)
                            .maybeSingle();
                        
                        if (retryData) {
                            setUser({
                                name: retryData.name,
                                email: retryData.email,
                                subscriptions: [],
                                role: retryData.role
                            });
                            setLoading(false);
                            return;
                        }
                        
                        // Still failed, use session data
                        setUser({
                            name: session.user.email.split('@')[0],
                            email: session.user.email,
                            subscriptions: [],
                            role: 'Member'
                        });
                        setLoading(false);
                        return;
                    }

                    setUser({
                        name: session.user.user_metadata?.name || session.user.email.split('@')[0],
                        email: session.user.email,
                        subscriptions: [],
                        role: 'Member'
                    });
                    setLoading(false);
                    return;
                }

                // 3. Fetch user subscriptions - with error handling
                let subscriptionsList = [];
                try {
                    const { data: subscriptionsData, error: subError } = await supabase
                        .from('subscriptions')
                        .select(`
                            id,
                            product_id,
                            subscribed_at,
                            products (
                                title,
                                price
                            )
                        `)
                        .eq('user_id', session.user.id);
                    
                    if (!subError && subscriptionsData) {
                        subscriptionsList = subscriptionsData.map(s => ({
                            id: s.id,
                            product_id: s.product_id,
                            name: s.products?.title || 'Unknown Product',
                            price: s.products?.price || 'N/A',
                            date: new Date(s.subscribed_at).toLocaleDateString()
                        }));
                    }
                } catch (subErr) {
                    console.error("Subscription fetch error:", subErr);
                    // Continue anyway, just with empty subscriptions
                }

                setUser({
                    name: userData.name,
                    email: userData.email,
                    subscriptions: subscriptionsList,
                    role: userData.role || 'Member'
                });
                setEditableName(userData.name); // Initialize editable name
                setLoading(false);
            } catch (e) {
                console.error("Error loading profile:", e);
                setError("Failed to load profile. Please try logging in again.");
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate, location.state]); // Re-run when location.state changes

    const handleLogout = async () => {
        await supabase.auth.signOut();
        localStorage.removeItem('user');
        navigate('/login');
    };

    // --- Name Update Logic ---
    const handleNameUpdate = async () => {
        if (!editableName.trim()) {
            alert('Name cannot be empty');
            return;
        }

        try {
            const { data: { session } } = await supabase.auth.getSession();
            
            const { error } = await supabase
                .from('users')
                .update({ name: editableName })
                .eq('id', session.user.id);

            if (error) {
                console.error('Error updating name:', error);
                alert('Failed to update name. Please try again.');
                return;
            }

            // Update local state
            setUser({ ...user, name: editableName });
            setIsEditingName(false);
            alert('Name updated successfully!');
        } catch (err) {
            console.error('Error updating name:', err);
            alert('Cannot connect to server. Please try again.');
        }
    };

    // --- Unsubscribe Logic ---
    const requestUnsubscribe = (item) => {
        setItemToDelete(item);
        setShowDeleteModal(true);
    };

    const confirmUnsubscribe = async () => {
        if (itemToDelete) {
            // 1. Optimistic UI Update
            const updatedSubs = user.subscriptions.filter(sub => sub.id !== itemToDelete.id);
            setUser({ ...user, subscriptions: updatedSubs });

            // 2. Delete from Supabase by subscription ID
            try {
                const { error } = await supabase
                    .from('subscriptions')
                    .delete()
                    .eq('id', itemToDelete.id);

                if (error) {
                    console.error("Failed to unsubscribe:", error);
                    // Revert UI update on error
                    setUser({ ...user, subscriptions: [...user.subscriptions] });
                    alert('Failed to unsubscribe. Please try again.');
                }
            } catch (err) {
                console.error("Failed to unsubscribe:", err);
                // Revert UI update on error
                setUser({ ...user, subscriptions: [...user.subscriptions] });
                alert('Cannot connect to server. Please try again.');
            }
        }
        setShowDeleteModal(false);
        setItemToDelete(null);
    };

    // --- Password Change Logic ---
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            alert("Error: New passwords do not match!");
            return;
        }

        if (passwords.new.length < 6) {
            alert("Error: Password must be at least 6 characters!");
            return;
        }

        try {
            // Use Supabase's built-in password update
            const { error } = await supabase.auth.updateUser({
                password: passwords.new
            });

            if (error) {
                alert("Error: " + error.message);
            } else {
                alert("Success! Password updated.");
                setPasswords({ current: '', new: '', confirm: '' });
            }
        } catch (err) {
            console.error("Password update error:", err);
            alert("Failed to update password. Please try again.");
        }
    };

    if (loading) return <div className="profile-page"><div style={{color:'white', marginTop: '100px', textAlign: 'center'}}>Loading...</div></div>;

    // ERROR STATE (Shows instead of blank screen)
    if (error) return (
        <div className="profile-page">
            <div style={{color:'white', marginTop: '100px', textAlign: 'center'}}>
                <h2>⚠️ Error</h2>
                <p>{error}</p>
                <button onClick={() => window.location.reload()} style={{padding: '10px 20px', cursor: 'pointer'}}>Retry</button>
            </div>
        </div>
    );

    if (!user) return null;

    return (
        <div className="profile-page">
            <div className="dashboard-container">

                {/* --- LEFT SIDEBAR --- */}
                <aside className="profile-sidebar">
                    <div className="avatar-section">
                        <div className="avatar-circle">
                            {user.name ? user.name.charAt(0).toUpperCase() : <User />}
                        </div>
                        <h2>{user.name}</h2>
                        <div className="user-badge">{user.role}</div>
                    </div>

                    <div className="sidebar-menu">
                        <button
                            className={`menu-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
                            onClick={() => setActiveTab('dashboard')}
                        >
                            <LayoutDashboard size={18} /> Dashboard
                        </button>
                        <button
                            className={`menu-btn ${activeTab === 'settings' ? 'active' : ''}`}
                            onClick={() => setActiveTab('settings')}
                        >
                            <Settings size={18} /> Manage Profile
                        </button>
                    </div>

                    <div className="spacer"></div>

                    <button onClick={handleLogout} className="logout-btn">
                        <LogOut size={18} /> Sign Out
                    </button>
                </aside>

                {/* --- RIGHT CONTENT --- */}
                <main className="profile-content">

                    {/* DASHBOARD TAB */}
                    {activeTab === 'dashboard' && (
                        <div className="fade-in">
                            <div className="content-header">
                                <h1>My Ecosystem</h1>
                                <p>Manage your active services and products.</p>
                            </div>
                            <h3 className="section-label">Active Subscriptions</h3>
                            {user.subscriptions.length > 0 ? (
                                <div className="subscriptions-grid">
                                    {user.subscriptions.map((sub) => (
                                        <div key={sub.id} className="sub-card">
                                            <div className="sub-info">
                                                <div className="sub-icon-box">{sub.name.charAt(0)}</div>
                                                <div>
                                                    <h4>{sub.name}</h4>
                                                    <p style={{fontSize: '14px', color: '#888', margin: '4px 0'}}>{sub.price}</p>
                                                    <span className="status-dot">Active</span>
                                                </div>
                                            </div>
                                            <button onClick={() => requestUnsubscribe(sub)} className="delete-btn">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-state">
                                    <Package size={48} color="#444" />
                                    <p>No active subscriptions.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* SETTINGS TAB */}
                    {activeTab === 'settings' && (
                        <div className="fade-in">
                            <div className="content-header">
                                <h1>Profile Settings</h1>
                                <p>View personal info and update security.</p>
                            </div>

                            <div className="settings-container">
                                {/* EDITABLE PERSONAL DETAILS */}
                                <div className="settings-card">
                                    <h3><User size={18} /> Personal Details</h3>
                                    <div className="form-grid">
                                        <div className="input-group">
                                            <label>Full Name</label>
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <input
                                                    type="text"
                                                    value={editableName}
                                                    onChange={e => setEditableName(e.target.value)}
                                                    disabled={!isEditingName}
                                                    className={isEditingName ? '' : 'locked-input'}
                                                />
                                                {isEditingName ? (
                                                    <>
                                                        <button 
                                                            type="button"
                                                            onClick={handleNameUpdate}
                                                            style={{ padding: '8px 16px', background: '#667eea', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                                                        >
                                                            Save
                                                        </button>
                                                        <button 
                                                            type="button"
                                                            onClick={() => { setEditableName(user.name); setIsEditingName(false); }}
                                                            style={{ padding: '8px 16px', background: '#555', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button 
                                                        type="button"
                                                        onClick={() => setIsEditingName(true)}
                                                        style={{ padding: '8px 16px', background: '#667eea', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="input-group">
                                            <label>Email Address</label>
                                            <input
                                                type="email"
                                                value={user.email}
                                                readOnly
                                                className="locked-input"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* EDITABLE PASSWORD FORM */}
                                <form className="settings-card" onSubmit={handlePasswordChange}>
                                    <h3><Lock size={18} /> Change Password</h3>
                                    <div className="form-grid">
                                        <div className="input-group">
                                            <label>New Password</label>
                                            <input
                                                type="password"
                                                value={passwords.new}
                                                onChange={e => setPasswords({...passwords, new: e.target.value})}
                                                placeholder="Enter new password (min 6 chars)"
                                                required
                                            />
                                        </div>
                                        <div className="input-group">
                                            <label>Confirm Password</label>
                                            <input
                                                type="password"
                                                value={passwords.confirm}
                                                onChange={e => setPasswords({...passwords, confirm: e.target.value})}
                                                placeholder="Confirm new password"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="save-btn">
                                        <Save size={18} /> Update Password
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </main>

                {/* DELETE MODAL */}
                {showDeleteModal && (
                    <div className="modal-overlay">
                        <div className="modal-box fade-in">
                            <div className="modal-icon"><AlertTriangle size={32} /></div>
                            <h3>Are you sure?</h3>
                            <p>Do you really want to unsubscribe from <strong>{itemToDelete?.name}</strong>?</p>
                            <div className="modal-actions">
                                <button className="btn-cancel-modal" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                                <button className="btn-confirm-modal" onClick={confirmUnsubscribe}>Yes, Remove It</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;