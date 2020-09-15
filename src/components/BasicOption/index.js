import React from 'react'
import {optionProps} from './propTypes'

const BasicOption = ({ name }) => {
  return <option>{name}</option>
}

export default (BasicOption)


BasicOption.propTypes = optionProps