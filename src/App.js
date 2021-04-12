import './App.css';
import MoreInfo from './components/moreInfo'
import Threshold from './components/threshold';
import ColorPicker from './components/colorPicker';
import ToggleButton from './components/toggleButton';

import styles from "./app.module.css";

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
