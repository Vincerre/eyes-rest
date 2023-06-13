import React from 'react';
import { render } from 'react-dom';
import { useState, useEffect } from 'react';

const formatTime = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  minutes = String(minutes).padStart(2, '0');
  seconds = String(seconds).padStart(2, '0');
  return `${minutes}:${seconds}`;
};
const App = () => {
  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState('');

  const playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  const start = () => {
    setTime(1200);
    setStatus('work');
    setTimer(
      setInterval(() => {
        setTime((preValue) => preValue - 1);
      }, 1000)
    );
  };

  const stop = () => {
    setTime(0);
    setStatus('off');
    setTimer('');
    clearInterval(timer);
  };

  const close = () => {
    window.close();
  };

  useEffect(() => {
    if (time === 0 && status === 'work') {
      setTime(20);
      setStatus('rest');
      playBell();
    } else if (time === 0 && status === 'rest') {
      setTime(1200);
      setStatus('work');
      playBell();
    }
  }, [time]);

  return (
    <div>
      <h1>Protect your eyes</h1>
      {status === 'off' && (
        <div>
          <p>
            According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to
            rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.
          </p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
      )}
      {status === 'work' && <img src="./images/work.png" />}
      {status === 'rest' && <img src="./images/rest.png" />}
      {status !== 'off' && <div className="timer">{formatTime(time)}</div>}
      {status === 'off' && (
        <button className="btn" onClick={start}>
          Start
        </button>
      )}
      {status !== 'off' && (
        <button className="btn" onClick={stop}>
          Stop
        </button>
      )}
      <button className="btn btn-close" onClick={close}>
        X
      </button>
    </div>
  );
};

render(<App />, document.querySelector('#app'));
