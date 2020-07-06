import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import Swatch from './Swatch'
import { Colour } from '../lib/ColourService'


const RefreshLink = styled.a`
  cursor: pointer;
  text-decoration: underline;
  font-size: 90%;
`


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
      <RefreshLink onClick={reload}>Refresh colours</RefreshLink>
    </div>
  )
}

export default Swatchable
