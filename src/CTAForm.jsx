import React from 'react';

const options = [{label: 'Explorer', value: 'explorer'}, 
    {label: 'Exporter', value: 'exporter'}, 
    {label: 'Views', value: 'views'},
    {label: 'API Wizard', value: 'api-wizard'}
];

const CTAForm = ({ firstStep, setFirstStep, secondStep, setSecondStep}) => {
  return (
    <div>
    <div>
      <h2>First Step</h2>
      <select value={firstStep} onChange={(e) => setFirstStep(e.target.value)}>
        {options.map(({value, label}) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
    <div>
      <h2>Second Step</h2>
      <select value={secondStep} onChange={(e) => setSecondStep(e.target.value)}>
            <>
                <option  value={''}>No second step</option>
                {options.filter(option => option.value !== firstStep).map(({value, label}) => (
                    <option key={value} value={value}>{label}</option>
                ))}
            </>
      </select>
    </div>
    </div>
  );
};

export default CTAForm;
