import { useNavigate } from 'react-router-dom'

function Navbar() {
    
    const navigate = useNavigate()
    
    function handleLogout(){
        localStorage.removeItem('token')
        navigate('/')
    }
    
    return (
        <nav className='navbar'>

            <h2>Pokédex</h2>

            <button onClick={handleLogout}>
                Logout
            </button>

        </nav>
    )
}

export default Navbar