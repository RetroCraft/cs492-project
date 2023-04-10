import React, { useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import { VictoryBar, VictoryChart, VictoryScatter } from 'victory';

const ScrollamaDemo = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // This callback fires when a Step hits the offset threshold. It receives the
  // data prop of the step, which in this demo stores the index of the step.
  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data);
  };

  const generateData = () => {
    const data = []
    if (currentStepIndex === 0) {
      // draw 100 students in a grid
      for (let i = 0; i < 100; i++) {
        data.push({
          x: Math.floor(i / 10) * 10,
          y: i % 10 * 10
        })
      }
    } else {
      const numberOfWomen = [50, 30, 20][currentStepIndex - 1];
      // draw grid of women on left-hand side and grid of men on right-hand side
      for (let i = 0; i < numberOfWomen; i++) {
        data.push({
          x: Math.floor(i / 10) * 10,
          y: i % 10 * 10,
          fill: 'pink'
        })
      }
      for (let i = 0; i < 100 - numberOfWomen; i++) {
        data.push({
          x: 100 + Math.floor(i / 10) * 10,
          y: i % 10 * 10,
          fill: 'blue'
        })
      }
    }
    return data;
  }

  return (
    <div>
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: -100
      }}>
        <div className="container-fluid">
          <VictoryScatter
            data={generateData()}
            animate={{ duration: 500 }}
            size={10}
            style={{
              data: {
                fill: ({ datum }) => datum.fill
              }
            }}
          />
        </div>
      </div>
      <Scrollama offset={0.5} onStepEnter={onStepEnter}>
        <Step data={0}>
          <div
            style={{
              padding: '25vh 0 50vh 0',
              opacity: currentStepIndex === 0 ? 1 : 0.2,
              zIndex: '100'
            }}
          >
            <div className="row p-4 align-items-center rounded-3 border shadow-lg bg-white">
              Consider a group of 100 post-secondary students.
            </div>
          </div>
        </Step>
        <Step data={1}>
          <div
            style={{
              padding: '25vh 0 50vh 0',
              opacity: currentStepIndex === 1 ? 1 : 0.2,
              zIndex: '100'
            }}
          >
            <div className="row p-4 align-items-center rounded-3 border shadow-lg bg-white">
              In an average post-secondary class, women make up over half of the students.
            </div>
          </div>
        </Step>
        <Step data={2}>
          <div
            style={{
              padding: '25vh 0 50vh 0',
              opacity: currentStepIndex === 2 ? 1 : 0.2,
              zIndex: '100'
            }}
          >
            <div className="row p-4 align-items-center rounded-3 border shadow-lg bg-white">
              However, if we consider only STEM classes, this drops to 30%.
            </div>
          </div>
        </Step>
        <Step data={3}>
          <div
            style={{
              padding: '25vh 0 50vh 0',
              opacity: currentStepIndex === 3 ? 1 : 0.2,
              zIndex: '100'
            }}
          >
            <div className="row p-4 align-items-center rounded-3 border shadow-lg bg-white">
              Even worse, if this is a computer science class, we can expect as few as 20 women.
            </div>
          </div>
        </Step>
      </Scrollama>
    </div>
  );
};

export default ScrollamaDemo;