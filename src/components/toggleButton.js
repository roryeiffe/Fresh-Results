import React, { useState, useEffect } from 'react'

/**
 * ToggleButton
 * --------------------------
 * @desc
 * The toggle button is a component
 * that displays whether a functionality
 * is on or off.
 * 
 * The state is toggled by clicking on the button.
 * When the state changes, a callback function is
 * called to act on the state change.
 * 
 * @params
 * [onToggle] => The callback function that is executed
 * when the state of the toggle button is changed.
 */
const ToggleButton = ({ initialValue, onToggle }) => {

    // determine whether the toggle button is on / off
    const [toggleState, setToggleState] = useState(initialValue);

    useEffect(() => {

        // ... do something
        if (onToggle != null) {
            onToggle(toggleState);
        }

    }, [toggleState, onToggle]);

    return (<div className={`toggle-button noselect ${toggleState ? 'toggled' : ''}`} onClick={() => {
        setToggleState(!toggleState);
    }}>
        <div className="toggle-pin noselect" />
        <div className="toggle-text noselect">
            {toggleState ? 'on' : 'off'}
        </div>
    </div>);
}
export default ToggleButton;