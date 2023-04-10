import React, { useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';

const ScrollamaDemo = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(null);

  // This callback fires when a Step hits the offset threshold. It receives the
  // data prop of the step, which in this demo stores the index of the step.
  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data);
  };

  return (
    <div>
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: -100
      }}>
        <div>
          imagine that we've rendered {currentStepIndex} women back here
        </div>
      </div>
      <Scrollama offset={0.5} onStepEnter={onStepEnter}>
        {[1, 2, 3].map((stepIndex) => (
          <Step data={stepIndex} key={stepIndex}>
            <div
              style={{
                padding: '25vh 0',
                opacity: currentStepIndex === stepIndex ? 1 : 0.2,
                zIndex: '100'
              }}
            >
              <div className="row p-4 align-items-center rounded-3 border shadow-lg bg-white">
                I'm a Scrollama Step of index {stepIndex}
              </div>
            </div>
          </Step>
        ))}
        <Step data={4}>
          <div
            style={{
              padding: '25vh 0 50vh 0',
              opacity: currentStepIndex === 4 ? 1 : 0.2,
              zIndex: '100'
            }}
          >
            <div className="row p-4 align-items-center rounded-3 border shadow-lg bg-white">
              I'm a Scrollama Step of index 4
            </div>
          </div>
        </Step>
      </Scrollama>
    </div>
  );
};

export default ScrollamaDemo;