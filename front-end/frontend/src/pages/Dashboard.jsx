import {useEffect, useState } from 'react'
import api from '../services/api'
import Navbar from '../components/Navbar'
import PokemonCard from '../components/PokemonCard'
import axios from 'axios'
import ScrollToTopButton from '../components/ScrollToTopButton'

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
    const [search, setSearch] = useState('')
    const [favorites, setFavorites] = useState([])

    const [offset, setOffset] = useState(0)
    const [loading, setLoading] = useState(false)

    const limit = 20

    const filteredPokemons = pokemons.filter(pokemon => 
        pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
        pokemon.id.toString().includes(search)
    )

    async function loadPokemons(){
        if(loading) return

        setLoading(true)

        try{

            const response = await axios.get(
                `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
            )

            const results = response.data.results

            const pokemonData = await Promise.all(
                results.map(async (pokemon) => {
                    const res = await axios.get(pokemon.url)
                    return res.data
                })
            )

            setPokemons(prev => [...prev, ...pokemonData])

            setOffset(prev => prev + limit)
        } catch(err) {
            console.error(err)
        }

        setLoading(false)
    }

    useEffect(() => {
        loadPokemons()
    }, [])

    useEffect(() => {
        function handleScroll(){
            const scrollTop = window.scrollY
            const windowHeight = window.innerHeight
            const fullHeight = document.documentElement.scrollHeight 

            if(scrollTop + windowHeight >= fullHeight - 200){
                loadPokemons()
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [offset, loading]) 

    useEffect(() => {
        async function loadFavorites(){
            try{
                const response = await api.get('/favorites')
                setFavorites(response.data)
            } catch(err){
                console.error(err)
            }
        }

        loadFavorites()
    }, [])


    return (
        <div>

            <Navbar />

            <div className='dashboard'>
                <h1>Bem-vindo à Pokédex ◓⃙</h1>

                <div className="search-bar">

                    <div className="search-icon">
                        🔎
                    </div>

                    <input
                        type="text"
                        placeholder="Buscar Pokémon por nome ou número..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {search && (
                        <button
                            className="clear-btn"
                            onClick={() => setSearch('')}
                        >
                            ✕
                        </button>
                    )}

                </div>

                <div className='pokemon-grid'>
                    {filteredPokemons.map(pokemon => (
                        <PokemonCard
                            key={pokemon.id}
                            pokemon={pokemon}
                            favorites={favorites}
                            setFavorites={setFavorites}
                            />
                    ))}
                </div>

                {loading && (
                    <p style={{textAlign:"center", margin:"20px"}}>
                        Carregando mais Pokémon...
                    </p>
                )}

            </div>
            <ScrollToTopButton />
            
        </div>
    )
}

export default Dashboard