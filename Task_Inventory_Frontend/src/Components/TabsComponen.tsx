import React, { useState } from 'react';
import styled from 'styled-components';
import FormToDo from '../FormToDo';
import Stats from './TaskStats';
import Input from './Input';
type TabsProps = {
    totalTask: number
    totalTaskDone:number []
    avgCompletionTimes: string []
    onFilterChange?: (filter: 'all' | 'high' | 'medium' | 'low') => void;
    onFilterNameChange?: (filterName: string) => void;
};
const TabComponent:React.FC<TabsProps> = ({totalTask,totalTaskDone,avgCompletionTimes,onFilterChange,onFilterNameChange}) => {
  const [activeTab, setActiveTab] = useState(2);

  return (
    <StyledWrapper>
      <div className="tab-container">
        <input type="radio" name="tab" id="tab1" className="tab tab--1"
          checked={activeTab === 1} onChange={() => setActiveTab(1)} />
        <label className="tab_label" htmlFor="tab1">Create a new task</label>

        <input type="radio" name="tab" id="tab2" className="tab tab--2"
          checked={activeTab === 2} onChange={() => setActiveTab(2)} />
        <label className="tab_label" htmlFor="tab2">See task stats</label>

        <input type="radio" name="tab" id="tab3" className="tab tab--3"
          checked={activeTab === 3} onChange={() => setActiveTab(3)} />
        <label className="tab_label" htmlFor="tab3">Search for a task</label>

        <div className="indicator" />
      </div>

      <div className="tab-content">
        {activeTab === 1 && <FormToDo/>}
        {activeTab === 2 && <Stats totalTask={totalTask} totalTaskDone={totalTaskDone} avgCompletionTimes={avgCompletionTimes} onFilterChange={onFilterChange}/>}
        {activeTab === 3 && <Input onFilterNameChange={onFilterNameChange}/>}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* Remove this container when use*/
  .component-title {
    width: 100%;
    position: absolute;
    z-index: 999;
    top: 30px;
    left: 0;
    padding: 0;
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    color: #888;
    text-align: center;
  }

  .tab-container {
    position: relative;
     width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;

    padding: 2px;

    background-color: #dadadb;
    border-radius: 9px;
  }

  .indicator {
    content: "";
    width: calc(100%/3);
    height: 28px;
    background: #4c0054;
    position: absolute;
    top: 2px;
    left: 2px;
    z-index: 9;
    border: 0.5px solid rgba(0, 0, 0, 0.04);
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.12), 0px 3px 1px rgba(0, 0, 0, 0.04);
    border-radius: 7px;
    transition: all 0.2s ease-out;
  }

  .tab {
    width: 130px;
    height: 28px;
    position: absolute;
    z-index: 99;
    outline: none;
    opacity: 0;
  }

  .tab_label {
    flex:1;
    width: 130px;
    height: 28px;

    position: relative;
    z-index: 999;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 0;

    font-size: 0.75rem;
    opacity: 0.6;

    cursor: pointer;
  }

  .tab--1:checked ~ .indicator {
    left: 2px;
  }

  .tab--2:checked ~ .indicator {
    left: calc(100%/3 + 2px);
  }

  .tab--3:checked ~ .indicator {
    left: calc(100%/3 *2 + 2px);
  }`;

export default TabComponent;
