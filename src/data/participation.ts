import participation from './participation_all.json';
import _ from 'lodash';

export const allCountries = new Set(participation.map((d) => d.code));
export const latestData = Array.from(allCountries).reduce((acc, code) => {
  const countryData = participation.filter((d) => d.code === code);
  const latest = _.maxBy(countryData, 'year');
  return {
    ...acc,
    [code]: latest.participation,
  };
}, {});
export const disasterData = Array.from(allCountries)
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

export const highlightableCountries = Array.from(new Set(disasterData.map((d) => d.code)));
