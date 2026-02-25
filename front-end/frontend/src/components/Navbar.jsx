import { useNavigate } from 'react-router-dom'

function Navbar() {
    
    const navigate = useNavigate()
    
    function handleLogout(){
        localStorage.removeItem('token')
        navigate('/')
    }
    
    return (
        <nav className='navbar'>

            <a href="/dashboard"><h2>Pokédex</h2></a>
            

            <button onClick={() => navigate('/favorites')}>
                Favoritos
            </button>

            <button onClick={handleLogout}>
                Logout
            </button>

        </nav>
    )
}

export default Navbar