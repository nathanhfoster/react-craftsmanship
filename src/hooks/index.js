import React from 'react';

const usePrevious = value => {
  let ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export { usePrevious };
