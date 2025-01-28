type TareaProps = {
    texto: string; // Texto de la tarea
    onEliminar: () => void; // Función para eliminar la tarea
};

function Tarea({ texto, onEliminar }: TareaProps) {
    return (
        <li>
            {texto}
            <button onClick={onEliminar}>Eliminar</button>
        </li>
    );
}

export default Tarea;