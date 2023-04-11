import React from 'react';
import _ from 'lodash';
import { VictoryChart, VictoryGroup, VictoryBar, VictoryLegend, VictoryVoronoiContainer } from 'victory';

import stereotypeData from '../data/stereotypes.json';
import HalfPageScroller from './HalfPageScroller';
import { ScrollComponent } from '../constants/types';
import Highlight from './Highlight';

const BarGraph: ScrollComponent = ({ currentStepIndex }) => {

  const caseNum = currentStepIndex ? stereotypeData[1] : stereotypeData[0];
  const range = !currentStepIndex ? [-1,1] : [0, 8];
  
  return (
    <VictoryChart 
      height={window.innerHeight - 100} 
      domain={{y: [range[0], range[1]]}}
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
            { name: "Women", symbol: { fill: "#e75480" } },
          ]}
        />
      
      <VictoryGroup 
        offset={55} 
        animate={{ duration: 400, onLoad: { duration: 200 } }}
        colorScale={["teal", "#e75480"]}
      >

        <VictoryBar
          data={[{x: "Stereotypical", y: caseNum.stereotypical[0]}, {x: "Non-Stereotypical", y: caseNum.nonstereotypical[0]}]} 
        />
        <VictoryBar
          data={[{x: "Stereotypical", y: caseNum.stereotypical[1]}, {x: "Non-Stereotypical", y: caseNum.nonstereotypical[1]}]}
        />

      </VictoryGroup>
    </VictoryChart>
  );
};

const BarGraphScroller = () => {
  return (
    <HalfPageScroller Background={BarGraph}>
      <div>
        This is <Highlight color="#F92772">case 1</Highlight>.
      </div>
      <div>
        This is <Highlight color="teal">case 2</Highlight>.
      </div>
    </HalfPageScroller>
  );
};

export default BarGraphScroller;
