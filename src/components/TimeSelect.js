import '../App.css';
import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";


function TimeSelect(props) {

    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);


    let updateTime = function () {
        const time = minutes * 60 + seconds;
        props.updateTimer(time);
    }

    updateTime();

    let updateMinutes = function (e) {
        setMinutes(parseInt(e.target.value));
    }

    let updateSeconds = function (e) {
        setSeconds(parseInt(e.target.value));
    }


    /*return (
        <div className="App">
            <p>
                <label>Choose a time: </label>
                <input type="number" min="0" max="10000" value={minutes} onChange={e => {updateMinutes(e)}}/>
                <input type="number" min="0" max="30" value={seconds} step="30" onChange={e => {updateSeconds(e)}}/>
            </p>
        </div>
    );*/

    return (
        <div className="App">
            <p>Set a time</p>
            <p>
                <TextField
                    id="standard-number"
                    label="Minutes"
                    type="number"
                    min="0"
                    value={minutes}
                    onChange={e => {updateMinutes(e)}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <TextField
                    id="standard-number"
                    label="Seconds"
                    type="number"
                    min="0"
                    step="30"
                    value={seconds}
                    onChange={e => {updateSeconds(e)}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
            </p>
        </div>
    );
}

export default TimeSelect;
