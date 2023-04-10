import React from 'react';
import Select from 'react-select';
import CountryContext from '../contexts/CountryContext';
import { iso31661 } from 'iso-3166';
import _ from 'lodash';
import { highlightableCountries } from '../data';

const CountrySelect = () => {
  const { code, setCode } = React.useContext(CountryContext);
  const options = highlightableCountries.map((c) => ({
    value: c,
    label: _.find(iso31661, ['alpha3', c])?.name,
  }));
  return (
    <Select
      value={options.find((o) => o.value === code)}
      onChange={(o) => setCode(o.value)}
      options={options}
      styles={{
        container: (provided) => ({
          ...provided,
          display: 'inline-block',
        }),
      }}
    />
  );
};

export default CountrySelect;
