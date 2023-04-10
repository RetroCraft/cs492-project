import participation from './participation_all.json';
import culture from './culture.json';
import _ from 'lodash';
import { iso31661 } from 'iso-3166';

export const allCountries = _.sortBy(
  _.uniq(participation.map((d) => d.code)),
  (code) => iso31661.find((d) => d.alpha3 === code).name,
);
export const latestData = allCountries.reduce((acc, code) => {
  const countryData = participation.filter((d) => d.code === code);
  const latest = _.maxBy(countryData, 'year');
  return {
    ...acc,
    [code]: latest.participation,
  };
}, {});
export const disasterData = _.fromPairs(
  allCountries
    .map((code) => {
      const countryData = participation.filter((d) => d.code === code);
      const nineties = countryData.filter(({ year }) => year >= 1990 && year < 2000);
      const teens = countryData.filter(({ year }) => year >= 2010 && year < 2020);
      return [
        code,
        {
          before: nineties.length ? _.meanBy(nineties, 'participation') : NaN,
          after: teens.length ? _.meanBy(teens, 'participation') : NaN,
          code,
        },
      ];
    })
    .filter(([code, { before, after }]) => !_.isNaN(before) && !_.isNaN(after)),
);
export const cultureData = _.fromPairs(culture.map((d) => [d.code, d]));

export const highlightableCountries = allCountries.filter(
  (code) => disasterData[code] && cultureData[code],
);
