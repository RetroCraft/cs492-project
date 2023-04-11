import React from 'react';
import _ from 'lodash';
import { VictoryChart, VictoryGroup, VictoryBar, VictoryLegend, VictoryVoronoiContainer } from 'victory';

import stereotypeData from '../data/stereotypes.json';
import HalfPageScroller from './HalfPageScroller';
import { ScrollComponent } from '../constants/types';
import Highlight from './Highlight';

const BarGraph: ScrollComponent = ({ currentStepIndex }) => {

  const caseNum = currentStepIndex ? stereotypeData[1] : stereotypeData[0];
  const range = !currentStepIndex ? [-1, 1] : [0, 8];

  const menRatios = [3.96, 3.69, 3.79]
  const femaleRatios = [2.91, 2.8, 3.69]

  const menData: { x: number; y: number; label: string }[] = [];
  const femaleData: { x: number; y: number; label: string }[] = [];
  menData.push({
    x: 1,
    y: menRatios[0],
    label: "Before",
  });
  femaleData.push({
    x: 3,
    y: femaleRatios[0],
    label: "Before",
  });
  if (currentStepIndex >=1) {
    menData.push({
      x: 5,
      y: menRatios[1],
      label: "After stereotypical",
    });
    femaleData.push({
      x: 7,
      y: femaleRatios[1],
      label: "After stereotypical",
    });
  }
  if (currentStepIndex === 2) {
    menData.push({
      x: 8,
      y: menRatios[2],
      label: "After non-stereotypical",
    });
    femaleData.push({
      x: 9,
      y: femaleRatios[2],
      label: "After non-stereotypical",
    });
  }

  return (
    <VictoryChart
      height={window.innerHeight - 100}
      domain={{ y: [range[0], range[1]] }}
      containerComponent={
        <VictoryVoronoiContainer
          labels={({ datum }) => `${datum.y}`}
        />
      }>

      <VictoryLegend
        orientation="horizontal"
        gutter={20}
        data={[
          { name: "Men", symbol: { fill: "teal" } },
          { name: "Women", symbol: { fill: "#ffc0cb" } },
        ]}
      />

      <VictoryGroup
        offset={55}
        animate={{ duration: 400, onLoad: { duration: 200 } }}
        colorScale={["teal", "#ffc0cb"]}
      >

        <VictoryBar
          domain={{ y: [0, 7], x: [0, 10] }}
          cornerRadius={{
            topLeft: ({ datum }) => 4,
            topRight: ({ datum }) => 4
          }}
          data={menData}
        />
        <VictoryBar
          domain={{ y: [0, 7], x: [0, 10] }}
          cornerRadius={{
            topLeft: ({ datum }) => 4,
            topRight: ({ datum }) => 4
          }}
          data={femaleData}
        />

      </VictoryGroup>
    </VictoryChart>
  )
}

const BarGraphScroller = () => {
  return (
    <HalfPageScroller Background={BarGraph}>
      <div>
        A experiment with 165 high school students in the Northwestern United States
        asked them to rate their interest in taking a CS class from 1-7. This is their interest
        before seeing a picture of the classroom.
      </div>
      <div>
        After seeing a picture of a <Highlight color="teal">stereotypical CS classroom</Highlight> with
        Star Wars/Star Trek items, electronics, software, tech magazines, computer parts,
        video games, computer books, and science fiction books,
        the interest remained about the same.
      </div>
      <div>
        However, after seeing a picture of a <Highlight color="teal">non-stereotypical CS classroom</Highlight> with
        nature pictures, art pictures, water bottles, pens, a coffee maker, lamps, general magazines, and plants,
        the interest of girls increased and the interest of boys still remained about the same.
      </div>
    </HalfPageScroller>
  );
};

export default BarGraphScroller;
