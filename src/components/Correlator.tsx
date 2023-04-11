import _ from 'lodash';
import React from 'react';
import BootstrapButton from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { VictoryAxis, VictoryChart, VictoryScatter, VictoryVoronoiContainer } from 'victory';

import { ScrollComponent } from '../constants/types';
import { useCountry } from '../contexts/CountryContext';
import { allCountries, allData, codeToName, cultureData, latestData } from '../data';
import CountrySelect from './CountrySelect';
import HalfPageScroller from './HalfPageScroller';

const dataExtractors = {
  // cultural dimensions
  powerDistance: {
    name: 'Power Distance',
    get: (code) => cultureData[code]?.powerDistance,
  },
  individuality: { name: 'Individuality', get: (code) => cultureData[code]?.individuality },
  masculinity: { name: 'Masculinity', get: (code) => cultureData[code]?.masculinity },
  uncertaintyAvoidance: {
    name: 'Uncertainty Avoidance',
    get: (code) => cultureData[code]?.uncertaintyAvoidance,
  },
  timeOrientation: { name: 'Time Orientation', get: (code) => cultureData[code]?.timeOrientation },
  indulgence: { name: 'Indulgence', get: (code) => cultureData[code]?.indulgence },

  latest: { name: 'Participation (%, latest)', get: (code) => latestData[code] },
  latestWorldBank: {
    name: 'STEM graduates (%, c. 2018, World Bank)',
    get: (code) => latestData[code],
  },
  earliestWorldBank: {
    name: 'STEM graduates (%, c. 2000, World Bank)',
    get: (code) => _.minBy(_.filter(allData[code], ['citation', 'World Bank']), 'year')?.participation,
  },
  handpicked: {
    name: 'CS/Math students (%, c. 2000, handpicked)',
    get: (code) => _.maxBy(_.filter(allData[code], ['citation', 'Galpin']), 'year')?.participation,
  },
  unesco: {
    name: 'CS/Math graduates (%, c. 1997, UNESCO)',
    get: (code) => _.find(allData[code], ['citation', 'UNESCO'])?.participation,
  },
  eu: {
    name: 'CS/Math students (%, c. 1998, EU)',
    get: (code) => _.find(allData[code], ['citation', 'EU'])?.participation,
  },

  population: { name: 'Population', get: (code) => latestData[code] },
  gdpPerCapita: { name: 'GDP per capita', get: (code) => latestData[code] },
};

const CorrelatorPlayground = React.createContext({
  xAxis: 'masculinity',
  setXAxis: (_) => {},
  yAxis: 'latest',
  setYAxis: (_) => {},
  sizing: 'population',
  setSizing: (_) => {},
});

const Correlator: ScrollComponent = ({ currentStepIndex }) => {
  const country = useCountry();
  const { xAxis, yAxis, sizing } = React.useContext(CorrelatorPlayground);
  const X = ['masculinity', 'powerDistance', xAxis][currentStepIndex];
  const Y = ['latest', 'latest', yAxis][currentStepIndex];
  const data = allCountries
    .map((code) => ({ x: dataExtractors[X].get(code), y: dataExtractors[Y].get(code), code }))
    .filter(({ x, y }) => x && y);
  return (
    <VictoryChart
      height={window.innerHeight * 0.9}
      width={window.innerWidth * 0.4}
      containerComponent={
        <VictoryVoronoiContainer
          labels={({ datum }) =>
            `${codeToName[datum.code]}\n${_.round(datum.x, 2)}, ${_.round(datum.y, 1)}%`
          }
        />
      }
    >
      <VictoryAxis label={dataExtractors[X].name} />
      <VictoryAxis dependentAxis label={dataExtractors[Y].name} />
      <VictoryScatter data={data} animate={{ duration: 500 }} />
    </VictoryChart>
  );
};

const Button = ({ children = null, x = false, y = false, s = false, value }) => {
  const { xAxis, setXAxis, yAxis, setYAxis, sizing, setSizing } =
    React.useContext(CorrelatorPlayground);
  const isSelected = (x && xAxis === value) || (y && yAxis === value) || (s && sizing === value);
  const update = (x && setXAxis) || (y && setYAxis) || setSizing;
  return (
    <BootstrapButton
      variant={isSelected ? 'primary' : 'outline-primary'}
      size="sm"
      onClick={() => update(value)}
    >
      {children || dataExtractors[value].name}
    </BootstrapButton>
  );
};

const CorrelatorScroller = () => {
  const country = useCountry();
  const [xAxis, setXAxis] = React.useState('masculinity');
  const [yAxis, setYAxis] = React.useState('latest');
  const [sizing, setSizing] = React.useState('population');
  return (
    <CorrelatorPlayground.Provider value={{ xAxis, setXAxis, yAxis, setYAxis, sizing, setSizing }}>
      <HalfPageScroller Background={Correlator} textWidth={6}>
        <div>Here's a bunch of lines.</div>
        <div>We can highlight the lines that go down by a whole bunch.</div>
        <div>
          <p>See if you can find an interesting correlation:</p>
          <p>
            National indicators:{' '}
            <ButtonGroup vertical>
              <Button x value="masculinity" />
              <Button x value="powerDistance" />
              <Button x value="individuality" />
              <Button x value="uncertaintyAvoidance" />
              <Button x value="timeOrientation" />
              <Button x value="indulgence" />
            </ButtonGroup>
            {'  '}
            <ButtonGroup vertical>
              <Button x value="masculinity" />
              <Button x value="powerDistance" />
              <Button x value="individuality" />
              <Button x value="uncertaintyAvoidance" />
              <Button x value="timeOrientation" />
              <Button x value="indulgence" />
            </ButtonGroup>
          </p>
          <p>
            Female participation rates:{' '}
            <ButtonGroup vertical>
              <Button y value="latest" />
              <Button y value="latestWorldBank" />
              <Button y value="earliestWorldBank" />
              <Button y value="handpicked" />
              <Button y value="unesco" />
              <Button y value="eu" />
            </ButtonGroup>
          </p>
          <p>
            Dot sizes:{' '}
            <ButtonGroup vertical>
              <Button s value="population" />
              <Button s value="gdpPerCapita" />
            </ButtonGroup>
          </p>
        </div>
      </HalfPageScroller>
    </CorrelatorPlayground.Provider>
  );
};

export default CorrelatorScroller;
