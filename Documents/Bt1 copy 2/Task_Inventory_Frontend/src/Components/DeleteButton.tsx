import styled from 'styled-components';
type DeleteProps = {
  id: string; // ID de la tarea
  onDelete?: (id: string) => void;
};
const DeleteButton:React.FC<DeleteProps> = ({id,onDelete}) => {

  
const handleDelete = async () => {
    const url = `http://localhost:9090/tasks/todos/Del/${id}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log(`✅ Tarea ${id} eliminada`);
        window.location.reload();
        if (onDelete) onDelete(id); // Actualiza la lista en el padre
      } else {
        console.error(`❌ Error al eliminar:`, response.status, await response.text());
        alert(`Fallo la eliminación.`);
      }
    } catch (error) {
      console.error('Fallo en la conexión:', error);
    }
  };
  

  return (
    <StyledWrapper>
      <button aria-label="Delete item" className="deleteBtn" onClick={handleDelete}>
        <svg viewBox="0 -10 64 74" xmlns="http://www.w3.org/2000/svg">
          <g id="trash-can">
            {/* Cuerpo del bote en rojo inverso */}
            <rect x={16} y={24} width={32} height={30} rx={3} ry={3} fill="#00b2b2" />
            {/* Tapa más oscura */}
            <g id="lid-group" style={{ transformOrigin: '12px 18px' }}>
              <rect x={12} y={12} width={40} height={6} rx={2} ry={2} fill="#33ffff" />
              <rect x={26} y={8} width={12} height={4} rx={2} ry={2} fill="#33ffff" />
            </g>
          </g>
        </svg>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .deleteBtn {
    width: 55px; /* Igual que EditButton */
    height: 55px;
    border-radius: 20px;
    border: none;
    background-color: transparent; /* Fondo transparente */
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.123);
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s;
  }

  .deleteBtn::before {
    content: "";
    width: 200%;
    height: 200%;
    background-color: rgba(0, 178, 178, 0.2); /* efecto rojo suave */
    position: absolute;
    z-index: 1;
    transform: scale(0);
    transition: all 0.3s;
    border-radius: 50%;
    filter: blur(10px);
  }

  .deleteBtn:hover::before {
    transform: scale(1);
  }

  .deleteBtn:hover {
    box-shadow: 0px 5px 10px rgba(0, 233, 255, 1);
  }

  .deleteBtn svg {
    width: 24px; /* Ícono proporcional */
    height: 24px;
    z-index: 3;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    filter: drop-shadow(0 2px 4px rgba(25, 213, 231, 1));
  }

  #lid-group {
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .deleteBtn:hover #lid-group {
    transform: rotate(-28deg) translateY(2px);
  }

  .deleteBtn:active #lid-group {
    transform: rotate(-12deg) scale(0.98);
  }

  .deleteBtn:hover svg {
    transform: scale(1.08) rotate(3deg);
  }

  .deleteBtn:active svg {
    transform: scale(0.96) rotate(-1deg);
  }
`;

export default DeleteButton;