import React, { Component } from 'react';
import './App.css';


class App extends Component {
  render() {
    const names = ['Alice', 'Emily', '曾凯']
    const namesMap = names.map((name, index) => 
      <li key={index}>hello ,{name}</li>
    )
    const arr = [
      <h1 key='1'>hello world</h1>,
      <h2 key='2'>React is awesome</h2>
    ]
    return (
      <div className="App">
        <ul>
         {
          arr
          }
          <div>
            {namesMap}
          </div> 
        </ul>
      </div>
    );
  }
}

export default App;
