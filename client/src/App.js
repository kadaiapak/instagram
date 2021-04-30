import { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import PageRender from "./customRouter/PageRender";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import StatusModal from "./components/StatusModal";

import Header from "./components/header/Header";

import { useSelector, useDispatch } from "react-redux";
import { refreshToken } from "./redux/actions/authAction";

import ProtectRouter from "./customRouter/ProtectRouter";

function App() {
  const dispatch = useDispatch();
  const { auth, status } = useSelector((state) => state);
  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);
  return (
    <Router>
      <input type="checkbox" id="theme" />
      <div className="App">
        {auth.token && <Header />}

        {/* jika status di toggle menjadi true, maka munculkan status modal */}
        {status && <StatusModal />}
        <div className="main">
          <Route path="/" component={auth.token ? Home : Login} exact />
          <Route path="/register" component={Register} />
          <ProtectRouter path="/:page" component={PageRender} exact />
          {/* <Route path="/:page" component={PageRender} exact /> */}
          <ProtectRouter path="/:page/:id" component={PageRender} exact />
          {/* <Route path="/:page/:id" component={PageRender} exact /> */}
        </div>
      </div>
    </Router>
  );
}

export default App;
