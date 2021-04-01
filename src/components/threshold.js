import React, { useState } from "react";
import styles from "./styles/threshold.module.css";

export default function Threshold() {
  const [threshold, setThreshold] = useState(0);

  const onChange = (e) => {
    let newThreshold = e.target.value
    if (newThreshold >= 0 && newThreshold <= 100) setThreshold(e.target.value)
  };

  const increment = () => {
    setThreshold(Math.min(100,threshold+5))
  }
  const decrement = () => {
    setThreshold(Math.max(0,threshold-5))
  }

  return (
    <div className={styles.body}>
      <p className={styles.Label}>Spoiler Threshold</p>
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
