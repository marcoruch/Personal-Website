import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'

function IconButton({ text, onClick, icon, color, labelPosition }) {
    return text 
    ? <Button labelPosition={labelPosition} icon onClick={onClick}>{text ? text : ''}<Icon color={color} name={icon} /></Button>
    : <Button icon onClick={onClick}>{text ? text : ''}<Icon color={color} name={icon} /></Button>
}

IconButton.propTypes = {
    text: PropTypes.string,
    icon: PropTypes.string,
    color: PropTypes.string,
    labelPosition: PropTypes.string,
    onClick: PropTypes.func,

}

export default IconButton

