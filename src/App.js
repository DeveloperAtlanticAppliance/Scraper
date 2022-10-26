import './App.css';
import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Scraper from './js/pages/scraper';

import { DatePicker } from 'antd';
import 'antd/dist/antd.css';


function App() {
  return (

    <div className="App">
      <header className="App-header">
        <Suspense fallback={(<div>Loading...</div>)}>
          <Router>
            <Routes>
              <Route exact path="/api" element={<Scraper />} />
            </Routes>
          </Router>
        </Suspense>
      </header>
    </div>
  );
}

export default App;
