import React from 'react';
import Container from 'react-bootstrap/Container'
import Article from './Article';
import CountryContext from '../contexts/CountryContext';

const App = () => {
  const [code, setCode] = React.useState('CAN');
  return (
    <CountryContext.Provider value={{ code, setCode }}>
      <Container fluid className='text-secondary px-4 pt-5 pb-5 text-center head'>
        <div className='pt-4 pb-1'>
          <h1 className='text-white pb-2 pt-5 title'>Where are the women in STEM?</h1>
          <h3 className='text-white subtitle pb-1'>W23 CS 492 Final Project: A Visual Essay</h3>
          <p className='text-white by'>By: James Ah Yong, Mikhail Szugalew, Bradley Herrera Contreras</p>
        </div>
      </Container>
      <Container fluid>
        <div className="px-5 py-5">
          <Article />
        </div>
      </Container>
    </CountryContext.Provider>
  );
};

export default App;
