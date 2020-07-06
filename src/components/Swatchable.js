import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import Swatch from './Swatch'
import RefreshLink from './RefreshLink'
import InfoPanel from './InfoPanel'
import { Colour } from '../lib/ColourService'

const SwatchableContainer  = styled.div`
  padding: 30px;
  background-color: #f4f4f4;
  border-radius: 6px;
`

const SwatchList  = styled.div`
  padding-bottom: 10px;
`

export const Swatchable = ({ onChange, extended = false }) => {

  const [selected, setSelected] = useState(false)
  const [data, setData] = useState({ colours: [] })
  const [isLoading, setIsLoading] = useState(false);
  const [loaded, setLoaded] = useState(1)
 
  const reload = () => {
    setLoaded(loaded + 1)
  }

  const handleOnChange = (colour) => {
    setSelected(colour)
    if (onChange && typeof onChange === 'function') onChange(colour)
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
    <SwatchableContainer>
      <SwatchList>
        { data.colours.map((colour, idx) => (
          <Swatch
            colour={colour}
            key={`colour-${colour}-${idx}`}
            onClick={handleOnChange}
            selected={colour === selected} />
        ))}
      </SwatchList>
      <RefreshLink onClick={reload} isLoading={isLoading} />
      { selected && <InfoPanel colour={selected} /> }
    </SwatchableContainer>
  )
}

export default Swatchable
