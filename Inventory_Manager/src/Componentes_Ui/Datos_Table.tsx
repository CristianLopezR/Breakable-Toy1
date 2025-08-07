import { useEffect, useMemo, useState, type JSX } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { Table } from './tabla';
import { Form } from './Form';
import { Paginacion } from './Pagination';
import { FormFilters } from './FormFilters';
import { Tiempo_Promedio } from './Tiempo_Promedio';

interface IFormInput {
  name: string;
  fechaARealizar:string | null;
  priority: string;
  Done:string;
  id:number
}

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
        checked={info.getValue() === true} readOnly
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
          style={{ display: info.row.original.bool ? 'none' : 'flex' }}
          onClick={()=>{
            setModoFormulario('editar');
            setFilaEditando(info.row.original);
            setMostrarFormulario(true);
          }
          }
            >Editar</button>
        <button 
          style={{ display: info.row.original.bool ? 'none' : 'flex' }}
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
    const [PaginasDis, setPaginasDisponibles] = useState<number>(1);
    const [paginaActual, setPaginaActual] = useState<number>(1);
    const [filaEditando, setFilaEditando] = useState<Item | null>(null);
    const [modoFormulario, setModoFormulario] = useState<'crear' | 'editar'>('crear');
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [filtros, setFiltros] = useState<Partial<IFormInput>>({});
    const [tiempoPromedio, setTiempoPromedio] = useState<string>('');
    const [tiempoPromedioAlt, setTiempoPromedioAlt] = useState<string>('');
    const [tiempoPromedioMed, setTiempoPromedioMed] = useState<string>('');
    const [tiempoPromedioBaj, setTiempoPromedioBaj] = useState<string>('');
    

    const cargarDatos = async (pagina: number = paginaActual,filtrosData: Partial<IFormInput> = filtros) => {
      setPaginaActual(pagina)
      const queryParams = new URLSearchParams({
        page: pagina.toString(),
        nam: filtrosData.name || '',
        prio: filtrosData.priority || 'All',
        DoneUn: filtrosData.Done || 'All',
      });
      const res = await fetch(`http://127.0.0.1:9090/todos?${queryParams}`);
      const { aux, totalPaginas, tiempo,alt,med,baj } = await res.json();
      console.log(alt,med,baj)
      setDatillos(aux);
      setPaginasDisponibles(totalPaginas);
      setTiempoPromedio(tiempo);
      setTiempoPromedioAlt(alt);
      setTiempoPromedioMed(med);
      setTiempoPromedioBaj(baj);
      setMostrarFormulario(false)
    };

    useEffect(() => {
      cargarDatos();
    }, []);
    
    return(
      <>
        <FormFilters onFiltrar={(datosFiltrados) => {
          setFiltros(datosFiltrados);
          cargarDatos(1, datosFiltrados);
        }}/>
        <div style={{display:"flex"}}>
        {!mostrarFormulario && (
          <button  onClick={() => { 
            setModoFormulario('crear');
            setFilaEditando(null);
            setMostrarFormulario(true);        
          }} style={{float:"left"}} >
            + New Task
          </button>
      )}</div>
        <Table data={datillos} columns={cols}  showForm={mostrarFormulario} formComponent={<Form onAgregar={cargarDatos} datosIniciales={filaEditando} modo={modoFormulario}/>}/>
        <Paginacion paginas={PaginasDis} onPageChange={(pagina) => { cargarDatos(pagina);}}/>        
        <Tiempo_Promedio tiempoPromedio={tiempoPromedio} tiempoPromedioAlt={tiempoPromedioAlt} tiempoPromedioMed={tiempoPromedioMed} tiempoPromedioBaj={tiempoPromedioBaj}/>
      </> 
    );
}