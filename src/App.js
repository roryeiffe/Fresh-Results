import './App.css';
import MoreInfo from './components/moreInfo'
import Threshold from './components/threshold';
import ColorPicker from './components/colorPicker'
import React, { useState } from "react";
import KeywordPage from './components/KeywordPage'
import styles from "./app.module.css";
import ToggleButton from './components/toggleButton';

function App() {

  const [page, setPage] = useState('homePage');
  // make the default custom words, should grab these from local storage in the future:s
  const [customWords, setCustomWords] = useState({'default': ['kills', 'steal', 'dies', 'resurrected' ], 'Star Wars': ['Luke Skywalker', 'Anakin', 'Darth Vader']})

  console.log(customWords);
  return ( 
    <div>
      {page === 'homePage' ? <div className="App">
      <div className="feature-container">
        <div className="more-info" id="threshold-more-info"><MoreInfo infoType={'threshold'}/></div>
        <div className={styles.featureContent} id="threshold-select"><Threshold/></div>
      </div>
      <div className="feature-container">
        <div className="more-info" id="color-more-info"><MoreInfo infoType={'color'}/></div>
        <div className={styles.featureContent} id="color-select"><ColorPicker colors = {['#FF4747', '#474FFF', '#12A43B', '#E78225', '#A262E2']}/></div>
        <ToggleButton
          onToggle={(toggleState) => {
            console.log(`Button toggled! (new state => ${toggleState})`);
          }}
        />
      </div>
      <div className="feature-container">
        <div className="more-info" id="color-more-info"><MoreInfo infoType={'keywords'}/></div>
        <div className={styles.featureContent}> <u onClick = {()=> setPage('keywordPage')} style={{cursor: 'pointer'}} className='keyword-click '>Add/Edit Keywords!</u> </div>
      </div>
    </div> : 
      <KeywordPage cancelClick = {()=> setPage('homePage')}/>
      }
    </div>
  )
}

export default App
