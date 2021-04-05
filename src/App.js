import './App.css';
import MoreInfo from './components/MoreInfo'
import Threshold from './components/threshold';
import ColorPicker from './components/colorPicker'

function App() {
  return (
    <div className="App">
      <Threshold/>
      <ColorPicker colors = {['#FF4747', '#474FFF', '#12A43B', '#E78225', '#A262E2']}/>
    </div>
  );
}

export default App;
