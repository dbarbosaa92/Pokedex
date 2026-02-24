import {useEffect, useState } from 'react'
import api from '../services/api'
import Navbar from '../components/Navbar'
import PokemonCard from '../components/PokemonCard'
import axios from 'axios'

function Dashboard(){
    const [user, setUser] = useState(null)

    useEffect(() => {

        async function loadProfile() {
            try{
            const response = await api.get('/user/profile')
            setUser(response.data)
        } catch (error) {
            console.error('Erro ao buscar perfil', error)
        }
    }
    loadProfile()
    }, [])
    
    const [pokemons, setPokemons] = useState([])

    useEffect(() => {

        async function loadPokemons(){
            const response = await axios.get(
                "https://pokeapi.co/api/v2/pokemon?limit=151"
            )

            const results = response.data.results

            const pokemonData = await Promise.all(
                results.map(async (pokemon) => {
                    const res = await axios.get(pokemon.url)
                    return res.data
                })
            )

            setPokemons(pokemonData)
        }
        loadPokemons()
    }, [])


    return (
        <div>

            <Navbar /> 

            {/* <h1>Dashboard</h1>
            {user ? (
                <p>ID do usuário: {user.id}</p>
            ) : (
                <p>Carregando...</p>
            )} */}

            <div className='dashboard'>
                <h1>Bem-vindo à Pokédex 🎮</h1>

                <div className='pokemon-grid'>
                    {pokemons.map(pokemon => (
                        <PokemonCard
                            key={pokemon.id}
                            pokemon={pokemon}
                            />
                    ))}
                </div>
            </div>

            
        </div>
    )
}

export default Dashboard