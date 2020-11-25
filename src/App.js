import './App.css';
import TimeSelect from "./components/TimeSelect";
import React, {useState} from "react";
import TimeDisplay from "./components/TimeDisplay";


function App() {

  const [timer, setTimer] = useState(0);
  const [breakTimer, setBreakTimer] = useState(0);
  const [currentTimer, setCurrentTimer] = useState('work');

  let changeMode = function () {
    if (currentTimer === 'work'){
      setCurrentTimer('break');
    } else {
      setCurrentTimer('work');
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <p>
          Study time: {timer}
        </p>
        <TimeSelect timer={timer} updateTimer={(newTime) => setTimer(newTime)}/>

        <p>
          Break time: {breakTimer}
        </p>
        <TimeSelect timer={breakTimer} updateTimer={(newTime) => setBreakTimer(newTime)}/>

        {currentTimer === 'work' ? <p>Working hard</p> : <p>Break Time!</p>}

        {currentTimer === 'work' ? <TimeDisplay timer={timer} changeTimerMode={changeMode}/> : <TimeDisplay timer={breakTimer} changeTimerMode={changeMode}/>}

      </header>
    </div>
  );
}

export default App;
