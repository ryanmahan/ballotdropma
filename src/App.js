import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import Landing from "./pages/Landing";
import Town from "./pages/Town";
import 'antd/dist/antd.css';
import './styles/common.scss';

const { Content, Footer } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Content style={{ minHeight: "95vh"}}>
          <Router>
            <Switch>
              <Route exact path="/town/:id" component={Town}/>
              <Route exact path="/" component={Landing}/>
            </Switch>
          </Router>
        </Content>
        <Footer style={{ height: "5vh"}}>
          Created By Ryan Mahan &nbsp;
          <a href="mailto:ryan@mahan.family">Email Me</a>
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
