import React, { useState, useEffect } from 'react'
import Swatch from './components/Swatch'

import { Colour } from './lib/ColourService'

export const Swatchable = ({ onChange, extended = false }) => {

  const [data, setData] = useState({ colours: [] })
  const [isLoading, setIsLoading] = useState(false);
  const [loaded, setLoaded] = useState(1)
 
  const reload = () => {
    setLoaded(loaded + 1)
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const colours = await Colour.fetchColourList(extended)
      setData({colours})
      setIsLoading(false)
    }
    fetchData()
  }, [loaded])

  return (
    <div>
      { data.colours.map(colour => (
        <Swatch colour={colour.toString()} key={`colour-${colour.toString()}`} onClick={onChange} />
      ))}
      <a onClick={reload}>Refresh colours</a>
    </div>
  )
}

export default Swatchable
