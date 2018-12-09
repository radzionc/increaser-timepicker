import React from 'react'
import styled from 'styled-components'

import StartIcon from './start-icon'

const StartButton = styled.button`
  position: absolute;
  border-radius: 50%;
  background-color: ${props => props.theme.actionColor};
  border-width: 0;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.42, 0, 0.58, 1);
  &:hover {
    transform: scale(1.2);
    cursor: pointer;
    fill: #ffffff;
    color: #ffffff;
  }
`

const noPropagation = (func = () => null) => e => {
  e.stopPropagation()
  func()
}

export default ({ onClick, diameter, padding }) => (
  <StartButton
    onClick={noPropagation(onClick)}
    onMouseDown={noPropagation()}
    onTouchStart={noPropagation()}
    style={{ width: diameter, height: diameter, padding: padding }}
  >
    <StartIcon />
  </StartButton>
)
