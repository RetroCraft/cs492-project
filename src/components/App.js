import React from 'react';
import { Container } from 'react-bootstrap';
import Article from './Article.mdx';
import CountryContext from '../contexts/CountryContext';

const App = () => {
  const [code, setCode] = React.useState('CAN');
  return (
    <CountryContext.Provider value={{ code, setCode }}>
      <Container fluid className="bg-dark text-secondary px-4 py-5 text-center">
        <h1 className="text-white">CS492 Final Project</h1>
      </Container>
      <Container fluid="sm" className="px-4 py-5">
        <Article />
      </Container>
    </CountryContext.Provider>
  );
};

export default App;
