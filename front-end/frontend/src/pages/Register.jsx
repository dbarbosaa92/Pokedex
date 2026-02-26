import  {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

function Register(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [ password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const navigate = useNavigate()

    async function handleRegister(e){
        e.preventDefault()

        try{
            await api.post('/auth/register', {
                name,
                email,
                password
            })

            setSuccess('Usuário criado com sucesso! 🎉')

            setTimeout(() => {
                navigate('/')
            }, 1500)
        }catch(err){
            if(err.response){
                setError(err.response.data.error)
            } else {
                setError('Erro ao conectar com o servidor')
            }
        }
    }

    return (
        <div className='login-container'>

            <form className='login-card' onSubmit={handleRegister}>

                <h2>Criar conta</h2>

                    {error && <p className='error'>{error}</p>}
                    {success && <p className='success'>{success}</p>}

                    <input 
                        type="text" 
                        placeholder='Nome'
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        required                        
                    />
                    <input 
                        type="email" 
                        placeholder='Email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}   
                        required                 
                    />


            </form>

        </div>
    )
}