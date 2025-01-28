# **Ejercicio 2: Pokédex Interactiva** 🐾

### **Objetivo del Desafío**
Crear una mini-aplicación en React con TypeScript que consuma una API pública. La aplicación debe:
1. Usar `useEffect` para consumir los datos de la [API de Pokémon](https://pokeapi.co/).
2. Mostrar una lista dinámica de Pokémon.
3. Incluir búsqueda por nombre y paginación.
4. Mostrar detalles específicos de cada Pokémon al hacer clic.

---

### **Características Implementadas** 🛠️

#### 1️⃣ **Gestión del Estado Inicial**
- **`pokemons`**: Almacena todos los Pokémon obtenidos de la API.
- **`filteredPokemons`**: Contiene los Pokémon que coinciden con la búsqueda.
- **`search`**: Controla el valor del input de búsqueda.
- **`currentPage`**: Controla la página actual en la lista.
- **`selectedPokemon`**: Almacena los detalles del Pokémon seleccionado.
- **`loading`**: Indica si la aplicación está cargando datos.

---

#### 2️⃣ **Llamada a la API con `useEffect`**
- La aplicación realiza una **llamada inicial** a la API al montar el componente.
- Los datos de los Pokémon se almacenan en el estado `pokemons`.
- **Ventaja**: Gracias al manejo asincrónico, la lista está disponible para ser filtrada, paginada y visualizada rápidamente.

---

#### 3️⃣ **Filtrado Dinámico 🔍**
- Cada vez que el usuario escribe en el campo de búsqueda, el estado `search` se actualiza.
- Un **`useEffect` adicional** filtra la lista de Pokémon almacenada en `filteredPokemons`.
- Esto permite mostrar en tiempo real solo los Pokémon que coinciden con el término de búsqueda.

---

#### 4️⃣ **Paginación Dinámica 📄**
- La lista muestra **108 Pokémon por página**.
- El número de páginas se ajusta dinámicamente en función del total de resultados filtrados.
- El usuario puede navegar fácilmente entre páginas mediante botones numerados.

---

#### 5️⃣ **Detalles del Pokémon Seleccionado** 🧾
- Al hacer clic en un Pokémon, se realiza una segunda llamada a la API para obtener sus detalles (tipo, peso, altura y sprite).
- Los datos del Pokémon seleccionado se muestran en una vista separada con un diseño limpio y bien organizado.
- **Animación suave**: Los detalles del Pokémon aparecen con un efecto de fade-in para una mejor experiencia visual.

---

#### 6️⃣ **Estilo Moderno y Animaciones** 🎨✨
- **Diseño centrado y responsivo**:
    - Input con bordes redondeados y efecto de enfoque.
    - Tarjetas limpias y con efecto hover en la lista de Pokémon.
    - Diseño grid para organizar las tarjetas.
- **Paginación atractiva**:
    - Botones numerados con estilos diferenciados para la página actual.
    - Transiciones suaves en hover para los botones.
- **Animaciones**:
    - Los detalles del Pokémon utilizan un efecto de fade-in (`@keyframes` en CSS).

---

### **Código Destacado** 💻

#### **Filtrado Dinámico con `useEffect`**
```tsx
useEffect(() => {
  const resultadosFiltrados = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );
  setFilteredPokemons(resultadosFiltrados);
  setCurrentPage(1); // Reinicia la paginación al buscar
}, [search, pokemons]);
```

#### **Cálculo de Pokémon por Página**
```tsx
const indexOfLastPokemon = currentPage * pokemonsPerPage;
const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
```

#### **Detalles del Pokémon**
```tsx
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
```

---

### **Cómo Funciona la Aplicación** 🚀

1. **Inicio:**
    - La aplicación carga una lista completa de Pokémon desde la API.
    - Muestra los primeros **108 Pokémon** organizados en tarjetas.

2. **Búsqueda Dinámica:**
    - Al escribir en el input, los resultados se filtran en tiempo real.
    - La paginación se ajusta automáticamente para reflejar los resultados filtrados.

3. **Detalles del Pokémon:**
    - Al hacer clic en una tarjeta, se muestra una vista detallada del Pokémon.
    - Incluye sprite, tipo, peso y altura.

4. **Paginación:**
    - Los usuarios pueden navegar fácilmente entre páginas mediante botones numerados.
    - Al buscar, la paginación se actualiza automáticamente para mostrar solo los resultados relevantes.

---
