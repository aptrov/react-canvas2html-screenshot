import React from 'react';
import { render } from 'react-dom';
import SnapshotGenerator from './SnapshotGenerator';
import './index.css';

const App = () => (
  <div>
    <SnapshotGenerator />
  </div>
);

render(<App />, document.getElementById('root'));
