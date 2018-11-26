import React from 'react'
import styled from 'styled-components'
import { toRadians } from '../utils'

const MINUTE_PERSENTAGE_SIZE = 0.08

const getMinutes = (start, step, limit) => {
  const inner = minutes => {
    const last = minutes[minutes.length - 1]
    const next = last + step
    if (next > limit) return minutes

    return inner([...minutes, next])
  }
  return inner([start])
}

const Minutes = styled.p`
  position: absolute;
  color: ${props =>
    props.selected ? props.theme.selectTextColor : props.theme.selectColor};
  border-radius: 50%;
  text-align: center;
  vertical-align: middle;
  background-color: ${props =>
    props.selected ? props.theme.selectColor : 'transparent'};
  cursor: pointer;
  user-select: none;
`

export default ({ diameter, duration }) => {
  const center = diameter / 2
  const radius = center * 0.8
  const minutesNumbers = getMinutes(5, 5, 60)
  const size = diameter * MINUTE_PERSENTAGE_SIZE
  const moveDistance = size / 2
  const minutes = minutesNumbers.map(minute => {
    const angle = toRadians(minute * 6)
    const left = center + radius * Math.sin(angle) - moveDistance
    const top = center - radius * Math.cos(angle) - moveDistance
    const style = {
      top,
      left,
      fontSize: size / 2,
      width: size,
      height: size,
      lineHeight: `${size}px`
    }
    return (
      <Minutes style={style} key={minute} selected={minute === duration}>
        {minute}
      </Minutes>
    )
  })

  return minutes
}
