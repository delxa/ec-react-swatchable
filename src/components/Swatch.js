import React from 'react'
import styled from 'styled-components'

const SwatchElement = ({ className, onClick, colour }) => {
  return (
    <span onClick={() => onClick(colour)} className={className} />
  )
}

const Swatch = styled(SwatchElement)`
  display: inline-block;
  background: rgb(${props => props.colour || '255,255,255'});
  border-radius: 5px;
  width: 30px;
  height: 30px;
  margin-right: 10px;
  cursor: pointer;
`

export default Swatch
