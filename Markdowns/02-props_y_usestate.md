
### **Día 2:**
1. **Props**: Cómo pasar datos entre componentes.
2. **useState avanzado**: Manejo de estados más complejos.
3. **useEffect**: Cómo manejar efectos secundarios (fetch de datos, sincronización con el DOM, etc.).
4. **Desafío práctico**: Crear una aplicación que consuma una API pública y muestre datos dinámicos.

---

### **1. Props: Pasando datos entre componentes**
Ya utilizaste `props` para pasar funciones como `onEliminar` en el ejercicio de la lista de tareas, pero vamos a profundizar.

#### Ejemplo: Crear un componente de "Usuario"
Supongamos que tienes una lista de usuarios que quieres mostrar en pantalla. Podrías tener un componente `Usuario` que reciba los datos mediante `props`.

#### Archivo `Usuario.tsx`:
```tsx
type UsuarioProps = {
  nombre: string;
  edad: number;
  activo: boolean;
};

function Usuario({ nombre, edad, activo }: UsuarioProps) {
  return (
    <div style={{ border: '1px solid #ddd', margin: '10px', padding: '10px' }}>
      <h2>{nombre}</h2>
      <p>Edad: {edad}</p>
      <p>Estado: {activo ? 'Activo' : 'Inactivo'}</p>
    </div>
  );
}

export default Usuario;
```

#### Archivo `App.tsx`:
```tsx
import Usuario from './Usuario';

function App() {
  const usuarios = [
    { id: 1, nombre: 'Juan', edad: 25, activo: true },
    { id: 2, nombre: 'María', edad: 30, activo: false },
    { id: 3, nombre: 'Carlos', edad: 28, activo: true },
  ];

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      {usuarios.map((usuario) => (
        <Usuario
          key={usuario.id}
          nombre={usuario.nombre}
          edad={usuario.edad}
          activo={usuario.activo}
        />
      ))}
    </div>
  );
}

export default App;
```

---

### **2. Manejo avanzado de `useState`**
Ahora que conoces `useState`, podemos trabajar con **estados más complejos**, como objetos o arreglos.

#### Ejemplo: Contador con múltiples botones
Archivo `App.tsx`:
```tsx
import { useState } from 'react';

function App() {
  const [contador, setContador] = useState<number>(0);

  return (
    <div>
      <h1>Contador: {contador}</h1>
      <button onClick={() => setContador(contador + 1)}>Incrementar</button>
      <button onClick={() => setContador(contador - 1)}>Decrementar</button>
      <button onClick={() => setContador(0)}>Reiniciar</button>
    </div>
  );
}

export default App;
```

#### Ejemplo: Manejo de un estado como objeto
```tsx
import { useState } from 'react';

function App() {
  const [perfil, setPerfil] = useState<{ nombre: string; edad: number }>({
    nombre: 'Juan',
    edad: 25,
  });

  const cambiarNombre = () => setPerfil({ ...perfil, nombre: 'María' });
  const cumplirAños = () => setPerfil({ ...perfil, edad: perfil.edad + 1 });

  return (
    <div>
      <h1>Perfil</h1>
      <p>Nombre: {perfil.nombre}</p>
      <p>Edad: {perfil.edad}</p>
      <button onClick={cambiarNombre}>Cambiar Nombre</button>
      <button onClick={cumplirAños}>Cumplir Años</button>
    </div>
  );
}

export default App;
```

---

### **3. Introducción a `useEffect`**
`useEffect` es un Hook que te permite manejar **efectos secundarios** en tus componentes, como:
- Llamar a una API.
- Sincronizar datos con el DOM.
- Establecer un temporizador.

#### Ejemplo 1: Efecto básico
```tsx
import { useState, useEffect } from 'react';

function App() {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    document.title = `Contador: ${contador}`;
    console.log('Efecto ejecutado');
  }, [contador]); // Se ejecuta cada vez que `contador` cambia

  return (
    <div>
      <h1>Contador: {contador}</h1>
      <button onClick={() => setContador(contador + 1)}>Incrementar</button>
    </div>
  );
}

export default App;
```

#### Ejemplo 2: Llamada a una API con `useEffect`
Vamos a consumir datos de una API pública y mostrarlos en pantalla. Usaremos la API de Pokémon como ejemplo.

```tsx
import { useState, useEffect } from 'react';

function App() {
  const [pokemons, setPokemons] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Llamada a la API
    fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
      .then((response) => response.json())
      .then((data) => {
        setPokemons(data.results.map((pokemon: { name: string }) => pokemon.name));
        setLoading(false);
      });
  }, []); // [] indica que el efecto solo se ejecuta una vez, al montar el componente

  return (
    <div>
      <h1>Lista de Pokémon</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {pokemons.map((pokemon, index) => (
            <li key={index}>{pokemon}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
```

---

### **4. Desafío práctico: Crea tu propia mini-app**
#### Objetivo:
- Usar `useEffect` para consumir una API pública.
- Mostrar datos dinámicos en pantalla.
- Implementar un estado adicional (por ejemplo, un filtro o paginación).

[Solución](../ejercicios/ejercicio-02/README.md)