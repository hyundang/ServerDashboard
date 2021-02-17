import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { LoginPage, MainPage, ServerPage, MatchPage, ServerDetailPage, MatchDetailPage } from "./pages";

function App() {
  return (
    <>
      <RecoilRoot>
        <Router>
          <Switch>
            {/* 로그인 했을 때만 MainPage 뜨도록 */}
            <Route path="/" exact>
              <MainPage/>
            </Route>
            <Route path="/server" exact>
              <ServerPage/> 
            </Route>
            <Route path="/server/:id" exact>
              <ServerDetailPage/>
            </Route>
            <Route path="/match" exact>
              <MatchPage/>
            </Route>
            <Route path="/match/:id" exact>
              <MatcgDetailPage/>
            </Route>
          </Switch>
        </Router>
      </RecoilRoot>
    </>
  );
}

export default App;
