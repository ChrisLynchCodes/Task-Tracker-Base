import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from '@mui/material/Button';


//export arrow function with props grabbed
export const Header = ({ title, onAdd, showAdd }) => {
    const location = useLocation()

    return (
        <header className='header'>
            <h1 style={headerStyle}>{title}</h1>

            {/* if we are in the root show the button */}
            {location.pathname === '/' && (
                // ternary -if true value, else value
                <Button
                    size={'small'}
                    color={showAdd ? 'error' : 'success'}
                    onClick={onAdd} variant="contained">{showAdd ? 'Close' : 'Add'}
                    
                </Button>)}




        </header>


    )
}

//Using default props and type checking
Header.defaultProps = {
    title: 'Task Tracker'
}
Header.propTypes = {
    title: PropTypes.string.isRequired
}
// CSS in JS
const headerStyle = {
    textAlign: 'center',
    color: '#0E81EA'
}

