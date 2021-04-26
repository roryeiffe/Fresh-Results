import React from 'react'

const Button = ({ text, onClick, background, textColor }) => {

    return (<div
        style={{
            backgroundColor: background,
            color: textColor
        }}
        className="sb-button"
        onClick={() => onClick()}>
        {text}
    </div>)
}

export default Button;