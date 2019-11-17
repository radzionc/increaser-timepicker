import React from 'react'
import styled from 'styled-components'
import { toRadians } from '../utils'


const getMinutePercentageSize = (diameter) => {
  console.log(diameter)
  if (diameter < 400) {
    return 0.1
  }
  if (diameter < 320) {
    return 0.12
  }
  return 0.09
}

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

export default ({ diameter, duration, onClick }) => {
  const center = diameter / 2
  const radius = center * 0.8
  const minutesNumbers = getMinutes(5, 5, 60)
  const size = diameter * getMinutePercentageSize(diameter)
  
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
    const clickableProps = onClick ? {
      onClick: () => onClick(minute)
    } : {}
    return (
      <Minutes {...clickableProps} style={style} key={minute} selected={minute === duration}>
        {minute}
      </Minutes>
    )
  })

  return minutes
}
