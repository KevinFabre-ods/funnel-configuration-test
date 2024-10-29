import React, { useState } from 'react';
import './App.css';
import CTAForm from './CTAForm';
import FlowGraph from './FlowGraph';

const App = () => {
  const [firstStep, setFirstStep] = useState('explorer'); // Default main CTA
  const [secondStep, setSecondStep] = useState('');

  return (
    <div>
      <div className="layout">
        <CTAForm 
          firstStep={firstStep} 
          setFirstStep={setFirstStep} 
          secondStep={secondStep} 
          setSecondStep={setSecondStep} 
          />
        <FlowGraph firstStep={firstStep} secondStep={secondStep} />
      </div>
    </div>
  );
};

export default App;
