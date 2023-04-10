import React, { useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';

const HalfPageScroller: React.FC<{
  Background: typeof React.Component;
  children: React.ReactNode;
}> = ({ Background, children }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data);
  };

  const steps = React.Children.toArray(children);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-8">
          <Scrollama offset={0.5} onStepEnter={onStepEnter}>
            {steps.map((step, stepIndex) => (
              <Step data={stepIndex} key={stepIndex}>
                <div
                  style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <div>{step}</div>
                </div>
              </Step>
            ))}
          </Scrollama>
        </div>
        <div className="col-4">
          <div
            style={{
              position: 'sticky',
              top: 0,
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              zIndex: -100,
            }}
          >
            <div>
              <Background currentStepIndex={currentStepIndex} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HalfPageScroller;
