import type { JSX } from "react";


interface ReactTableProps {
  paginas: number;
  onPageChange: (page: number) => void;
}
export const Paginacion=({paginas,onPageChange}:ReactTableProps) : JSX.Element =>{
    return (
        <>
            <div style={{ justifyContent:'center',alignItems:'center',}}>
                <nav>
                    <ul style={{ display:'flex', listStyle: 'none', gap: '8px', }}>
                        {[...Array(paginas)].map((_, i) => (
                            <li key={i}>
                                <button onClick={() => onPageChange(i+1)}>{i+1}</button>
                            </li>
                        ))}
                    </ul>
                </nav>    
            </div>
        </>
    )
}