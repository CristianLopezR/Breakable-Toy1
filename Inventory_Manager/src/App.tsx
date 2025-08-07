import './App.css'
import {Tabla_datos} from './Componentes_Ui/Datos_Table';

function App() {
  return (
    <>
      <div className="table">
        <div className="px-10 py-5 md:w-1/2 m-auto">
          <Tabla_datos/>
        </div>
      </div>
      <div className="Footpage"></div>
    </>
  )
}

export default App
