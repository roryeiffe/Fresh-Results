import './App.css';

import Threshold from './components/threshold';
import ColorPicker from './components/colorPicker';
import ToggleButton from './components/toggleButton';

function App() {
  return (
    <div className="App">
      <Threshold />
      <ColorPicker colors={['#FF4747', '#474FFF', '#12A43B', '#E78225', '#A262E2']} />
      <div style={{
        marginTop: '20px'
      }}>
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
