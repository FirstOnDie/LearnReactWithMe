import { useState } from 'react';
import Tarea from './Tarea';

// Define el tipo para una tarea
type Tarea = {
    id: number;
    texto: string;
};

function App() {
    const [tareas, setTareas] = useState<Tarea[]>([]);
    const [nuevaTarea, setNuevaTarea] = useState<string>('');

    const agregarTarea = () => {
        if (nuevaTarea.trim() === '') return;
        const nueva: Tarea = { id: Date.now(), texto: nuevaTarea };
        setTareas([...tareas, nueva]);
        setNuevaTarea('');
    };

    const eliminarTarea = (id: number) => {
        setTareas(tareas.filter((tarea) => tarea.id !== id));
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
                {tareas.map((tarea) => (
                    <Tarea
                        key={tarea.id}
                        texto={tarea.texto}
                        onEliminar={() => eliminarTarea(tarea.id)}
                    />
                ))}
            </ul>
        </div>
    );
}

export default App;