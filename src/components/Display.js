import React, { useContext } from 'react';
import DisplayContext from '../context/display-context';

function Display() {
    // state
    const { display } = useContext(DisplayContext);
    return (
        <div className="page-header">
            <h1 className="page-header__display">
                {display}
            </h1>
        </div>
    );
};

export default Display;