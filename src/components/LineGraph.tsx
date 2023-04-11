import React from 'react';
import FullPageScroller from './FullPageScroller';
import { VictoryAxis, VictoryChart, VictoryLegend, VictoryLine } from 'victory';
import { ScrollComponent, axisStyle } from '../constants';

const data = {
  bio: { name: 'Biology', color: 'red', data: [25, 31.2, 45.5, 50.2, 59.8] },
  chem: { name: 'Chemistry', color: 'orange', data: [18.5, 22.5, 36.3, 43.1, 51.8] },
  math: { name: 'Math', color: 'green', data: [33.3, 40.7, 46.5, 45.8, 44.9] },
  ess: { name: 'Earth/Space', color: 'blue', data: [9.4, 18.3, 22.3, 33.3, 41.2] },
  phys: { name: 'Physics', color: 'darkblue', data: [4.9, 10.9, 14.6, 18.5, 20.7] },
  eng: { name: 'Engineering', color: 'purple', data: [0.4, 3.4, 14.5, 17.9, 19.5] },
  cs: { name: 'CS', color: 'pink', data: [14.6, 19.8, 35.8, 27.6, 20.5] },
};

const LineGraph: ScrollComponent = ({ currentStepIndex }) => {
  return (
    <VictoryChart width={window.innerWidth * 0.8} height={window.innerHeight * 0.8}>
      <VictoryAxis style={axisStyle} />
      <VictoryAxis style={axisStyle} label="Bachelors earned by women (%)" dependentAxis />
      <VictoryLegend
        orientation="horizontal"
        style={axisStyle}
        gutter={20}
        data={Object.keys(data).map((key) => ({
          name: data[key].name,
          symbol: { fill: data[key].color },
        }))}
      />
      {Object.keys(data).map((key, i) => (
        <VictoryLine
          key={i}
          data={data[key].data.map((y, i) => ({
            x: ['1966', '1976', '1986', '1996', '2006'][i],
            y,
          }))}
          style={{
            data: {
              stroke: data[key].color,
              strokeWidth: key === 'cs' ? 4 : 1.5,
            },
          }}
        />
      ))}
    </VictoryChart>
  );
};

const LineGraphScroller = () => {
  return (
    <FullPageScroller Background={LineGraph}>
      <div>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse ab, enim officiis ut
        consectetur veniam! Facere magni ea similique quaerat maiores odit omnis nisi consequuntur!
        Cupiditate maxime earum repellendus architecto?
      </div>
    </FullPageScroller>
  );
};

export default LineGraphScroller;
