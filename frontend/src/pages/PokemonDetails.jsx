import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import '../styles/global.css'

function PokemonDetails(){
    const {id} = useParams()
    const [pokemon, setPokemon] = useState(null)

    useEffect(() => {
        async function loadPokemon(){
            try{
                const response = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon/${id}`
                )
                setPokemon(response.data)
            } catch(err){
                console.error(err)
            }
        }
        loadPokemon()
    }, [id])

    if(!pokemon){
       return <p style={{textAlign:"center", marginTop:"100px"}}>Carregando...</p>
    }

    return(
        <div>

            <Navbar />

            <div className="details-container">
                <img
                        src={pokemon.sprites.other["official-artwork"].front_default}
                        alt={pokemon.name}
                        className="details-image"
                    />

                <h1>
                    #{pokemon.id} {pokemon.name.toUpperCase()}
                </h1>

                <div className="details-types">
  {pokemon.types.map((type) => (
    <span
      key={type.type.name}
      className={`type-pill type-${type.type.name}`}
    >
      {type.type.name}
    </span>
  ))}
</div>

                <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
                <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>

                <h2>Habilidades</h2>
                <ul>
                    {pokemon.abilities.map(ability => (
                        <li key={ability.ability.name}>
                            {ability.ability.name}
                        </li>
                    ))}
                </ul>

                <h2>Stats</h2>
                <div className="stats">
                    {pokemon.stats.map(stat => (
                        <div key={stat.stat.name} className="stat-row">
                            <span>{stat.stat.name}</span>
                            <div className="stat-bar">
                                <div
                                    className="stat-fill"
                                    style={{ width: `${stat.base_stat}%` }}
                                ></div>
                            </div>
                            <span>{stat.base_stat}</span>
                        </div>
                    ))}

                </div>

            </div>

        </div>
    )
}

export default PokemonDetails