import React, {useState} from 'react';

function Toggle() {
    const [isOn, setIsOn] = useState(false);
    const handleToggle = () => {
        setIsOn(!isOn);
    };

    return (
        <div>
            <p>The button is {isOn ? "ON" : "OFF"}</p>
            <button onClick={handleToggle}>
                {isOn ? "Turn OFF" : "Turn ON"}
            </button>
        </div>
    );
}

export default Toggle;
