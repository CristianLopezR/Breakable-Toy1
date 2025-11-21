import React from 'react';
type UpdateProps = {
    id: string;
    name:string, 
    dueDate:string,
    priority:string
};
const CheckboxUpdate: React.FC<UpdateProps> = ({id,name,dueDate,priority}) => {
    
    const handleUpdateTask = async () => {
            // Validación básica
            if (name.trim() === '') {
                alert('El nombre de la tarea no puede estar vacío.');
                return;
            }

            const newTask = {
                id:Number(id),
                name: name.trim(),
                priority: priority,
                dueDate: dueDate || null
            };
            const url = 'http://localhost:9090/tasks/todos/edit';

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTask),
            });

            if (response.ok) {
                console.log('Tarea agregada exitosamente:', newTask);
                window.location.reload();
            } else {
                console.error('Error al agregar tarea:', response.status, await response.text());
                alert('No se pudo crear la tarea.');
            }
        } catch (error) {
            console.error('Fallo en la conexión:', error);
        }
    };
    const handleSubmit = (event: React.FormEvent) => {
            event.preventDefault();
            handleUpdateTask();
        };
  return (
    <button
      className="group cursor-pointer rounded-full flex items-center justify-center bg-[#e6e6d6] shadow-md hover:rotate-90 duration-300 focus:outline-none focus:ring-0"
      title="Update task"
      onClick={handleSubmit}
    >
      <svg
        className="stroke-purple-500 fill-none group-hover:fill-purple-800 group-active:stroke-purple-200 group-active:fill-purple-600 group-active:duration-0 duration-300"
        viewBox="0 0 24 24"
        height="60px"
        width="60px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeWidth="1.5" d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" />
        <path strokeWidth="1.5" d="M8 12H16" />
        <path strokeWidth="1.5" d="M12 16V8" />
      </svg>
    </button>
  );
};

export default CheckboxUpdate;