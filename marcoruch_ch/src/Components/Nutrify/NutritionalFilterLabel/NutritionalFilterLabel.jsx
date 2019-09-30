import React from 'react'
import PropTypes from 'prop-types'
import { Label } from 'semantic-ui-react'


function NutritionalFilterLabel({ text, backgroundColor, color }) {
    return <Label horizontal style={{ marginBottom: "10px" }} color={backgroundColor}><p  style={{color: color}}>{text}</p></Label>
}

NutritionalFilterLabel.propTypes = {
    text: PropTypes.string,
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
}

export default NutritionalFilterLabel

