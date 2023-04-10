import React from 'react';
import _ from 'lodash';
import { VictoryAxis, VictoryChart, VictoryLine } from 'victory';

import { useCountry } from '../contexts/CountryContext';
import { disasterData } from '../data';
import CountrySelect from './CountrySelect';
import HalfPageScroller from './HalfPageScroller';
import { ScrollComponent } from '../constants/types';

const DisasterLineGraph: ScrollComponent = ({ currentStepIndex }) => {
  const country = useCountry();
  return (
    <VictoryChart height={window.innerHeight - 100}>
      <VictoryAxis
        style={{
          axis: { stroke: 'white' },
          tickLabels: { fontFamily: 'inherit', fontSize: '20px' },
        }}
        dependentAxis
        tickValues={[25, 50, 75]}
      />
      {Object.values(disasterData).map(({ before, after, code }, i) => {
        const isBigDown = before > 60 && after < 50;
        const isGettingBalanced = before < after;
        return (
          <VictoryLine
            categories={{ x: ['1990s', '2010s'] }}
            data={[
              { x: '1990s', y: before, code },
              { x: '2010s', y: after, code },
            ]}
            style={{
              data: {
                stroke: [
                  '#222222',
                  isBigDown ? '#F92772' : 'grey',
                  code === country ? '#009E60' : 'grey',
                  isGettingBalanced ? '#A6E220' : 'grey',
                ][currentStepIndex],
                strokeWidth: [
                  1.5,
                  isBigDown ? 1.5 : 1,
                  code === country ? 4 : 1,
                  isGettingBalanced ? 1.5 : 1,
                ][currentStepIndex],
              },
            }}
            key={i}
          />
        );
      })}
    </VictoryChart>
  );
};

const DisasterLineScroller = () => {
  const country = useCountry();
  const disaster = disasterData[country];
  return (
    <HalfPageScroller Background={DisasterLineGraph}>
      <div>
        We've compiled data points demonstrating the gender ratio of university acceptance in STEM
        across different countries, from the 1990s to the 2010s. The Y-axis represents the ratio of
        women admitted, while the X-axis represents time.
      </div>
      <div>
        As discussed earlier, certain countries (highlighted) saw considerable drops in the ratio of
        women admitted in this time frame.
      </div>
      <div>
        But each country has their own story. If we consider <CountrySelect />, there is a{' '}
        {disaster.before < disaster.after ? 'rise' : 'drop'} from {_.round(disaster.before, 2)}% to{' '}
        {_.round(disaster.after, 2)}% in the ratio of women.
      </div>
      <div>
        While certain countries show progress in their admission ratios, others report a downward
        trend. But overall, most countries' are getting closer to the middle of the graph (50% ratio
        of women admission in STEM). While this may not be enough, it does show a general trend
        towards a more balanced and inclusive environment.
      </div>
    </HalfPageScroller>
  );
};

export default DisasterLineScroller;
