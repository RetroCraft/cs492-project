import _ from 'lodash';
import React from 'react';
import BootstrapButton from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { VictoryAxis, VictoryChart, VictoryScatter, VictoryVoronoiContainer } from 'victory';

import { ScrollComponent } from '../constants/types';
import { useCountry } from '../contexts/CountryContext';
import {
  allCountries,
  allData,
  codeToName,
  cultureData,
  indicators,
  latestData,
  regions,
} from '../data';
import CountrySelect from './CountrySelect';
import HalfPageScroller from './HalfPageScroller';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const colors = {
  Europe: '#1f77b4',
  'Asia & Pacific': '#ff7f0e',
  'South/Latin America': '#2ca02c',
  'Arab States': '#d62728',
  'North America': '#9467bd',
  Africa: '#8c564b',
  'Middle east': '#e377c2',
};

const dataExtractors = {
  // cultural dimensions
  powerDistance: {
    name: 'Power Distance',
    description: 'Higher values indicate a stronger power hierarchy',
    get: (code) => cultureData[code]?.powerDistance,
  },
  individuality: {
    name: 'Individuality',
    description: 'Higher values indicate looser ties with family and community',
    get: (code) => cultureData[code]?.individuality,
  },
  masculinity: {
    name: 'Masculinity',
    description:
      'Higher values indicate stereotypically masculine culture (hero-worshipping, achievement-centric, etc.)',
    get: (code) => cultureData[code]?.masculinity,
  },
  uncertaintyAvoidance: {
    name: 'Uncertainty Avoidance',
    description: 'Higher values indicate a culture that is more risk-averse',
    get: (code) => cultureData[code]?.uncertaintyAvoidance,
  },
  timeOrientation: {
    name: 'Time Orientation',
    description: 'Higher values indicate a culture that is more long-term oriented',
    get: (code) => cultureData[code]?.timeOrientation,
  },
  indulgence: {
    name: 'Indulgence',
    description: 'Higher values indicate a culture that is more hedonistic',
    get: (code) => cultureData[code]?.indulgence,
  },

  latest: {
    name: 'Graduates/students (%)',
    description: 'Latest graduates data from any source',
    get: (code) => latestData[code],
  },
  latestWorldBank: {
    name: 'STEM graduates (%, c. 2018)',
    description: 'Latest World Bank data',
    get: (code) =>
      _.maxBy(_.filter(allData[code], ['citation', 'World Bank']), 'year')?.participation,
  },
  earliestWorldBank: {
    name: 'STEM graduates (%, c. 2000)',
    description: 'Earliest World Bank data',
    get: (code) =>
      _.minBy(_.filter(allData[code], ['citation', 'World Bank']), 'year')?.participation,
  },
  delta: {
    name: 'Change in STEM graduates (p.p.)',
    description: 'Difference between latest and earliest World Bank data',
    get: (code) =>
      _.maxBy(_.filter(allData[code], ['citation', 'World Bank']), 'year')?.participation -
      _.minBy(_.filter(allData[code], ['citation', 'World Bank']), 'year')?.participation,
  },
  handpicked: {
    name: 'CS/Math students (%, c. 2000)',
    description: 'National and institutional data hand-curated by Galpin (2002)',
    get: (code) => _.maxBy(_.filter(allData[code], ['citation', 'Galpin']), 'year')?.participation,
  },
  unesco: {
    name: 'CS/Math graduates (%, c. 1997, UNESCO)',
    description: 'National data from UNESCO (1998)',
    get: (code) => _.find(allData[code], ['citation', 'UNESCO'])?.participation,
  },
  eu: {
    name: 'CS/Math students (%, c. 1998)',
    description: 'National data from the European Union',
    get: (code) => _.find(allData[code], ['citation', 'EU'])?.participation,
  },

  population: {
    name: 'Population',
    description: 'Population on a log scale (World Bank, 2021)',
    get: (code) => Math.log(indicators[code]?.population),
  },
  gdp: {
    name: 'GDP',
    description: 'GDP on a log scale (World Bank, 2021)',
    get: (code) => Math.log(indicators[code]?.gdp),
  },
  gdpPerCapita: {
    name: 'GDP per capita',
    description: '(World Bank, 2021)',
    get: (code) => indicators[code]?.gdpPerCapita / 1000,
  },
};

const CorrelatorPlayground = React.createContext({
  xAxis: 'masculinity',
  setXAxis: (_) => {},
  yAxis: 'latestWorldBank',
  setYAxis: (_) => {},
  sizing: 'population',
  setSizing: (_) => {},
});

const Correlator: ScrollComponent = ({ currentStepIndex }) => {
  const country = useCountry();
  const { xAxis, yAxis, sizing } = React.useContext(CorrelatorPlayground);
  const X = ['masculinity', 'powerDistance', xAxis][currentStepIndex];
  const Y = ['latestWorldBank', 'latestWorldBank', yAxis][currentStepIndex];
  const S = ['population', 'population', sizing][currentStepIndex];
  const data = allCountries
    .map((code) => ({
      x: dataExtractors[X].get(code),
      y: dataExtractors[Y].get(code),
      amount: dataExtractors[S].get(code),
      code,
    }))
    .filter(({ x, y, amount }) => x && y && amount);

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
      <VictoryScatter
        data={data}
        style={{ data: { fill: ({ datum }) => colors[regions[datum.code]] } }}
        animate={{ duration: 500 }}
        bubbleProperty="amount"
        maxBubbleSize={25}
        minBubbleSize={5}
      />
    </VictoryChart>
  );
};

const Button = ({ x = false, y = false, s = false, value }) => {
  const { xAxis, setXAxis, yAxis, setYAxis, sizing, setSizing } =
    React.useContext(CorrelatorPlayground);
  const isSelected = (x && xAxis === value) || (y && yAxis === value) || (s && sizing === value);
  const update = (x && setXAxis) || (y && setYAxis) || setSizing;
  return (
    <OverlayTrigger
      placement="right"
      overlay={<Tooltip>{dataExtractors[value].description}</Tooltip>}
    >
      <BootstrapButton
        variant={isSelected ? 'primary' : 'outline-primary'}
        size="sm"
        onClick={() => update(value)}
      >
        {dataExtractors[value].name}
      </BootstrapButton>
    </OverlayTrigger>
  );
};

const CorrelatorScroller = () => {
  const country = useCountry();
  const [xAxis, setXAxis] = React.useState('masculinity');
  const [yAxis, setYAxis] = React.useState('latestWorldBank');
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
            {/* {'  '}
            <ButtonGroup vertical>
              <Button x value="masculinity" />
              <Button x value="powerDistance" />
              <Button x value="individuality" />
              <Button x value="uncertaintyAvoidance" />
              <Button x value="timeOrientation" />
              <Button x value="indulgence" />
            </ButtonGroup> */}
          </p>
          <p>
            Female participation rates:{' '}
            <ButtonGroup vertical>
              <Button y value="latest" />
              <Button y value="latestWorldBank" />
              <Button y value="earliestWorldBank" />
              <Button y value="delta" />
              <Button y value="handpicked" />
              <Button y value="unesco" />
              <Button y value="eu" />
            </ButtonGroup>
          </p>
          <p>
            Dot sizes:{' '}
            <ButtonGroup>
              <Button s value="population" />
              <Button s value="gdp" />
              <Button s value="gdpPerCapita" />
            </ButtonGroup>
          </p>
        </div>
      </HalfPageScroller>
    </CorrelatorPlayground.Provider>
  );
};

export default CorrelatorScroller;
