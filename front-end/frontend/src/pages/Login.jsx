import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    async function handleLogin(e){
        e.preventDefault()

        try{
            const response = await api.post('/auth/login', {
                email,
                password
            })

            localStorage.setItem('token', response.data.token)

            navigate('/dashboard')
        } catch (err) {
            setError('Email ou senha inválidos')
        }
    }

    return(
        <div className='login-container'>
            <form className='login-card' onSubmit={handleLogin}>
                <h2>Login Pokédex</h2>

                {error && <p className='error'>{error}</p>}

                <input 
                    type="email"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required              
                />

                <input 
                    type="password"
                    placeholder='Senha'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required                
                />

                <button type='submit'>Entrar</button>
            </form>
        </div>
    )
}

export default Login