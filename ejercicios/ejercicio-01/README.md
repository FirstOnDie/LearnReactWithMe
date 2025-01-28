# **Ejercicio 1: Lista de Tareas Interactiva** ✅

### **Objetivo del Desafío**
Crear una aplicación básica en React con TypeScript que permita al usuario gestionar una lista de tareas. La aplicación debe:
1. Usar **hooks** como `useState` para manejar el estado.
2. Permitir **añadir** tareas, **mostrar** la lista y **eliminar** tareas.
3. Estilizar la interfaz con un diseño limpio y funcional.

---

### **Características Implementadas** 🛠️

#### 1️⃣ **Gestión del Estado**
- **`tareas`**: Una lista dinámica que almacena todas las tareas.
- **`nuevaTarea`**: Un string controlado que guarda lo que el usuario escribe en el input.

Ejemplo de estado inicial:
```tsx
const [tareas, setTareas] = useState<string[]>([]);
const [nuevaTarea, setNuevaTarea] = useState<string>('');
```

---

#### 2️⃣ **Añadir Tareas** ➕
- Al escribir en el input y hacer clic en el botón **Agregar**, la tarea se añade al estado `tareas`.
- Validamos que la tarea no esté vacía antes de agregarla.
- Después de agregar, el input se limpia automáticamente.

Ejemplo de función:
```tsx
const agregarTarea = () => {
  if (nuevaTarea.trim() === '') return; // Validación
  setTareas([...tareas, nuevaTarea]); // Actualizamos el estado
  setNuevaTarea(''); // Limpiamos el input
};
```

---

#### 3️⃣ **Eliminar Tareas** 🗑️
- Cada tarea tiene un botón "Eliminar" que permite quitarla de la lista.
- Usamos el índice de la tarea para identificar cuál eliminar.

Ejemplo de función:
```tsx
const eliminarTarea = (indice: number) => {
  const nuevasTareas = tareas.filter((_, i) => i !== indice); // Filtramos las tareas
  setTareas(nuevasTareas); // Actualizamos el estado
};
```

---

#### 4️⃣ **Estilización Moderna** 🎨
- **Diseño limpio y centrado**, con input y botones estilizados.
- **Lista de tareas con hover**, para resaltar la interacción.
- Usamos **CSS básico** con clases organizadas.

---

### **Flujo de la Aplicación** 🚀

1. **Inicio:**
    - El usuario ve un input y un botón para agregar tareas.
    - Si no hay tareas, se muestra un mensaje "No tienes tareas pendientes".

2. **Agregar Tareas:**
    - El usuario escribe en el input y hace clic en el botón "Agregar".
    - La tarea se añade a la lista, que se actualiza dinámicamente.

3. **Eliminar Tareas:**
    - Cada tarea tiene un botón "Eliminar".
    - Al hacer clic, la tarea desaparece de la lista.

4. **Interactividad Visual:**
    - Los botones tienen efectos de hover y la lista está estilizada con bordes redondeados.

---

### **Código Destacado** 💻

#### **Estructura del Componente Principal**
```tsx
import { useState } from 'react';
import './App.css';

function App() {
  const [tareas, setTareas] = useState<string[]>([]);
  const [nuevaTarea, setNuevaTarea] = useState<string>('');

  const agregarTarea = () => {
    if (nuevaTarea.trim() === '') return;
    setTareas([...tareas, nuevaTarea]);
    setNuevaTarea('');
  };

  const eliminarTarea = (indice: number) => {
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
      {tareas.length === 0 ? (
        <p className="empty-message">No tienes tareas pendientes. ¡Agrega una!</p>
      ) : (
        <ul>
          {tareas.map((tarea, index) => (
            <li key={index}>
              {tarea}
              <button onClick={() => eliminarTarea(index)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
```


---

### **Qué Aprendimos con Este Ejercicio** 🧠

1. **Gestión del Estado con `useState`:**
    - Cómo manejar datos dinámicos en React (tareas, inputs, etc.).

2. **Interactividad en React:**
    - Uso de eventos como `onClick` y `onChange` para interactuar con el usuario.

3. **Reactividad:**
    - Cómo React actualiza automáticamente la interfaz en función del estado.

4. **Estilización Básica:**
    - Crear interfaces funcionales y limpias con CSS.

---
