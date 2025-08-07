import React from "react";
import { useForm } from "react-hook-form";

interface IFormInput {
  name: string;
  fechaARealizar:string | null;
  priority: string;
  Done:string;
  id:number
}
interface Props {
  onFiltrar: (filtros: Partial<IFormInput>) => void;
}
export const FormFilters: React.FC<Props> = ({ onFiltrar }) => {
  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit = (datos: IFormInput) => {
    onFiltrar(datos);
  };

  const opcionesPrioridad = ["All","Alta", "Media", "Baja"];
  const DoneUn=["All","Done","Undone"];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Filtros</h2>
        <div >
            <ul style={{ listStyle: 'none', gap: '8px' }}>
                <li>
                    <input type="text" placeholder="Tarea" defaultValue="" {...register("name")} />
                </li>
                <li>
                    <select defaultValue="All" {...register("priority")}>
                        {opcionesPrioridad.map((opcion) => (
                            <option key={opcion} value={opcion}>
                                {opcion}
                            </option>
                        ))}
                    </select>
                </li>
                <li>
                    <input style={{display:"none"}} type="date" placeholder="Fecha a Realizar "{...register("fechaARealizar")} />
                    <select defaultValue="All" {...register("Done")}>
                        {DoneUn.map((opcion) => (
                            <option key={opcion} value={opcion}>
                                {opcion}
                            </option>
                        ))}
                    </select>
                </li>
                <input type="submit" />
            </ul>
      </div>
    </form>
  );
};