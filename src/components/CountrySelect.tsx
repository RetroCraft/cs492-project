import React from 'react';
import Select from 'react-select';
import CountryContext from '../contexts/CountryContext';

import participation from '../data/participation_all.json';
import { iso31661 } from 'iso-3166';
import _ from 'lodash';
const allCountries = Array.from(new Set(participation.map((d) => d.code)));

const CountrySelect = () => {
  const { code, setCode } = React.useContext(CountryContext);
  const options = allCountries.map((c) => ({
    value: c,
    label: _.find(iso31661, ['alpha3', c])?.name,
  }));
  return (
    <Select
      value={options.find((o) => o.value === code)}
      onChange={(o) => setCode(o.value)}
      options={options}
      styles={{
        control: (provided, state) => ({
          ...provided,
          border: 'none',
        }),
      }}
    />
  );
};

export default CountrySelect;
