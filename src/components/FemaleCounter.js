import React from 'react';
import { VictoryScatter } from 'victory';

const FemaleCounter = ({ currentStepIndex }) => {
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

  return (
    <VictoryScatter
      data={data}
      animate={{ duration: 500 }}
      size={10}
      style={{
        data: {
          fill: ({ datum }) => datum.fill
        }
      }}
    />
  )
}

export default FemaleCounter;
