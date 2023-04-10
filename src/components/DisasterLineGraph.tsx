import React from 'react';
import { VictoryAxis, VictoryChart, VictoryContainer, VictoryLine } from 'victory';

const data: { before: number; after: number }[] = [];
// template: generate 100 random data points
for (let i = 0; i < 100; i++) {
  data.push({
    before: Math.random() * 100,
    after: Math.random() * 100,
  });
}

const DisasterLineGraph = ({ currentStepIndex }) => {
  return (
    <VictoryChart height={700}>
      <VictoryAxis style={{ axis: { stroke: 'white' } }} />
      {data.map((d, i) => {
        const isBigDown = d.before > d.after && d.after < 10;
        return (
          <VictoryLine
            categories={{ x: ['1990s', '2010s'] }}
            data={[
              { x: '1990s', y: d.before },
              { x: '2010s', y: d.after },
            ]}
            style={{
              data: {
                stroke: ['black', isBigDown ? 'red' : 'grey', i === 69 ? 'green' : 'grey'][
                  currentStepIndex
                ],
                strokeWidth: [1.5, 1.5, i === 69 ? 4 : 1][currentStepIndex],
              },
            }}
            key={i}
          />
        );
      })}
    </VictoryChart>
  );
};

export default DisasterLineGraph;
