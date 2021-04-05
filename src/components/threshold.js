import React, { useState } from "react";
import styles from "./styles/threshold.module.css";

// The Threshold component allows the user to adjust
// the spoiler threshold. All webpages that report
// a likelihood of spoilers that are above this
// threshold will be blocked. For example, if the
// threshold is 50%, a website that has a 60% likelihood 
// of containing spoilers will be blocked.
// Usage: <Threshold/>
export default function Threshold() {
  // Initialize the threshold to be 0 (block websites)
  // with any chance of containing spoilers:
  const [threshold, setThreshold] = useState(0);

  // When user changes input, make sure that the value
  // is between 0 and 100, and then update. 
  const onChange = (e) => {
    // convert string to integer:
    let newThreshold = parseInt(e.target.value,10);
    console.log(newThreshold);
    if (newThreshold >= 0 && newThreshold <= 100) setThreshold(newThreshold)
  };

  // Increment the threshold by 5, ensure that
  // it does not surpass 100
  const increment = () => {
    let newThreshold = threshold + 5;
    setThreshold(Math.min(100,newThreshold))
  }
  // Decrement the threshold by 5, ensure that
  // it does not go below 0
  const decrement = () => {
    setThreshold(Math.max(0,threshold-5))
  }

  return (
    <div className={styles.body}>
      <p className={styles.label}>Spoiler Threshold</p>
      <input
        type="number"
        max="100"
        min="0"
        step = "5"
        value={threshold}
        onChange={onChange}
        className={styles.input}
      ></input>
      <p className = {styles.percentSign}>
        %
      </p>
      <div className={styles.arrows}>
        <div className = {styles.arrowUp} onClick={() => increment()}></div>
        <div className = {styles.arrowDown} onClick={() => decrement()}></div>
      </div>
    </div>
  );
}
