import './App.css';

import Threshold from './components/threshold';
import ColorPicker from './components/colorPicker'
import React, { useState } from "react";
import KeywordPage from './components/KeywordPage'

function App() {

  const [page, setPage] = useState('homePage');

  return ( 
    <div>
      {page === 'homePage' ?  <div className="App">
        <Threshold/>
        <ColorPicker colors = {['#FF4747', '#474FFF', '#12A43B', '#E78225', '#A262E2']}/>
        <u onClick = {()=> setPage('keywordPage')} style={{cursor: 'pointer'}} className='keyword-click '>Add/Edit Keywords!</u>
      </div> : 
      <KeywordPage cancelClick = {()=> setPage('homePage')}/>
      }
     
    </div>
  );
}

export default App;
