import React, { useState, useEffect, useContext } from 'react';
import DisplayContext from '../context/display-context';
// Decimal used to avoid inexact floating point numbers
import Decimal from 'decimal.js';

function NumberPad() {
    // constants
    const convert_percent = 0.01;

    // state
    const { setDisplay } = useContext(DisplayContext)
    const [operandOne, setOperandOne] = useState('0');  
    const [operator, setOperator] = useState(undefined);
    const [operandTwo, setOperandTwo] = useState(undefined);
    const [controlling, setControlling] = useState('one');

    // lifecycle methods
    // change display whenever operandOne/operandTwo is in control and changes
    useEffect(() => {
        setDisplay(operandOne);
    }, [operandOne]);
    useEffect(() => {
        if (operandTwo) {   // only change display for operandTwo if it's in control and exists (so cleared values don't affect display)
            setDisplay(operandTwo);
        };
    }, [operandTwo]);
    const clearAll = () => {
        setOperandOne('0');   // default display value
        setOperator(undefined);
        setOperandTwo(undefined);
        setControlling('one');
    };
    const onSignChange = () => {
        if (controlling === 'one' || controlling === 'operator' || controlling === 'reset') {
            const numAnswer = Decimal(operandOne).mul(-1);
            setOperandOne(numAnswer.toString());
        } else {
            const numAnswer = Decimal(operandTwo).mul(-1);
            setOperandTwo(numAnswer.toString());
        };
    };
    const onConvertPercent = () => {
        if (controlling === 'one' || controlling === 'operator' || controlling === 'reset') {
            const numAnswer = Decimal(operandOne).mul(convert_percent);
            setOperandOne(numAnswer.toString());
        } else {
            const numAnswer = Decimal(operandTwo).mul(convert_percent);
            setOperandTwo(numAnswer.toString());
        };
    };
    const onOperatorChange = (e) => {
        // acts as an equal sign when all 3 variables already exist
        if (operator && operandTwo) {
            // perform operation
            if (operator === 'divide') {
                const numAnswer = Decimal(operandOne).div(Decimal(operandTwo));
                setOperandOne(numAnswer.toString());
            } else if (operator === 'multiply') {
                const numAnswer = Decimal(operandOne).mul(Decimal(operandTwo));
                setOperandOne(numAnswer.toString());
            } else if (operator === 'add') {
                const numAnswer = Decimal(operandOne).plus(Decimal(operandTwo));
                setOperandOne(numAnswer.toString());
            } else {
                const numAnswer = Decimal(operandOne).sub(Decimal(operandTwo));
                setOperandOne(numAnswer.toString());
            };
        };
        setOperator(e.currentTarget.value);
        setOperandTwo(undefined);   // clear the previous operandTwo
        setControlling('operator');
    };
    const onNumberChange = (e) => {
        const value = e.currentTarget.value;
        // number pressed after equation should reset display
        if (controlling === 'reset') {
            setOperandOne(value);
            setControlling('one');
        } else if (controlling === 'one') {
            if (operandOne === '0') {
                setOperandOne(value);
            } else {    // 2 digit operand
                setOperandOne(operandOne + value);
            }
        } else {
            setControlling('two');
            // 2 digit operand
            if (operandTwo) {
                setOperandTwo(operandTwo + value);
            } else {
            // set new operand
                setOperandTwo(value);
            };
        };
    };
    const onSetDecimal = () => {
        if (controlling === 'reset') {
            setOperandOne('0' + '.');
            setControlling('one');
        } else if (controlling === 'one' && !(operandOne.includes('.'))) {
            setOperandOne(operandOne + '.');
        } else if (controlling === 'operator') {
            setOperandTwo('0' + '.')
        } else if (controlling === 'two' && !(operandTwo.includes('.'))) {
            setOperandTwo(operandTwo + '.');
        };
    };
    const onEquate = () => {
        // numbers pressed afterwards should reset display
        setControlling('reset');
        // avoid NaN display
        if (operator && operandTwo) {
            // perform operation
            if (operator === 'divide') {
                const numAnswer = Decimal(operandOne).div(Decimal(operandTwo));
                setOperandOne(numAnswer.toString());
            } else if (operator === 'multiply') {
                const numAnswer = Decimal(operandOne).mul(Decimal(operandTwo));
                setOperandOne(numAnswer.toString());
            } else if (operator === 'add') {
                const numAnswer = Decimal(operandOne).plus(Decimal(operandTwo));
                setOperandOne(numAnswer.toString());
            } else {
                const numAnswer = Decimal(operandOne).sub(Decimal(operandTwo));
                setOperandOne(numAnswer.toString());
            };
            setOperator(undefined);
            setOperandTwo(undefined);
        };
    };
    return (
        <div>
            <button className="button" onClick={clearAll}>AC
            </button>
            <button className="button" onClick={onSignChange}>+/-
            </button>
            <button className="button" onClick={onConvertPercent}>%
            </button>
            <button className="button-operation" value="divide" onClick={onOperatorChange}>÷
            </button>
            <button className="button" value="7" onClick={onNumberChange}>7
            </button>
            <button className="button" value="8" onClick={onNumberChange}>8
            </button>
            <button className="button" value="9" onClick={onNumberChange}>9
            </button>
            <button className="button-operation" value="multiply" onClick={onOperatorChange}>x
            </button>
            <button className="button" value="4" onClick={onNumberChange}>4
            </button>
            <button className="button" value="5" onClick={onNumberChange}>5
            </button>
            <button className="button" value="6" onClick={onNumberChange}>6
            </button>
            <button className="button-operation" value="subtract" onClick={onOperatorChange}>-
            </button>
            <button className="button" value="1" onClick={onNumberChange}>1
            </button>
            <button className="button" value="2" onClick={onNumberChange}>2
            </button>
            <button className="button" value="3" onClick={onNumberChange}>3
            </button>
            <button className="button-operation" value="add" onClick={onOperatorChange}>+
            </button>
            <button className="button-0" value="0" onClick={onNumberChange}>0
            </button>
            <button className="button" onClick={onSetDecimal}>.
            </button>
            <button className="button-operation" value="equate" onClick={onEquate}>=
            </button>
        </div>
    );
};

export default NumberPad;