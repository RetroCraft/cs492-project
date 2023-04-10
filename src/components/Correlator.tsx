import React from 'react';
import _ from 'lodash';
import { VictoryAxis, VictoryChart, VictoryLine, VictoryScatter } from 'victory';

import { useCountry } from '../contexts/CountryContext';
import { cultureData, latestData } from '../data';
import CountrySelect from './CountrySelect';
import HalfPageScroller from './HalfPageScroller';
import { ScrollComponent } from '../constants/types';

const Correlator: ScrollComponent = ({ currentStepIndex }) => {
  const country = useCountry();
  const xAxis = (code) => {
    if (currentStepIndex === 0) {
      return cultureData[code].masculinity;
    } else if (currentStepIndex === 1) {
      return cultureData[code].powerDistance;
    }
  };
  const countries = Object.keys(cultureData).filter(
    (c) => xAxis(c) && latestData[c],
  );
  const data = countries.map((code) => ({ x: xAxis(code), y: latestData[code] }));
  return (
    <VictoryChart height={window.innerHeight - 100}>
      <VictoryScatter data={data} animate={{ duration: 500 }} size={10} />
    </VictoryChart>
  );
};

const CorrelatorScroller = () => {
  const country = useCountry();
  return (
    <HalfPageScroller Background={Correlator}>
      <div>Here's a bunch of lines.</div>
      <div>We can highlight the lines that go down by a whole bunch.</div>
      <div>Woot</div>
    </HalfPageScroller>
  );
};

export default CorrelatorScroller;
