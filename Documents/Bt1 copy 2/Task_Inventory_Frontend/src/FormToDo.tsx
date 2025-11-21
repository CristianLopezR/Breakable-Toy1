import { useState } from "react";


function FormToDo() {
    const [name, setName] = useState('');
    const [priority, setPriority] = useState('High');
    const [dueDate, setDueDate] = useState('');

    const handlePostNewTask = async () => {
            if (name.trim() === '') {
                alert('El nombre de la tarea no puede estar vacío.');
                return;
            }

            const newTask = {
                name: name.trim(),
                priority: priority,
                dueDate: dueDate === '' ? null : dueDate, 
                done: false
            };
            const url = 'http://localhost:9090/tasks/todos';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTask),
            });

            if (response.ok) {
                console.log('Tarea agregada exitosamente:', newTask);
                window.location.reload();
                setName('');
                setDueDate('');
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
            handlePostNewTask();
        };
    return (
        <form onSubmit={handleSubmit} className="w-full max-w-4xl p-4 mx-auto">
            <div className="flex items-end gap-3 md:gap-2">
                <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Name of the task
                    </label>
                    <input value={name} onChange={(e) => setName(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-4 px-6 text-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Priority
                    </label>
                <div className="relative">
                    <select value={priority} onChange={(e) => setPriority(e.target.value)} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-4 px-6 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-Priority">
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Due date
                    </label>
                    <input value={dueDate} onChange={(e) => setDueDate(e.target.value)} id="dueDate" type="date" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-4 px-6 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>
                </div>
                <button type="submit" >
                    <div className="w-auto h-auto">
                        <div className="flex-1 h-full">
                        <div className="flex items-center justify-center flex-1 h-full p-2 border border-gray-400 rounded-full">
                            <div className="relative">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            </div>
                        </div>
                        </div>
                    </div>
                </button>
            </div>

        </form>
    )
}

export default FormToDo