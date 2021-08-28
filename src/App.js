import { useState, useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header/Header';
import Result from './components/Result/Result'
import Form from './components/Form/Form';
import Footer from './components/Footer/Footer';

function App() {
  const [result, setResult] = useState({})
  const [time, setTime] = useState(0)
  const [reset, setReset] = useState(0)

  useEffect(() => {
    setResult({})
    setTime(0)
    console.log("sss")
  }, [reset])
  return (
    <>
      <Header setReset={setReset} />
      {result.hasOwnProperty("status")
        ? <Result time={time} result={result} setReset={setReset} />
        : <Form time={time} setTime={setTime} setResult={setResult} reset={reset} />}
      <Footer />
    </>
  );
}

export default App;
