import {useState, useEffect} from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

function PokemonCard({pokemon}) {
    const [isFavorite, setIsFavorite] = useState(false)
    const [favoriteId, setFavoriteId] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        checkFavorite()
    }, [])

    async function checkFavorite(){
        try{
            const response = await api.get('/favorites')

            const fav = response.data.find(
                f => f.pokemonId === pokemon.id
            )

            if(fav){
                setIsFavorite(true)
                setFavoriteId(fav.id)
            }
        } catch(err) {
            console.error(err)
        }
    }

    async function handleFavorite(){
        try{
            if(isFavorite){
                await api.delete(`/favorites/${favoriteId}`)

                setIsFavorite(false)
                setFavoriteId(null)
            } else {
                const response = await api.post('/favorites', {
                    pokemonId: pokemon.id,
                    pokemonName: pokemon.name
                })

                setIsFavorite(true)
                setFavoriteId(response.data.id)
            }
        } catch(err) {
            console.error(err)
        }
    }

     const imageUrl =
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`


    return(
        <div 
        className="pokedex-card"
        onClick={() => navigate(`/pokemon/${pokemon.id}`)}        
        >

            <div className="card-header">

                <span className="pokemon-number">
                    #{pokemon.id.toString().padStart(3,"0")}
                </span>

                <button
                    className="favorite-btn"
                    onClick={(e) => {
                        e.stopPropagation()
                        handleFavorite()
                    }}
                >
                    {isFavorite ? "❤️" : "🤍"}
                </button>

            </div>


            <img
                src={imageUrl}
                className="pokemon-image"
            />


            <h3 className="pokemon-name">
                {pokemon.name}
            </h3>


            <div className="types">

                {pokemon.types.map(t => (
                    <span
                        key={t.type.name}
                        className={`type-pill type-${t.type.name}`}
                    >
                        {t.type.name}
                    </span>
                ))}

            </div>

        </div>
    )
}

export default PokemonCard