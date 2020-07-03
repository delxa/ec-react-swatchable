import React, { useState, useEffect } from 'react'
import Swatch from './components/Swatch'

import { Colour } from './lib/ColourService'



export const Swatchable = ({ onChange, extended = false }) => {

  const [data, setData] = useState({ colours: [] })
  const [isLoading, setIsLoading] = useState(false);
 
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const colours = await Colour.fetchColourList(extended)
      setData({colours})
      setIsLoading(false)
    }
    fetchData()
  }, [])

  return (
    <div>
      { data.colours.map(colour => (
        <Swatch colour={colour.toString()} key={`colour-${colour.toString()}`} onClick={onChange} />
      ))}
      <a>Refresh colours</a>
    </div>
  )
}

export default Swatchable
