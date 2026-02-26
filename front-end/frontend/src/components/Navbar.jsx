import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    
    const navigate = useNavigate()
    
    function handleLogout(){
        localStorage.removeItem('token')
        navigate('/')
    }
    
    return (
        <nav className='navbar'>

            <div className='navbar-left'>
                <Link to="/dashboard" className="logo-link">
                    <h2 className='logo'>Pokédex</h2>
                </Link>
            </div>           

            <div className="navbar-right">

                <button
                    onClick={() => navigate('/favorites')}
                    className="nav-btn"
                >
                    Favoritos
                </button>

                <button
                    onClick={handleLogout}
                    className="nav-btn"
                >
                    Logout
                </button>

            </div>
                    
        </nav>
    )
}

export default Navbar