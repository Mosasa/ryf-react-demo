import React, { Component } from 'react';
import './App.css'
import PropTypes from 'prop-types'

class MyTitle extends Component {
  render () {
    return (
      <h1>{this.props.title}</h1>
    )
  }
}
MyTitle.propTypes = {//设置检测rules
  title: PropTypes.number
}

class App extends Component {
  render () {
    const data = 123
    return (
      <div className="app">
        <MyTitle title={data} />
      </div>
    )
  }
}

export default App