import React from 'react';
import _ from 'lodash';
import { VictoryAxis, VictoryChart, VictoryLine } from 'victory';

import participation from '../data/participation_all.json';
import { useCountry } from '../contexts/CountryContext';

const allCountries = new Set(participation.map((d) => d.code));
const data = Array.from(allCountries)
  .map((code) => {
    const countryData = participation.filter((d) => d.code === code);
    const nineties = countryData.filter(({ year }) => year >= 1990 && year < 2000);
    const teens = countryData.filter(({ year }) => year >= 2010 && year < 2020);
    return {
      before: nineties.length ? _.meanBy(nineties, 'participation') : NaN,
      after: teens.length ? _.meanBy(teens, 'participation') : NaN,
      code,
    };
  })
  .filter(({ before, after }) => !_.isNaN(before) && !_.isNaN(after));

const DisasterLineGraph = ({ currentStepIndex }) => {
  const country = useCountry();
  return (
    <VictoryChart height={window.innerHeight - 100}>
      <VictoryAxis style={{ axis: { stroke: 'white' } }} />
      {data.map(({ before, after, code }, i) => {
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
                strokeWidth: [1.5, 1.5, code === country ? 4 : 1][currentStepIndex],
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
