import '../App.css';
import React, {useEffect, useState} from "react";
import useSound from 'use-sound';
import notif from './notif.wav';
import '../fontawesome-free-5.15.1-web/css/all.css';
import Button from "@material-ui/core/Button";


function TimeDisplay(props) {

    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const [ticking, setTicking] = useState(false);

    const [currentMinutes, setCurrentMinutes] = useState(0);
    const [currentSeconds, setCurrentSeconds] = useState(0);

    const [endTime, setEndTime] = useState(Date.now());

    const [play, { stop }] = useSound(notif);

    const goal = new Map();
    goal.set('minutes',  0);
    goal.set('seconds', 0);

    const [testObj, setTestObj] = useState(goal);


    useEffect(() => {
        setTicking(false)
        setSeconds(props.timer % 60);
        setMinutes((props.timer - props.timer % 60) / 60);
        setEndTime(Date.now() + minutes*60000 + seconds*1000);
    }, [props.timer])


    useEffect(() => {
        const interval = setInterval(() => {
            let rightNow = Date.now();
            setCurrentMinutes(Math.floor(((endTime - rightNow ) % (1000 * 60 * 60)) / (1000 * 60)));
            setCurrentSeconds(Math.floor(((endTime - rightNow ) % (1000 * 60)) / 1000));
        }, 50);
        return () => clearInterval(interval);
    }, [endTime]);


    useEffect(() => {
        if (ticking === true && currentSeconds === 0 && currentMinutes === 0) {
            setTicking(false);
            play()
            props.changeTimerMode();
        }
    }, [currentMinutes, currentSeconds, props, ticking]);



    let start = function () {
        let now = Date.now();
        setCurrentMinutes(Math.floor(((endTime - now ) % (1000 * 60 * 60)) / (1000 * 60)));
        setCurrentSeconds(Math.floor(((endTime - now ) % (1000 * 60)) / 1000));
        setEndTime(now + minutes*60000 + seconds*1000);
        setTicking(true);
        setSeconds(props.timer % 60);
        setMinutes((props.timer - props.timer % 60) / 60);
    }

    let stopTimer = function () {
        setTicking(false)
        setSeconds(currentSeconds);
        setMinutes(currentMinutes);
        stop();
    }

    let reset = function () {
        setTicking(false);
        setSeconds(props.timer % 60);
        setMinutes((props.timer - props.timer % 60) / 60);
    }

    let display = function () {
        if (ticking) {
            return (
                <p>
                    {currentMinutes} : {currentSeconds.toString().padStart(2, '0')}
                </p>
            )
        }
        else {
            return (
                <p>
                    {minutes} : {seconds.toString().padStart(2, '0')}
                </p>
            )
        }
    }

    let buttons = function () {
        if (minutes === 0 && seconds === 0) {
            return null;
        } else {
            if (ticking) {
                return (<p><Button variant="contained" onClick={stopTimer}><i className="fas fa-stop"></i></Button></p>)
            } else {
                return (
                    <p>
                        <Button variant="contained" onClick={start}><i className="fas fa-play"></i></Button>
                        <Button variant="contained" onClick={reset}><i className="fas fa-redo"></i></Button>
                    </p>
                )
            }
        }
    }

    return (
        <div className="App">

            {display()}
            {buttons()}

            {testObj}
        </div>
    );
}

export default TimeDisplay;
