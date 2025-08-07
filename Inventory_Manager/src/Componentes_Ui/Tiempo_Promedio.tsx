import type { JSX } from "react";


interface ReactTableProps {
  tiempoPromedio: string;
  tiempoPromedioAlt: string;
  tiempoPromedioMed: string;
  tiempoPromedioBaj: string;
}
export const Tiempo_Promedio=({tiempoPromedio,tiempoPromedioAlt,tiempoPromedioBaj,tiempoPromedioMed}:ReactTableProps) : JSX.Element =>{
    return (
        <>
            <div style={{display:"flex", gap: "24px"}}>
                    <p style={{ marginTop: '1rem' }}>
                        Avarage Time To<br/> Finish Task:<br/>{tiempoPromedio} 
                    </p>
                <div>
                    <p>Avarage Time To <br/>Finish Task By Priority: </p>
                    <ul style={{ listStyle: 'none' }}>
                        <li>High: {tiempoPromedioAlt}</li>
                        <li>Medium: {tiempoPromedioMed}</li>
                        <li>Low: {tiempoPromedioBaj}</li>
                    </ul>
                </div>
            </div>
        </>
    )
}