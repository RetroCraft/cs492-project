import React from 'react';
import _ from 'lodash';
import { VictoryAxis, VictoryChart, VictoryLine } from 'victory';

import { useCountry } from '../contexts/CountryContext';
import { disasterData } from '../data/participation';
import CountrySelect from './CountrySelect';
import HalfPageScroller from './HalfPageScroller';
import { ScrollComponent } from '../constants/types';

const DisasterLineGraph: ScrollComponent = ({ currentStepIndex }) => {
  const country = useCountry();
  return (
    <VictoryChart height={window.innerHeight - 100}>
      <VictoryAxis style={{ axis: { stroke: 'white' } }} />
      {disasterData.map(({ before, after, code }, i) => {
        const isBigDown = before > 60 && after < 50;
        return (
          <VictoryLine
            categories={{ x: ['1990s', '2010s'] }}
            data={[
              { x: '1990s', y: before, code },
              { x: '2010s', y: after, code },
            ]}
            style={{
              data: {
                stroke: ['black', isBigDown ? 'red' : 'grey', code === country ? 'green' : 'grey'][
                  currentStepIndex
                ],
                strokeWidth: [1.5, isBigDown ? 1.5 : 1, code === country ? 4 : 1][currentStepIndex],
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
  const disaster = _.find(disasterData, ['code', country]);
  return (
    <HalfPageScroller Background={DisasterLineGraph}>
      <div>Here's a bunch of lines.</div>
      <div>We can highlight the lines that go down by a whole bunch.</div>
      <div>
        If we consider <CountrySelect />, there is a{' '}
        {disaster.before < disaster.after ? 'drop' : 'rise'} from {_.round(disaster.before, 2)}% to{' '}
        {_.round(disaster.after, 2)}%.
      </div>
    </HalfPageScroller>
  );
};

export default DisasterLineScroller;
