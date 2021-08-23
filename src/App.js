import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header/Header';
import Result from './components/Result/Result'
import Form from './components/Form/Form';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" component={Form} />
        <Route path="/result" component={Result} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
