import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import { minutesToDuration } from "../utils/duration";
import Progress from "./Progress";

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [timeRemaining, setTimeRemaining] = useState(25 * 60);
  const [mode, setMode] = useState("focus");
  const [isSessionActive, setIsSessionActive] = useState(false);

  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running
      if (timeRemaining === 0) {
        // new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
        const duration = mode === "focus" ? breakDuration : focusDuration; // select the correct time duration
        setTimeRemaining(duration * 60); // set the time remaining to the new duration;
        setMode((prevMode) => (prevMode === "focus" ? "break" : "focus"));
        return; // return will end the callback function and re-render the component
      }
      setTimeRemaining((currentTimeRemaining) => currentTimeRemaining - 1);
    },
    isTimerRunning ? 100 : null
  );

  // useInterval(callback, duration)

  function playPause() {
    // if the session is false, reset our timeRemaining to default
    if (!isSessionActive) {
      setIsSessionActive(true);
      setTimeRemaining(focusDuration * 60); // should be in seconds
    }
    setIsTimerRunning((prevState) => !prevState);
  }

  // reset everything
  const stopTimer = () => {
    setIsSessionActive(false);
    setIsTimerRunning(false);
    setMode("focus");
  };

  const decreaseFocus = () => {
    setFocusDuration((lastFocus) => Math.max(5, lastFocus - 5)); // take the previous focusDuration value and subtract 5
  };

  const increaseFocus = () => {
    setFocusDuration((lastFocus) => Math.min(60, lastFocus + 5)); // take the previous focusDuration value and add 5
  };

  const decreaseBreak = () => {
    setBreakDuration((lastBreak) => Math.max(1, lastBreak - 1));
  };

  const increaseBreak = () => {
    setBreakDuration((lastBreak) => Math.min(15, lastBreak + 1));
  };

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              {/* TODO: Update this text to display the current focus session duration */}
              Focus Duration: {minutesToDuration(focusDuration)}
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                onClick={decreaseFocus}
                disabled={isSessionActive || isTimerRunning ? true : false} // ternary: condition ? do this : do something else. || means == or && === and
              >
                <span className="oi oi-minus" />
              </button>
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                onClick={increaseFocus}
                disabled={isSessionActive || isTimerRunning ? true : false}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                Break Duration: {minutesToDuration(breakDuration)}
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  onClick={decreaseBreak}
                  disabled={isSessionActive || isTimerRunning ? true : false}
                >
                  <span className="oi oi-minus" />
                </button>
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  onClick={increaseBreak}
                  disabled={isSessionActive || isTimerRunning ? true : false}
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
            <button
              type="button"
              className="btn btn-secondary"
              title="Stop the session"
              onClick={stopTimer}
              disabled={!isSessionActive}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <Progress
        mode={mode}
        isTimerRunning={isTimerRunning}
        timeRemaining={timeRemaining}
        isSessionActive={isSessionActive}
        focusDuration={focusDuration}
        breakDuration={breakDuration}
      />
    </div>
  );
}

export default Pomodoro;
