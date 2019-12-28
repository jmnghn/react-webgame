import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

import RSPHooks from './RSPHooks';

const Hot = hot(RSPHooks);

ReactDOM.render(<Hot />, document.querySelector('#root'));