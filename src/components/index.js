import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import Minutes from './minutes'
import Line from './line'
import Start from './start'
import Circle from './circle'
import { getMouseAngle } from '../utils'
import { defaultTheme } from '../constants'

const Container = styled.div`
  margin: auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default class TimePicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 0,
      height: 0,
      touching: false
    }
  }

  render() {
    const { wrapper: Wrapper, theme } = this.props
    const { width, height, diameter } = this.state
    const renderContent = () => {
      const startDiameter = diameter * (width > height ? 0.16 : 0.2)
      const startPadding = startDiameter * 0.3
      const { duration, onStart } = this.props

      return (
        <React.Fragment>
          <Circle>
            <Line diameter={diameter} duration={duration}/>
            <Minutes diameter={diameter} duration={duration} />
          </Circle>
          <Start
            onClick={onStart}
            diameter={startDiameter}
            padding={startPadding}
          />
        </React.Fragment>
      )
    }

    return (
      <ThemeProvider theme={{ ...defaultTheme, ...theme }}>
        <Wrapper ref={el => (this.wrapper = el)}>
          <Container
            ref={el => (this.view = el)}
            style={{ width: diameter, height: diameter }}
            onMouseDown={this.onMouseDown}
            onTouchStart={this.onMouseDown}
            onMouseMove={this.onMouseMove}
            onTouchMove={this.onMouseMove}
            onMouseUp={this.onMouseUp}
            onTouchEnd={this.onMouseUp}
          >
            {this.view && renderContent()}
          </Container>
        </Wrapper>
      </ThemeProvider>
    )
  }

  componentDidMount() {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  onMouseDown = e => {
    this.updatePosition(e)
    this.setState({ touching: true })
  }

  onMouseMove = e => {
    if (this.state.touching) {
      this.updatePosition(e)
    }
  }

  onMouseUp = () => {
    this.setState({ touching: false })
  }

  updatePosition = e => {
    if (!e.pageX && !e.changedTouches) return

    const rect = this.view.getBoundingClientRect()
    const { pageX, pageY } = e.pageX ? e : e.changedTouches[0]
    const x = pageX - rect.left
    const y = pageY - rect.top

    const { diameter } = this.state
    const center = diameter / 2
    const mouseAngle = getMouseAngle(center, center, x, y)
    const onTop = mouseAngle < 15 || mouseAngle > 345
    const minutes = onTop ? 60 : Math.round(mouseAngle / 30) * 5
    const { duration, onDurationChange } = this.props
    if (minutes !== duration) {
      onDurationChange(minutes)
    }
  }

  onResize = () => {
    if (this.wrapper) {
      const { width, height } = this.wrapper.getBoundingClientRect()
      const diameter = Math.min(width, height)
      this.setState({ width, height, diameter })
    }
  }
}
