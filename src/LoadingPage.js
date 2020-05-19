import React from 'react';
import { Spinner } from 'reactstrap';

function LoadingPage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner />
    </div>
  );
}

export default LoadingPage;
