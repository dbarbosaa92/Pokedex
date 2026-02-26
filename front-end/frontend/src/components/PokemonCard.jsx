import { useState, useEffect } from "react"
import api from "../services/api"
import typeColors from "../utils/typeColors"


function PokemonCard({ pokemon, favorites, setFavorites }) {

     console.log(pokemon)

    const [isFavorite, setIsFavorite] = useState(false)
    const [favoriteId, setFavoriteId] = useState(null)

    useEffect(() => {
        const fav = favorites.find(
            f => f.pokemonId === pokemon.id
        )

        if(fav){
            setIsFavorite(true)
            setFavoriteId(fav.id)
        }
    }, [favorites, pokemon.id])

    async function handleFavorite(){

        try{

            if(isFavorite){

                await api.delete(`/favorites/${favoriteId}`)

                setFavorites(prev => 
                    prev.filter(f => f.id !== favoriteId)
                )

                setIsFavorite(false)
                setFavoriteId(null)

            }else{

                const response = await api.post("/favorites", {
                    pokemonId: pokemon.id,
                    pokemonName: pokemon.name
                })

                setFavorites(prev => [...prev, response.data])

                setIsFavorite(true)
                setFavoriteId(response.data.id)

            }

        }catch(err){
            console.error(err)
        }

    }

    const imageUrl =
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`

    const mainType = pokemon.types[0].type.name 
    const color = typeColors[mainType] || '#777'

   

    return (

        <div className="pokemon-card" style={{backgroundColor: color}}  >

            <img
                src={imageUrl}
                alt={pokemon.name}
            />

            <h3>
                #{pokemon.id} - {pokemon.name}
            </h3>

            <div className="pokemon-types">
                {pokemon.types.map(t => (
                    <span
                        key={t.type.name}
                        className={`type-pill type-${t.type.name}`}
                    >
                        {t.type.name}
                    </span>
                ))}
            </div>

            {/* <p>{pokemon.types.map(t => t.type.name).join('/')}</p> */}

            <button onClick={handleFavorite}>
                {isFavorite ? "❤ Favoritado" : "⭐ Favoritar"}
            </button>

        </div>

    )

}

export default PokemonCard