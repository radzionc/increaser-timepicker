# increaser-timepicker

> 

[![NPM](https://img.shields.io/npm/v/increaser-timepicker.svg)](https://www.npmjs.com/package/increaser-timepicker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![alt text](https://cdn-images-1.medium.com/max/2000/1*rPME-ceW9GySQpv2qSA41A.gif)

## [Demo](https://rodionchachura.github.io/increaser-timepicker/)

## Install

```bash
npm install --save increaser-timepicker
```

## Usage

```jsx
import React from 'react'

import TimePicker from 'increaser-timepicker'

const Container = ({ children }) => (
  <div style={{ height: '100vh' width: '100%' }}>
    {children}
  </div>
)

class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = { duration: 25 }
  }

  render() {
    const { duration } = this.state
    return (
      <TimePicker
        duration={duration}
        wrapper={Container}
        onStart={() => console.log('Start!')}
        onDurationChange={duration => this.setState({ duration })}
      />
    )
  }
}
```
## [Story on Medium](https://medium.com/p/9b2d9215a415)

## License

MIT © [RodionChachura](https://geekrodion.com)
