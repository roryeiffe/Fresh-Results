import React, { useState, useEffect } from "react";
import './App.css';
import  { MoreInfoWrapper } from './components/moreInfo'
import Threshold from './components/threshold';
import ColorPicker from './components/colorPicker';
import ToggleButton from './components/toggleButton';

// import styles from "./app.module.css";

/*global chrome*/

function App() {
  // The threshold and color values are automatically updated
  // by the components that control them:
  const [threshold, setThreshold] = useState(0);
  const [color, setColor] = useState(null);

  /**
   * This configuration of useEffect is similiar to componentDidMount () 
   * in class components.
   * 
   * When the app loads, we want to read the stored color from local storage, if
   * it exists. Otherwise, use the default color (first color)
   */
  useEffect(() => {

    // TODO on load, request the color from the
    // background script

  }, []);

  /**
   * useEffect
   * docs => https://reactjs.org/docs/hooks-effect.html
   * useEffect allows the execution of functions after a state change.
   *
   * In this case, the anonymous function defined as the first parameter
   * of useEffect will be executed anytime the [color] state variable
   * changes.
   *
   * The 2nd argument is a dependency list, which states all variables that
   * will be state changes will be listened for.
   */
  useEffect(() => {

    // Send a message to the background script with the color
    // and spoiler threshold values:
    chrome.runtime.sendMessage({ color: color, threshold: threshold }, function (response) {
      // Log the background's response:
      console.log(response.farewell);
    });

  }, [color, threshold]);

  return (
    <div className="App">

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', borderBottom: `1px solid rgba(0, 0, 0, 0.2)`, padding: `10px 10px` }}>
        {/* TODO put logo here */}
        <div style={{ width: '30px', height: '30px', backgroundColor: `rgba(0, 0, 0, 0.3)`, marginRight: '10px' }} />
        <div style={{ fontWeight: 'bold', transform: `translateY(-2px)` }}>SpoilerBlock</div>

      </div>

      {/* Toggle Disable / Enable */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: `10px 10px`, borderBottom: `1px solid rgba(0, 0, 0, 0.2)`, alignItems: 'center' }}>
        <div style={{ transform: `translateY(-2px)` }}>Toggle Disable / Enable</div>
        <ToggleButton
          onToggle={(toggleState) => {
            console.log(`Button toggled! (new state => ${toggleState})`);
          }}
        />
      </div>

      <div>
        <MoreInfoWrapper infoType={'threshold'}><Threshold update={setThreshold} /></MoreInfoWrapper>
        <MoreInfoWrapper infoType={'threshold'}><ColorPicker initial={color} colors={['#FF4747', '#474FFF', '#12A43B', '#E78225', '#A262E2']} update={setColor} /></MoreInfoWrapper>
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
