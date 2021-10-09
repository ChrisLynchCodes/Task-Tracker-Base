import PropTypes from 'prop-types'


// colour, text and onClick are passed down to Button
export const Button = ({ color, text, onClick}) => {
    return (
        <button
            onClick={onClick}
            className="btn"
            style={{ backgroundColor: color }}>
            {text}
        </button>)
}

Button.defaultProps = {
    color:'steelblue'
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}