import React from 'react'

export const Swatchable = ({ onChange }) => {
  return (
    <div>
      <Swatch colour='255, 0, 0' onClick={onChange} />
      <Swatch colour='0, 255, 0' onClick={onChange} />
      <Swatch colour='0, 0, 255' onClick={onChange} />
    </div>
  )
}

export default Swatchable
