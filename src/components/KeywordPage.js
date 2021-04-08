import './styles/KeywordPage.css';
import React, { useState } from "react";

function KeywordPage({cancelClick}) {


  const [currentWordGroup, setCurrentWordGroup] = useState('default')
  const wordGroups = {'default': ['kills', 'steal', 'dies', 'gets rezzed' ], 'Star Wars': ['Luke Skywalker', 'Anakin', 'Darth Vader']}

   return (
    <div className="KeywordPage">
      <div>
        <select id="wordGroups" value = {currentWordGroup} onChange= {(event) => setCurrentWordGroup(event.target.value)}>
            {Object.keys(wordGroups).map(wordGroup => <option key={wordGroup} value={wordGroup}>{wordGroup}</option>)}
        </select>
      </div>
      <label for="key-text-box">Key words</label>
      <textarea id="key-text-box" name="w3review" rows="4" cols="50">
        {wordGroups[currentWordGroup].join()}
      </textarea>
      <button onClick={cancelClick}>Cancel</button>
    </div>
  );
}

export default KeywordPage;