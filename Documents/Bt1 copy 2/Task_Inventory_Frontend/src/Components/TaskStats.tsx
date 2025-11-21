import type React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

type StatsProps = {
    totalTask: number
    totalTaskDone:number []
    avgCompletionTimes:string[]
    onFilterChange?: (filter: 'all' | 'high' | 'medium' | 'low') => void;
};

const Stats:React.FC<StatsProps> = ({totalTask,totalTaskDone,avgCompletionTimes,onFilterChange}) => {

  const [selected, setSelected] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const handleSelect = (filter: 'all' | 'high' | 'medium' | 'low') => {
    setSelected(filter);
    if (onFilterChange) onFilterChange(filter);
  };

  return (
    <StyledWrapper>
      <div className="results-summary-container">
        <div className="results-summary-container__result">
          <div className="heading-tertiary">Completed 
              {selected === 'all' && ` `}
              {selected === 'high' && ` high `}
              {selected === 'medium' && ` medium `}
              {selected === 'low' && ` low `}
              tasks</div>
          <div className="result-box">
            <div className="heading-primary">
              {selected === 'all' && `${totalTaskDone[0]}`}
              {selected === 'high' && `${totalTaskDone[1]}`}
              {selected === 'medium' && `${totalTaskDone[2]}`}
              {selected === 'low' && `${totalTaskDone[3]}`}
            </div>
            <p className="result">of {totalTask}</p>
          </div>
        </div>
        <div className="results-summary-container__options">
          <div className="heading-secondary heading-secondary--blue">Avarage time to complete a task</div>
          <div className="summary-result-options">
            <div className="result-option result-option-reaction" onClick={() => handleSelect('all')}>
              <div className="icon-box">
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20">
                  <path stroke="#F55" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M10.833 8.333V2.5l-6.666 9.167h5V17.5l6.666-9.167h-5Z" />
                </svg>
                <span className="reaction-icon-text">All tasks</span>
              </div>
              <div className="result-box"><span>{avgCompletionTimes[0]}</span></div>
            </div>
            <div className="result-option result-option-memory" onClick={() => handleSelect('high')}>
              <div className="icon-box">
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20">
                  <path stroke="#FFB21E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M5.833 11.667a2.5 2.5 0 1 0 .834 4.858" />
                  <path stroke="#FFB21E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M3.553 13.004a3.333 3.333 0 0 1-.728-5.53m.025-.067a2.083 2.083 0 0 1 2.983-2.824m.199.054A2.083 2.083 0 1 1 10 3.75v12.917a1.667 1.667 0 0 1-3.333 0M10 5.833a2.5 2.5 0 0 0 2.5 2.5m1.667 3.334a2.5 2.5 0 1 1-.834 4.858" />
                  <path stroke="#FFB21E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M16.447 13.004a3.334 3.334 0 0 0 .728-5.53m-.025-.067a2.083 2.083 0 0 0-2.983-2.824M10 3.75a2.085 2.085 0 0 1 2.538-2.033 2.084 2.084 0 0 1 1.43 2.92m-.635 12.03a1.667 1.667 0 0 1-3.333 0" />
                </svg>
                <span className="memory-icon-text">High priority</span>
              </div>
              <div className="result-box"><span>{avgCompletionTimes[1]}</span> </div>
            </div>
            <div className="result-option result-option-verbal" onClick={() => handleSelect('medium')}>
              <div className="icon-box">
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20">
                  <path stroke="#00BB8F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M7.5 10h5M10 18.333A8.333 8.333 0 1 0 1.667 10c0 1.518.406 2.942 1.115 4.167l-.699 3.75 3.75-.699A8.295 8.295 0 0 0 10 18.333Z" />
                </svg>
                <span className="verbal-icon-text">Medium priority</span>
              </div>
              <div className="result-box"><span>{avgCompletionTimes[2]}</span></div>
            </div>
            <div className="result-option result-option-Visual" onClick={() => handleSelect('low')}>
              <div className="icon-box">
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20">
                  <path stroke="#1125D6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M10 11.667a1.667 1.667 0 1 0 0-3.334 1.667 1.667 0 0 0 0 3.334Z" />
                  <path stroke="#1125D6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M17.5 10c-1.574 2.492-4.402 5-7.5 5s-5.926-2.508-7.5-5C4.416 7.632 6.66 5 10 5s5.584 2.632 7.5 5Z" />
                </svg>
                <span className="visual-icon-text">Low priority</span>
              </div>
              <div className="result-box"><span>{avgCompletionTimes[3]}</span></div>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%; 

  .results-summary-container {
    font-family: "Hanken Grotesk", sans-serif;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
    border-radius: 10px;
    box-shadow: none;
    backface-visibility: hidden;
  }

  .heading-primary,
  .heading-secondary,
  .heading-tertiary {
    color: #ffffff;
    text-transform: capitalize;
    margin-bottom: 15px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .heading-primary {
    font-size: 27px;
    font-weight: 700;
    background-image: linear-gradient(to right, #f7bb97, #dd5e89);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transform: scale(1.6);
  }

  .heading-secondary {
    font-size: 24px;
    font-weight: 700;
    margin-top: 15px;
    letter-spacing: 1px;
  }

  .heading-secondary--blue {
    color: hsl(224, 30%, 27%);
  }

  .heading-tertiary {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 20px;
    color: hsl(221, 100%, 96%);
  }

  .paragraph {
    font-size: 17px;
    line-height: 1.6;
    color: hsl(221, 100%, 96%);
  }

  .paragraph-text-box {
    width: 100%;
  }

  .text-center {
    text-align: center;
  }

  .margin-1 {
    margin-bottom: 10px;
  }

  .results-summary-container__result {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
    padding: 20px 10px;
    border-radius: 10px 10px 0 0;
    background-image: linear-gradient(to bottom, #aa076b, #61045f);
    .result-box {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-image: linear-gradient(-45deg, #ef629f, #42275a);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .result {
    margin-top: -12px;
    font-size: 14px;
    font-weight: 400;
    color: hsl(241, 100%, 89%);
  }
  }

  .results-summary-container__options {
    padding: 0 16px;
  }

  .summary-result-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .result-option {
    width: 100%;
    height: 40px;
    background-color: hsl(0, 100%, 97%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-radius: 3px;
    cursor: pointer;
  }

  .result-option-memory {
    background-color: hsl(39, 100%, 97%);
  }

  .result-option-verbal {
    background-color: hsl(166, 100%, 97%);
  }

  .result-option-Visual {
    background-color: hsl(234, 85%, 97%);
  }

  .icon-box {
    display: flex;
    font-size: 16px;
    align-items: center;
    gap: 2px;
  }

  .reaction-icon-text {
    color: hsl(0, 100%, 67%);
  }

  .memory-icon-text {
    color: hsl(39, 100%, 56%);
  }

  .verbal-icon-text {
    color: hsl(166, 100%, 37%);
  }

  .visual-icon-text {
    color: hsl(234, 85%, 45%);
  }

  .result-box {
    font-size: 14px;
    color: hsl(241, 100%, 89%);
    font-weight: 700;
  }

  .result-box span {
    font-size: 14px;
    color: hsl(224, 30%, 27%);
  }

  .icon {
    cursor: pointer;
    filter: grayscale(1);
    transition: 0.3s linear;
  }

  .icon:hover {
    filter: grayscale(0);
  }

  @keyframes background {
    0% {
      background-image: linear-gradient(to right, #aa076b, #61045f);
    }

    50% {
      background-image: linear-gradient(to right, #aa076b, #61045f);
    }

    100% {
      background-image: linear-gradient(to right, #ef629f, #42275a);
    }
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
      background-image: linear-gradient(-45deg, #ef629f, #42275a);
    }

    50% {
      background-position: 100% 50%;
      background-image: linear-gradient(to bottom, #aa076b, #61045f);
    }

    100% {
      background-position: 0% 50%;
      background-image: linear-gradient(to top, #ef629f, #42275a);
    }
  }

  @keyframes makeItRain {
    from {
      opacity: 0;
    }

    50% {
      opacity: 1;
    }

    to {
      transform: translateY(200px);
    }
  }`;

export default Stats;
