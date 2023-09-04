import React from 'react';
import Header from './components/header/header';
import Footer from './components/footer/footer';

const App = ({children} : {children: React.ReactNode}) => {
  return (
    <>
      <Header />
        <main>{children}</main>
      <Footer />
    </>
  );
}

export default App;
