import React from 'react'
import styled from 'styled-components'

import { toRadians } from '../utils'

const Line = styled.line`
  position: absolute;
  stroke-width: 1;
  stroke: ${props => props.theme.selectColor};
`

export default ({ duration, diameter }) => {
  const angle = toRadians(duration * 6)
  const radius = diameter / 2
  const lineProps = {
    x1: radius + radius * 0.8 * Math.sin(angle) * 0.36,
    y1: radius - radius * 0.8 * Math.cos(angle) * 0.36,
    x2: radius + radius * 0.8 * Math.sin(angle) * 0.9,
    y2: radius - radius * 0.8 * Math.cos(angle) * 0.9
  }

  return (
    <svg height={diameter} width={diameter} style={{ position: 'absolute' }}>
      <Line {...lineProps} />
    </svg>
  )
}
