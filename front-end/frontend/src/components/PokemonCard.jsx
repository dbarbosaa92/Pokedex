import api from "../services/api"

function PokemonCard({pokemon}) {

    async function handleFavorite() {
        try {
            await api.post('/favorites', {
              pokemonId: pokemon.id,
              pokemonName: pokemon.name  
            })

            alert("Adicionando aos favoritos ⭐")
        } catch (error) {
            alert ('Erro ao favoritar')
        }
    }
    return (
        <div className="pokemon-card">

            <img 
                src={pokemon.sprites.front_default}
                alt={pokemon.name} 
            />

            <h3>{pokemon.name}</h3>

            <button onClick={handleFavorite}>
                ⭐ Favoritar
            </button>
        </div>
    )
}

export default PokemonCard