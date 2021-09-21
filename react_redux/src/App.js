
import './App.css';
import Home from './components/Home';
import Detail from './components/Detail';
import { HashRouter as Router, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Route path="/"  exact component={Home}/>
      <Route path="/:id" component={Detail} />
      
      </Router>
  );
}

export default App;
