//import logo from './logo.svg';
import config from './components/config';
import './App.css';

function App() {
  return (
    fetch(config.apiBaseUrl)
      .then(res => res.json())
      .then((data) => 
        console.log(data)
      )
  );
}

export default App;

{/* <div className="App">
<header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    Edit <code>src/App.js</code> and save to reload.
  </p>
  <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
  </a>
</header>
<ul>
  <li> </li>
</ul>
</div>  */}
