import React, { useState } from "react";
import './App.css';
import MoreInfo from './components/moreInfo'
import Threshold from './components/threshold';
import ColorPicker from './components/colorPicker';
import ToggleButton from './components/toggleButton';

import styles from "./app.module.css";

/*global chrome*/

function App() {
  // The threshold and color values are automatically updated
  // by the components that control them:
  const [threshold, setThreshold] = useState(0);
  const [color, setColor] = useState('red');

  // Send a message to the background script with the color
  // and spoiler threshold values:
  chrome.runtime.sendMessage({color: color, threshold:threshold}, function(response) {
    // Log the background's response:
    console.log(response.farewell);
  });

  return (
    <div className="App">
      <div className="feature-container">
        <div className="more-info" id="threshold-more-info"><MoreInfo infoType={'threshold'}/></div>
        <div className={styles.featureContent} id="threshold-select"><Threshold update = {setThreshold}/></div>
      </div>
      <div className="feature-container">
        <div className="more-info" id="color-more-info"><MoreInfo infoType={'color'}/></div>
        <div className={styles.featureContent} id="color-select"><ColorPicker colors = {['#FF4747', '#474FFF', '#12A43B', '#E78225', '#A262E2']} update = {setColor}/></div>
        <ToggleButton
          onToggle={(toggleState) => {
            console.log(`Button toggled! (new state => ${toggleState})`);
          }}
        />
      </div>
    </div>
  );
}

export default App;
