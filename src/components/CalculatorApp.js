import React, {useState} from 'react';
import Display from './Display';
import NumberPad from './NumberPad';
import DisplayContext from '../context/display-context';

function CalculatorApp() {
    //state
    // keeps track of the current display, the default is 0
    const [display, setDisplay] = useState('0');

    return (
        <div>
            <DisplayContext.Provider value={ {display, setDisplay} }>
                <Display />
                <NumberPad />
            </DisplayContext.Provider>
            
        </div>
    );
};

export default CalculatorApp;