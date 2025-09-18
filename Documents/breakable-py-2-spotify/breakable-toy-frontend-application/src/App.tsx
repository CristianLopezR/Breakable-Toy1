import logo from './logo.svg';
import './App.css';

function App() {

    const Ask = async () => {
        const response = await fetch('http://localhost:8080/auth/spotify', {
          method: 'POST'
        });
        const data=await response.text()
        window.location.replace(data)
        
      };

    const Artist = async () => {
        const response = await fetch('http://localhost:8080/me/top/artists', {
          method: 'GET'
        });
        const data=await response.json()
        console.log(data)
        
      };    
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={Ask}>xgafgas</button>
        <button onClick={Artist}>Artists</button>
          Learn React
      </header>
    </div>
  );
}

export default App;
