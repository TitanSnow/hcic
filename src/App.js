import React, { Component } from 'react'
import fromPairs from 'lodash/fromPairs'
import * as Hola from './Hola'
import ConfigCard from './ConfigCard'
import ConfigSpec from './ConfigSpec'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      config: fromPairs(ConfigSpec.map(({name, default: def}) => [name, def]))
    }
  }
  render() {
    return (
      <Hola.Container>
        <Hola.ColumnsCardStack>
          <Hola.ColumnsItem>
            <ConfigCard
              value={this.state.config}
              onChange={this.onConfigChange}
              spec={ConfigSpec}
            />
          </Hola.ColumnsItem>
        </Hola.ColumnsCardStack>
      </Hola.Container>
    )
  }
  onConfigChange = config => {
    this.setState({ config })
  }
}

export default App
