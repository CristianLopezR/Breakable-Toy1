import React from "react";
import { useForm } from "react-hook-form";
import type {Item} from "./Datos_Table"

interface IFormInput {
  name: string;
  fechaARealizar:string | null;
  priority: string;
  id:number
}
interface Props {
  onAgregar: () => void;
  datosIniciales?: Item | null;
  modo: 'crear' | 'editar';
}
export const Form: React.FC<Props> = ({ onAgregar, datosIniciales, modo }) => {
  const {
    register,
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit = async(Postdata: IFormInput) => {
    console.log(datosIniciales?.id)
      if(Postdata.fechaARealizar === '') Postdata.fechaARealizar = null;
      const endpoint =
      modo === 'editar'
        ? `http://127.0.0.1:9090/todos/edit/${datosIniciales?.id}`
        : 'http://127.0.0.1:9090/todos';
      const method = modo === 'editar' ? 'PUT' : 'POST';
      await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Postdata),
    });
      onAgregar();
  };
  const opcionesPrioridad = ["Alta", "Media", "Baja"];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{textAlign: "center"}}>
          <input type="text" placeholder="Tarea" defaultValue={datosIniciales?.name??''} {...register("name")} />
          <select defaultValue={datosIniciales?.priority??''} {...register("priority")}>
            {opcionesPrioridad.map((opcion) => (
            <option key={opcion} value={opcion}>
              {opcion}
            </option>
            ))}
          </select>
          <input type="date" placeholder="Fecha a Realizar " defaultValue={datosIniciales?.fechaARealizar??''} {...register("fechaARealizar")} />
          <input type="submit" />
        </div>
    </form>
  );
};