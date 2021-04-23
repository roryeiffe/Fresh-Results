import './styles/KeywordPage.css';
import React, { useState, useEffect } from "react";

/*global chrome*/

function KeywordPage({cancelClick, update}) {


  const [currentWordGroup, setCurrentWordGroup] = useState('default')
  const [currentMode, setCurrentMode] = useState('edit')
  const [wordGroups, setWordGroups] = useState({'default': ['kills', 'steal', 'dies', 'resurrected' ]})
  const [toBeAddedWordGroup, setToBeAddedWordGroup] = useState('')

  // get words from local storage:
  useEffect(() => {
    // Grab the words from the local state:
    chrome.storage.sync.get(`custom-words`, (res) => {
         {
            console.log(res["custom-words"]);
            // set the word state
            setWordGroups(res["custom-words"]);
            // pass this word group back up to App.js:
            update(res["custom-words"]);
        }
    });
  }, [wordGroups,update]);

  
  const textAreaChange = (event) => {
    let keywords = event.target.value
    keywords = keywords.split(',')
    const wordGroupsCopy = wordGroups
    wordGroupsCopy[currentWordGroup] = keywords
    setWordGroups(wordGroupsCopy)
    // Update state in App.js:
    update(wordGroups);
    // Update local storage:
    chrome.storage.sync.set({ "custom-words": wordGroups });
  }

  const submitWordGroupToBeAdded = () => {
    console.log(toBeAddedWordGroup)
    if (toBeAddedWordGroup.trim() !== '' && !(toBeAddedWordGroup in Object.keys(wordGroups))){
      const wordGroupsCopy = wordGroups
      wordGroupsCopy[toBeAddedWordGroup] = []
      setWordGroups(wordGroupsCopy)
      setCurrentWordGroup(toBeAddedWordGroup)
    }
    setCurrentMode('edit')
    setToBeAddedWordGroup('')
  }
  // console.log(wordGroups[currentWordGroup].join())
   return (
    <div>
      {currentMode === 'edit'? 
      <div className="KeywordPage">
      <div>
        <select id="wordGroups" value = {currentWordGroup} onChange= {(event) => setCurrentWordGroup(event.target.value)}>
            {Object.keys(wordGroups).map(wordGroup => <option key={wordGroup} value={wordGroup}>{wordGroup}</option>)}
        </select>
      </div>
      <label htmlFor="key-text-box">Key words</label>
      <textarea id="key-text-box" onChange= {(event)=> textAreaChange(event)} key={ currentWordGroup } name="w3review" rows="4" cols="50" defaultValue = {wordGroups[currentWordGroup].join()} >
        
      </textarea>
      <button onClick={()=>{setCurrentMode('add')}}>New Keyword Group</button>
      <button onClick={cancelClick}>Back</button>
    </div> : 
    <div className="KeywordPage">
      <label id="key-text-box">Give your word group a name: </label>
      <input placeholder= "Ex: Star Wars" onChange = {(event) => setToBeAddedWordGroup(event.target.value)}/>
      <div>
        <button onClick={submitWordGroupToBeAdded}>Submit</button>
      </div>
    </div>
    }
      
    </div>
  );
}

export default KeywordPage;