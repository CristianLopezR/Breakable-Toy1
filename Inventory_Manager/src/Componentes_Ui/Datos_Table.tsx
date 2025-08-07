import { useEffect, useMemo, useState, type JSX } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { Table } from './tabla';
import { Form } from './Form';

export type Item = {
 id:number;
 bool: boolean;
 name: string;
 priority:string;
 fechaARealizar:string|null;
}

export const Tabla_datos = () : JSX.Element => {
  const cols = useMemo<ColumnDef<Item>[]>(
    () => [
    {
     header: 'checkbox',
     accessorKey: 'bool',
      cell: info => (
      <input
        type="checkbox"
        onChange={async () => {
        const original = info.row.original;
        const id = original.id;
        const endpoint = original.bool
        ? `http://127.0.0.1:9090/todos/${id}/undone`
        : `http://127.0.0.1:9090/todos/${id}/done`;

        const method = original.bool ? "PUT" : "POST";
        await fetch(endpoint, {
        method,
      });

    await cargarDatos();  
  }}
      />
      )
    },
    {
     header: 'Name',
     cell: (row) => row.renderValue(),
     accessorKey: 'name',
    },
    {
      header: 'Priority<>',
      cell: (row) => row.renderValue(),
      accessorKey: 'priority',
    },
    {
      header: 'Due Date',
      cell: (row) => row.renderValue(),
      accessorKey: 'fechaARealizar',
   },
    {
      header: 'Actions',
      cell: info => (
      <>
        <button 
          onClick={()=>{
            console.log(info.row.original )
            setModoFormulario('editar');
            setFilaEditando(info.row.original);
            setMostrarFormulario(true);
          }
          }
            >Editar</button>
        <button 
          onClick={async () => {
            const id=info.row.original.id
            await fetch(`http://127.0.0.1:9090/todos/Del/${id}`, {
              method: "DELETE",
            });
            cargarDatos()
            }}>Eliminar</button>
      </>
      )
   },
    ],
    []
    );
    const [datillos, setDatillos] = useState([]);
    const [filaEditando, setFilaEditando] = useState<Item | null>(null);
    const [modoFormulario, setModoFormulario] = useState<'crear' | 'editar'>('crear');
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const cargarDatos = async () => {
      const res = await fetch("http://127.0.0.1:9090/todos");
      const data = await res.json();
      console.log("Datos recibidos:", data);
      setDatillos(data);
      setMostrarFormulario(false)
    };

    useEffect(() => {
      cargarDatos();
    }, []);
    
    return(
      <>
      {!mostrarFormulario && (
        <button onClick={() => { 
          setModoFormulario('crear');
          setFilaEditando(null);
          setMostrarFormulario(true);        
        }}>
          + New Task
        </button>
    )}
        <Table data={datillos} columns={cols}  showForm={mostrarFormulario} formComponent={<Form onAgregar={cargarDatos} datosIniciales={filaEditando} modo={modoFormulario}/>}/>
        
    </> 
    );
}