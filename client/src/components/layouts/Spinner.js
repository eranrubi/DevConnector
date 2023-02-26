import React, { Fragment } from 'react';

const Spinner = () => {
  return (
    <Fragment>
      <img
        src={
          'https://media1.giphy.com/media/VdX6HSsL2NEuHyfSNu/200w.webp?cid=ecf05e47hbcwegg6kvu1q1iicqor6tlr3d766gg3m2nyjxzk&rid=200w.webp&ct=s'
        }
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt='Loading...'
      />
    </Fragment>
  );
};

export default Spinner;
