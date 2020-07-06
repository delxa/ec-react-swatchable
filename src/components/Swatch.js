import React from 'react'
import styled from 'styled-components'

const hasHandler = (prop) => {
  return prop && typeof prop === 'function'
}

const SwatchElement = ({ className, onClick, colour, selected }) => {
  const handleOnClick = (colour) => {
    if (onClick && typeof onClick === 'function') {
      onClick(colour)
    }
  }
  return (
    <span onClick={() => handleOnClick(colour)} className={className} />
  )
}

const Swatch = styled(SwatchElement)`
  display: inline-block;
  background: rgb(${props => props.colour || '255,255,255'});
  border-radius: 5px;
  width: 30px;
  height: 30px;
  margin-right: 10px;
  cursor: ${props => hasHandler(props.onClick) ? 'pointer' : 'auto'};
  border 2px solid ${props => props.selected ? '#454545' : 'transparent'};
  transition: border-color 0.3s;

  &:hover {
    border-color: ${props => hasHandler(props.onClick) ? '#454545' : 'transparent'};
  }
`

export default Swatch
