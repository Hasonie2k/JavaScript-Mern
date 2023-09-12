import { useState } from 'react';
import axios from 'axios';

const PokemonList = () => { // Removed props from the list 

    const [pokemonList, setPokemonList] = useState([]);

    const buttonClickHandler = () => { // No need to pass "e" since im not using it 
        axios.get("https://pokeapi.co/api/v2/pokemon")
            .then(res => {
                console.log(res.data);
                setPokemonList(res.data.results);
            });
    }

    return (
        <div>
            <button onClick={buttonClickHandler}>Fetch Pokemon!</button>
            <ul>
                {
                    pokemonList.map(pokemon => {
                        return (
                            <li key={pokemon.url}>
                                {pokemon.name}
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default PokemonList;
