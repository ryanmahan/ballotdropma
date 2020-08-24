import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import Helmet from "react-helmet";
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

  componentDidMount() {
    document.title = "Ballot Drop MA"
  }

  state = {
    sessionId: getSession(),
  }

  render() {
    console.log(process.env.REACT_APP_API)
    const { sessionId } = this.state;

    return (
      <div className="App">
        <Helmet>
          <title>Ballot Drop MA</title>
          <meta name="description" content={"Find where to drop your mail in ballot off in Massachusetts"} />
          <meta property="og:title" content="Ballot Drop MA"/>
          <meta property="og:description" content="Find where to drop you ballot off in MA"/>
          <meta property="og:image" content="https://www.ballotdropma.com/static/media/mail_sent.73b2475c.svg"/>
          <meta property="og:url" content="http://www.ballotdropma.com/"></meta>
          <meta property="og:title" content="Ballot Drop MA"/>
          <meta property="og:description" content="Find where to drop you ballot off in MA"/>
          <meta property="og:image" content="https://www.ballotdropma.com/static/media/mail_sent.73b2475c.svg"/>
          <meta property="og:url" content="http://www.ballotdropma.com/"></meta>
        </Helmet>
        <Layout>
          <SessionProvider value={sessionId}>
            <Content style={{ minHeight: "94vh"}}>
              <Router>
                <Switch>
                  <Route exact path="/town/:id" component={Town}/>
                  <Route exact path="/" component={Landing}/>
                </Switch>
              </Router>
            </Content>
          </SessionProvider>
          <Footer style={{ height: "5vh", paddingLeft: "2vw" }}>
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
