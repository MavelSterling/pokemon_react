import React, { useState } from 'react';
import './App.css';

function App() {
  // Estado para manejar la ID del Pokemon ingresada por el usuario.
  const [pokeId, setPokeId] = useState('');

  // Estado para manejar la información del Pokemon.
  const [pokemonData, setPokemonData] = useState(null);
  // Estado para manejar el mensaje de error
  const [errorMessage, setErrorMessage] = useState('');


  // Función para manejar la consulta a la API.
  const handleSearch = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}/`);
      //const data = await response.json();
      
       // Verifica si la respuesta es exitosa
      if (response.ok) {
        const data = await response.json();
        setPokemonData(data);
        setPokeId(''); // limpia el campo de búsqueda
        setErrorMessage(''); // limpia el mensaje de error anterior
      } else {
        setPokemonData(null); // limpia la información del Pokémon anterior
        setErrorMessage('Pokemon not found in the database, you can search for another.');
      }
    } catch (error) {
      console.error("Error fetching the pokemon:", error);
      setErrorMessage('Pokemon not found in the database, you can search for another.');

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
      {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>} {/* Aquí se muestra el mensaje de error */}

      {pokemonData && (
        <div>
          <h1>Name: {pokemonData.name}</h1>{/* Aquí está el nombre del pokemon */}
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />

          <h2>Types</h2> {/* Aquí está el tipo */}
          <ul>
            {pokemonData.types.map((typeInfo, index) => (
              <li key={index}>{typeInfo.type.name}</li>
            ))}
          </ul>

          <h2>Abilities</h2> {/* Aquí está las habilidades */}
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
