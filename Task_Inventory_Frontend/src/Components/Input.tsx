
import styled from 'styled-components';
import SearchButton from './SearchButton';
import { useState } from 'react';

type InputProps = {
  onFilterNameChange?: (filterName: string) => void;
};

const Input: React.FC<InputProps> = ({ onFilterNameChange }) => {
  const [taskName, setTaskName] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };

  const handleSearch = () => {
    if (onFilterNameChange) {
      onFilterNameChange(taskName); // Envía el texto al padre (TabComponent → App)
    }
  };

  return (
    <div className="w-full max-w-6xl p-6 mx-auto flex gap-1">
      <StyledWrapper>
        <div className="inputbox">
          <input
            required
            type="text"
            value={taskName}
            onChange={handleInputChange}
          />
          <span>Name of the task</span>
          <i />
        </div>
      </StyledWrapper>
      <SearchButton onFilterNameChange={handleSearch} />
    </div>
  );
};



const StyledWrapper = styled.div`
  .inputbox {
    position: relative;
    width: 250px;
  }

  .inputbox input {
    position: relative;
    width: 100%;
    padding: 20px 10px 10px;
    background: transparent;
    outline: none;
    box-shadow: none;
    border: none;
    color: #FFFFFF;
    font-size: 1em;
    letter-spacing: 0.05em;
    transition: 0.5s;
    z-index: 10;
  }

  .inputbox span {
    position: absolute;
    left: 0;
    padding: 20px 10px 10px;
    font-size: 1em;
    color: #4c0054;
    letter-spacing: 00.05em;
    transition: 0.5s;
    pointer-events: none;
  }

  .inputbox input:valid ~span,
  .inputbox input:focus ~span {
    color: #4c0054;
    transform: translateX(-10px) translateY(-34px);
    font-size: 0,75em;
  }

  .inputbox i {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: #4c0054;
    border-radius: 4px;
    transition: 0.5s;
    pointer-events: none;
    z-index: 9;
  }

  .inputbox input:valid ~i,
  .inputbox input:focus ~i {
    height: 44px;
  }`;

export default Input;
