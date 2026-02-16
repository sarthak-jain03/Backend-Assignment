import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const roleClass = user?.role?.toLowerCase() || 'user';

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <Link to="/categories" className="navbar-brand">
                    <span className="navbar-logo">⬡</span>
                    <span className="navbar-title">Dashboard</span>
                </Link>

                <div className="navbar-links">
                    <Link
                        to="/categories"
                        className={`navbar-link ${location.pathname.startsWith('/categories') ? 'active' : ''}`}
                    >
                        Categories
                    </Link>
                    <Link
                        to="/products"
                        className={`navbar-link ${location.pathname.startsWith('/products') ? 'active' : ''}`}
                    >
                        Products
                    </Link>
                </div>

                <div className="navbar-actions">
                    {user && (
                        <>
                            <span className={`badge badge-${roleClass}`}>{user.role}</span>
                            <span className="navbar-username">{user.username}</span>
                            <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
