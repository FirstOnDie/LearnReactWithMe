### **Día 1:**

### **1. Revisa la estructura inicial**
Abre tu proyecto en WebStorm. Dentro de la carpeta `src`, deberías ver algo como esto (dependiendo de la configuración elegida):

```
src
├── App.css         // Estilos del componente App
├── App.jsx         // Componente principal de la aplicación
├── main.jsx        // Punto de entrada de tu aplicación
└── index.css       // Estilos globales (opcional)
```

El archivo clave para empezar es `App.jsx` (o `App.tsx` si elegiste TypeScript). Aquí es donde vamos a trabajar.

---

### **2. Ejecuta tu aplicación**
En la terminal integrada, inicia tu servidor de desarrollo si no lo has hecho ya:
```bash
npm run dev
```
Abre tu navegador y ve a la URL que aparece (por defecto `http://localhost:5173`). Deberías ver la página de inicio generada por Vite.

---

### **3. Haz tu primer cambio en React**
Abre `App.jsx` y verás algo como esto (puede variar ligeramente):

```jsx
import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>¡Hola React! 🚀</h1>
      <p>Este es tu primer proyecto en React.</p>
      <button onClick={() => setCount(count + 1)}>
        Contador: {count}
      </button>
    </div>
  );
}

export default App;
```

#### **¿Qué hace este código?**
1. **`useState`**:
    - Es un Hook que permite manejar el **estado** en React. Aquí, `count` es el valor actual del estado, y `setCount` es una función para actualizarlo.
2. **Botón interactivo**:
    - Cada vez que haces clic en el botón, `setCount` actualiza el estado, y React vuelve a renderizar el componente con el nuevo valor.

---

### **4. Personaliza tu aplicación**
Cambia el contenido del componente para que sea algo tuyo. Por ejemplo:

```jsx
function App() {
  return (
    <div className="App">
      <h1>Bienvenido a mi primera app React! 🚀</h1>
      <p>Estoy aprendiendo React con WebStorm, ¡y ya lo tengo listo!</p>
    </div>
  );
}

export default App;
```

Guarda los cambios, y el navegador se actualizará automáticamente (¡gracias a Vite!).

---

### **5. Crea tu primer componente personalizado**
En React, las interfaces se construyen con **componentes**. Vamos a crear uno:

1. En la carpeta `src`, crea un archivo llamado `MiComponente.jsx`:
   ```jsx
   function MiComponente() {
     return (
       <div>
         <h2>Soy un componente personalizado 😎</h2>
         <p>Esto es React: ¡divide y vencerás!</p>
       </div>
     );
   }

   export default MiComponente;
   ```

2. Ahora, úsalo en `App.jsx`:
   ```jsx
   import MiComponente from './MiComponente';

   function App() {
     return (
       <div className="App">
         <h1>Bienvenido a mi app React 🚀</h1>
         <MiComponente />
       </div>
     );
   }

   export default App;
   ```

Cuando guardes, deberías ver el contenido del componente en la página.

--- 

### Ejercicio
¡Excelente idea! 💡 Un ejercicio práctico te ayudará a afianzar los conceptos básicos de React. Vamos a crear una pequeña aplicación interactiva para que pongas en práctica **componentes**, **estado** y **eventos**.

---

### **Ejercicio: Una Lista de Tareas (To-Do List)**
El objetivo es crear una aplicación simple donde puedas:
1. Añadir tareas a una lista.
2. Ver las tareas en pantalla.
3. Eliminar tareas de la lista.

---

### **Requisitos del ejercicio:**
1. **Usar componentes:**
   - Un componente principal (`App`) que gestione el estado de las tareas.
   - Un componente para mostrar cada tarea.
   - Opcional: Un componente para el formulario de añadir tareas.

2. **Estado y eventos:**
   - Usar `useState` para manejar la lista de tareas.
   - Manejar eventos para añadir y eliminar tareas.

3. **Estilización básica:**
   - Puedes usar CSS o hacerlo sin estilos, como prefieras.

---

### **Objetivo del ejercicio**
- Entender cómo usar **estado** y manejar eventos en React.
- Dividir tu aplicación en **componentes reutilizables**.
- Mejorar con CSS o funcionalidades adicionales (ejemplo: marcar tareas como completadas).

¿Listo para ponerte manos a la obra? Si tienes dudas o necesitas ayuda con cualquier parte, ¡aquí estoy para ayudarte! 😊
<details>
    <summary>Solución</summary>

### **Paso 1: Esqueleto básico**
Empieza con esta estructura en `App.jsx`:

```jsx
import { useState } from 'react';

function App() {
  const [tareas, setTareas] = useState([]); // Estado para la lista de tareas
  const [nuevaTarea, setNuevaTarea] = useState(''); // Estado para la tarea que el usuario escribe

  // Función para manejar la adición de una tarea
  const agregarTarea = () => {
    if (nuevaTarea.trim() === '') return; // Evitar agregar tareas vacías
    setTareas([...tareas, nuevaTarea]);
    setNuevaTarea(''); // Limpiar el input
  };

  // Función para eliminar una tarea
  const eliminarTarea = (indice) => {
    const nuevasTareas = tareas.filter((_, i) => i !== indice);
    setTareas(nuevasTareas);
  };

  return (
    <div className="App">
      <h1>Lista de Tareas 📝</h1>

      {/* Input y botón para añadir tareas */}
      <div>
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Escribe una tarea..."
        />
        <button onClick={agregarTarea}>Agregar</button>
      </div>

      {/* Mostrar la lista de tareas */}
      <ul>
        {tareas.map((tarea, index) => (
          <li key={index}>
            {tarea}
            <button onClick={() => eliminarTarea(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

---

### **Paso 2: Divide en componentes**
Puedes mejorar la organización creando un componente para las tareas:

#### Crea un archivo `Tarea.jsx`:
```jsx
function Tarea({ texto, onEliminar }) {
  return (
    <li>
      {texto}
      <button onClick={onEliminar}>Eliminar</button>
    </li>
  );
}

export default Tarea;
```

#### Usa el componente en `App.jsx`:
```jsx
import Tarea from './Tarea';

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');

  const agregarTarea = () => {
    if (nuevaTarea.trim() === '') return;
    setTareas([...tareas, nuevaTarea]);
    setNuevaTarea('');
  };

  const eliminarTarea = (indice) => {
    setTareas(tareas.filter((_, i) => i !== indice));
  };

  return (
    <div className="App">
      <h1>Lista de Tareas 📝</h1>

      <div>
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Escribe una tarea..."
        />
        <button onClick={agregarTarea}>Agregar</button>
      </div>

      <ul>
        {tareas.map((tarea, index) => (
          <Tarea
            key={index}
            texto={tarea}
            onEliminar={() => eliminarTarea(index)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
```

---

### **Paso 3: Agrega estilos (opcional)**
Puedes añadir un archivo CSS (por ejemplo, `App.css`) con algo simple para que se vea bonito:

```css
.App {
  text-align: center;
  font-family: Arial, sans-serif;
}

input {
  margin: 0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
}

button {
  margin-left: 0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li button {
  background-color: red;
}
```
</details>