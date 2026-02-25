import { useEffect, useState } from "react";
import api from '../services/api'
import Navbar from "../components/Navbar";

function Favorites() {

    const [favorites, setFavorites] = useState([])

    useEffect(() => {

        async function loadFavorites() {
            const response = await api.get('/favorites')
            setFavorites(response.data)
        }

        loadFavorites()

    }, [])

    async function handleRemove(id) {
        try{
            await api.delete(`/favorites/${id}`)

            //remove do estado sem precisar recarregar tudo
            setFavorites(favorites.filter(fav => fav.id !== id))
        } catch (err) {

            console.error(err)

            alert('Erro ao remover favorito')
        }
    }

    return(
        <div>

            <Navbar />

            <h1>Meus Favoritos</h1>

            <div className="pokemon-grid">

                {favorites.map(fav => (

                    <div key={fav.id} className="pokemon-card">

                        <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${fav.pokemonId}.png`}
                            alt={fav.pokemonName}
                        />

                        <h3>{fav.pokemonName}</h3>

                        <button onClick={() => handleRemove(fav.id)}>Remover</button>

                    </div>

                ))}

            </div>

        </div>

    )
}

export default Favorites