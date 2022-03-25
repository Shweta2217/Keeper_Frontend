import React from "react";
import Auth from "./Auth/Auth";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import { useSelector } from 'react-redux';
import Home from './Home/Home';


function App() {
  const isLogin = useSelector(state => state.isLogin);
  return (
    <BrowserRouter>
      <Header />
      {isLogin ?
        <Switch>
          <Route exect path="/keep" ><Home /></Route>
          <Route path="*"><><center><h2>Opppsss!</h2></center></></Route>
        </Switch>
          :
        <Switch>
          <Route exact path="/"><Auth /></Route>
          <Route path="*"><><center><h2>Opppsss!</h2></center></></Route>
        </Switch>
      }
      <Footer />
    </BrowserRouter>);


}

export default App;
