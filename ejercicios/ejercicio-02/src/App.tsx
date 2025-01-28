import { useState, useEffect } from 'react';
import './App.css';

type Pokemon = {
    name: string;
    url: string;
};

type PokemonDetails = {
    name: string;
    sprites: { front_default: string };
    types: { type: { name: string } }[];
    weight: number;
    height: number;
};

function App() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]); // Lista completa de Pokémon
    const [search, setSearch] = useState<string>(''); // Valor del buscador
    const [currentPage, setCurrentPage] = useState<number>(1); // Página actual
    const [pokemonsPerPage] = useState<number>(81); // Pokémon por página
    const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(null); // Pokémon seleccionado
    const [loading, setLoading] = useState<boolean>(true); // Indicador de carga

    // Llamada a la API para obtener todos los Pokémon
    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=1000') // Obtenemos todos los Pokémon
            .then((response) => response.json())
            .then((data) => {
                setPokemons(data.results);
                setLoading(false);
            });
    }, []);

    // Filtrar Pokémon según la búsqueda
    const filteredPokemons = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
    );

    // Calcular los Pokémon que se muestran en la página actual
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    // Cambiar página
    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        setSelectedPokemon(null); // Desmarcar detalles al cambiar de página
    };

    // Cargar detalles del Pokémon seleccionado
    const loadPokemonDetails = (url: string) => {
        setLoading(true);
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setSelectedPokemon({
                    name: data.name,
                    sprites: data.sprites,
                    types: data.types,
                    weight: data.weight,
                    height: data.height,
                });
                setLoading(false);
            });
    };

    return (
        <div className="App">
            <h1>Pokédex 🐾</h1>

            {/* Input de búsqueda */}
            {!selectedPokemon && (
                <input
                    type="text"
                    placeholder="Busca un Pokémon..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            )}

            {loading && <p className="loading">Cargando...</p>}

            {/* Mostrar detalles del Pokémon seleccionado */}
            {selectedPokemon ? (
                <div className="pokemon-details">
                    <h2>{selectedPokemon.name}</h2>
                    <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
                    <p>
                        <strong>Tipo:</strong>{' '}
                        {selectedPokemon.types.map((type, index) => (
                            <span key={index}>{type.type.name}{index < selectedPokemon.types.length - 1 && ', '}</span>
                        ))}
                    </p>
                    <p>
                        <strong>Peso:</strong> {selectedPokemon.weight} kg
                    </p>
                    <p>
                        <strong>Altura:</strong> {selectedPokemon.height} m
                    </p>
                    <button onClick={() => setSelectedPokemon(null)}>Volver</button>
                </div>
            ) : (
                <>
                    {/* Lista de Pokémon */}
                    <ul className="pokemon-list">
                        {currentPokemons.map((pokemon, index) => (
                            <li key={index} className="pokemon-item" onClick={() => loadPokemonDetails(pokemon.url)}>
                                {pokemon.name}
                            </li>
                        ))}
                    </ul>

                    {/* Paginación */}
                    <div className="pagination">
                        {Array.from({ length: Math.ceil(filteredPokemons.length / pokemonsPerPage) }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={currentPage === index + 1 ? 'active' : ''}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default App;