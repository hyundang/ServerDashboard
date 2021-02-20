import React from "react";
// router
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
// components
import { 
  LoginPage, 
  MainPage, 
  ServerPage, 
  MatchPage, 
  ServerDetailPage, 
  ServerAddPage,
  MatchDetailPage 
} from "./pages";
// styles
import GlobalStyles from './GlobalStyles';


function App() {
  return (
    <>
      <GlobalStyles/>
      <Router>
        <Switch>
          {/* 로그인 했을 때만 MainPage 뜨도록 */}
          <Route path="/" exact>
            {/* <MainPage/> */}
            {/* <LoginPage/> */}
            {JSON.parse(localStorage.getItem("isLogin"))? <MainPage/> : <LoginPage/>}
          </Route>
          <Route path="/server" exact>
            <ServerPage/> 
          </Route>
          <Route path="/server/add" exact>
            <ServerAddPage/> 
          </Route>
          <Route path="/server/:id" exact>
            <ServerDetailPage/>
          </Route>
          <Route path="/match" exact>
            <MatchPage/>
          </Route>
          <Route path="/match/:id" exact>
            <MatchDetailPage/>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
