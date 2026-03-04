import { useEffect, useState } from "react"
import api from "../services/api"
import Navbar from "../components/Navbar"
import typeColors from "../utils/typeColors"

function Favorites(){

    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        loadFavorites()
    }, [])

    async function loadFavorites(){
        try{
            const response = await api.get("/favorites")
            setFavorites(response.data)
        }catch(err){
            console.error(err)
        }
    }

    async function removeFavorite(id){

        try{

            await api.delete(`/favorites/${id}`)

            setFavorites(prev =>
                prev.filter(f => f.id !== id)
            )

        }catch(err){
            console.error(err)
        }

    }

    return(
        <div>

            <Navbar />

            <div className="dashboard">

                <h1>❤️ Meus Favoritos</h1>

                <div className="pokemon-grid">

                    {favorites.map(fav => {

                        const color =
                            typeColors[fav.pokemonType] || "#777"

                        const imageUrl =
                            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${fav.pokemonId}.png`

                        return(

                            <div key={fav.id} className="pokedex-card">

                                <div className="card-header">
                                    <span className="pokemon-number">
                                        #{fav.pokemonId}
                                    </span>

                                    <button
                                        className="favorite-btn"
                                        onClick={() => removeFavorite(fav.id)}
                                    >
                                        💔
                                    </button>
                                </div>

                                <img
                                    src={imageUrl}
                                    alt={fav.pokemonName}
                                    className="pokemon-image"
                                />

                                <h3 className="pokemon-name">
                                    {fav.pokemonName}
                                </h3>

                            </div>

                        )

                    })}

                </div>

            </div>

        </div>
    )
}

export default Favorites