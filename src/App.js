import './App.css';
import SnowWrapper from './components/SnowWrapper';

//Main app Component, using a wrapper to clean things up.

function App() {
  return (
    <div className="app-container">
          <header className="App-header">
              <h1>SnowTracks</h1>
          </header>
          <SnowWrapper>
          </SnowWrapper>
          <footer>
              <h4>Jackson Fuller's Capstone Project</h4>
              <h5>Red Rocks Community College - 2023</h5>
          </footer>
    </div>
  );
}

export default App;
