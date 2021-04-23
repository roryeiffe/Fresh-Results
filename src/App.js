import React, { useState, useEffect } from "react";
import './App.css';

import  { MoreInfoWrapper } from './components/moreInfo'
import MoreInfo from './components/moreInfo';
import Threshold from './components/threshold';
import ColorPicker from './components/colorPicker';
import ToggleButton from './components/toggleButton';
import KeywordPage from './components/KeywordPage';

import styles from "./app.module.css";

/*global chrome*/

function App() {
  // The threshold and color values are automatically updated
  // by the components that control them:
  const [threshold, setThreshold] = useState(0);
  const [color, setColor] = useState(null);
  const [customWords, setCustomWords] = useState(null);
  const [page, setPage] = useState('homePage');

  /**
   * This configuration of useEffect is similiar to componentDidMount () 
   * in class components.
   * 
   * When the app loads, we want to read the stored color from local storage, if
   * it exists. Otherwise, use the default color (first color)
   */

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
    // update custom words from local storage, if they are null:
    // NOTE: custom words are grabbed from storage in App.js (Rather than
    // in KeywordPage.js) because KeywordPage isn't rendered until the user navigates
    // to the custom word page, so the value for custom words would be null:
    chrome.storage.sync.get(`custom-words`, (res) => {
      if (Object.prototype.hasOwnProperty.call(res, "custom-words") && customWords == null) {
          // set the word state:
          setCustomWords(res["custom-words"]);
      }
  });
    // if custom words are not defined, set them here:
    if (!customWords) setCustomWords({"default":[]});
    if (!color) setColor("#FF4747");
    // Send a message to the background script with the color
    // and spoiler threshold values only if data is not null:
    if (color !== null && customWords !== null) {
    chrome.runtime.sendMessage({ color: color, threshold: threshold, words: customWords }, function (response) {
      // Log the background's response:
      console.log(response.farewell);
    });}
  }, [color, threshold, customWords]);

  // when custom words are updated, update storage
  const update = (newWords) => {
    setCustomWords(newWords);
    chrome.runtime.sendMessage({ color: color, threshold: threshold, words: customWords }, function (response) {
      // Log the background's response:
      console.log(response.farewell);
    });
  }

  return (
    <div>  {page === 'homePage' ? 
    <div className="App">
      {/* Header */}
      {color}
      {JSON.stringify(customWords)}
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
        <MoreInfoWrapper infoType={'threshold'}><ColorPicker colors={['#FF4747', '#474FFF', '#12A43B', '#E78225', '#A262E2']} update={setColor} /></MoreInfoWrapper>
      </div>
      <div className="feature-container">
        <div className="more-info" id="color-more-info"><MoreInfo infoType={'keywords'}/></div>
        <div className={styles.featureContent}> <u onClick = {()=> setPage('keywordPage')} style={{cursor: 'pointer'}} className='keyword-click '>Add/Edit Keywords!</u> </div>
      </div>
    </div> : 
      <KeywordPage initialWords = {customWords} update = {update} cancelClick = {()=> setPage('homePage')}/>
      
      }
    </div>
  )
}

export default App
