import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import getSession from "./utils/session"
import Landing from "./pages/Landing";
import Town from "./pages/Town";
import { SessionProvider } from "./components/SessionContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import 'antd/dist/antd.css';
import './styles/common.css';

const { Content, Footer } = Layout;

class App extends React.Component {

  state = {
    sessionId: getSession(),
  }

  render() {
    console.log(process.env.REACT_APP_API)
    const { sessionId } = this.state;

    return (
      <div className="App">
        <Layout>
          <SessionProvider value={sessionId}>
            <Content style={{ minHeight: "95vh"}}>
              <Router>
                <Switch>
                  <Route exact path="/town/:id" component={Town}/>
                  <Route exact path="/" component={Landing}/>
                </Switch>
              </Router>
            </Content>
          </SessionProvider>
          <Footer style={{ height: "5vh"}}>
            Created By Ryan Mahan &nbsp;
            <a href="mailto:ryan@ballotdropma.com"><FontAwesomeIcon type={faEnvelope}/>Email Me</a>
            <a href="http://github.com/ryanmahan"><FontAwesomeIcon type={faGithub}/>&nbsp; My Github</a>
          </Footer>
        </Layout>
      </div>
    )
  }
}

export default App;
