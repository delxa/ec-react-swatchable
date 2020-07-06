import React from 'react'
import styled from 'styled-components'

import { fromRgb as hslFromRgb } from '../lib/spaces/HSL'
import { fromRgb as brgbFromRgb } from '../lib/spaces/BRGB'
import { fromRgb as hexFromRgb } from '../lib/spaces/HEX'

const Table = styled.table`
  margin-bottom: 10px;
  th {
    text-align: left;
  }
`

// Only used in the component so leaving them here
const pretty = (text) => text.replace(/,/g, ', ')
const parseRgbString = rgbStr => {
  const [ red, green, blue ] = rgbStr.split(',').map(c => parseInt(c))
  return { red, green, blue }
}

export const InfoPanel = ({ colour }) => {

  // Do some quick conversions
  const rgbObj = parseRgbString(colour)
  const data = [
    ["RGB", colour],
    ["Hex", hexFromRgb(rgbObj)],
    ["HSL", hslFromRgb(rgbObj)],
    ["BRGB", brgbFromRgb(rgbObj)]
  ]

  return (
    <div>
      <h3>Colour information</h3>
      <Table>
        <tbody>
          { data.map(([ name, values ], idx) => (
            <tr key={`tr-${name}-${idx}`}>
              <th>{name}</th>
              <td>{pretty(values)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <small>Please note: BRGB values shown are computed from RGB values. These will differ from their originals.</small>
    </div>
  )
}

export default InfoPanel
