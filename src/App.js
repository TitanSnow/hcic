import React, { Component } from 'react'
import * as Hola from './Hola'
import ConfigCard from './ConfigCard'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      config: {
        quality: 0.92,
        scale: 1
      }
    }
  }
  render() {
    return (
      <Hola.Container>
        <Hola.ColumnsCardStack>
          <Hola.ColumnsItem>
            <ConfigCard
              value={this.state.config}
              onChange={this.handleConfigChange}
            />
          </Hola.ColumnsItem>
        </Hola.ColumnsCardStack>
      </Hola.Container>
    )
  }
  handleConfigChange = config => {
    this.setState({ config })
  }
}

export default App
