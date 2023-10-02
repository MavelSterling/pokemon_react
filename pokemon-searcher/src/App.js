import React, { useState } from 'react';
import './App.css';

function App() {
  // Estado para manejar la ID del Pokemon ingresada por el usuario.
  const [pokeId, setPokeId] = useState('');

  // Estado para manejar la información del Pokemon.
  const [pokemonData, setPokemonData] = useState(null);

  // Función para manejar la consulta a la API.
  const handleSearch = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}/`);
      const data = await response.json();
      
      setPokemonData(data);
    } catch (error) {
      console.error("Error fetching the pokemon:", error);
    }
  };

  return (
    <div className="App">
      <h1>Look for the Pokemon</h1>  {/* Aquí está el título */}
      <input
        type="text"
        value={pokeId}
        onChange={(e) => setPokeId(e.target.value)}
        placeholder="Enter Pokemon ID or Name"
      />
      <button onClick={handleSearch}>Search</button>

      {pokemonData && (
        <div>
          <h1>Name: {pokemonData.name}</h1>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />

          <h2>Types</h2>
          <ul>
            {pokemonData.types.map((typeInfo, index) => (
              <li key={index}>{typeInfo.type.name}</li>
            ))}
          </ul>

          <h2>Abilities</h2>
          <ul>
            {pokemonData.abilities.map((abilityInfo, index) => (
              <li key={index}>{abilityInfo.ability.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
