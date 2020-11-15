import React from 'react';
import Navigation from './components/Navigation';
import DocumentTitle from 'react-document-title';
import { Layout, BackTop } from 'antd';
import { UpCircleOutlined } from '@ant-design/icons';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import HomePage from './views/HomePage'
import NewClientPage from './views/NewClientPage'
const { Header, Footer, Content } = Layout;

interface AppProps {
}
interface AppState {
}

class App extends React.Component<AppProps, AppState> {
  constructor(props) {
    super(props)
  }

  render() {
    const backTopStyle: React.CSSProperties = {
      height: 40,
      width: 40,
      lineHeight: '40px',
      borderRadius: 4,
      color: 'darkblue',
      textAlign: 'center',
      fontSize: 30,
    };
    return (
      <Router>
        <Layout className="LayoutWindow">
          <Header>
            <Navigation />
          </Header>
          <Content>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/client/new">
                <NewClientPage />
              </Route>
              <Route path="/">
                <HomePage />
              </Route>
            </Switch>
          </Content>
          <Footer>Copyright ©2020 Dogz4Life. Created by FortyTwoApps.</Footer>
        </Layout>
        <BackTop style={backTopStyle}>
          <UpCircleOutlined />
        </BackTop>
        <DocumentTitle title="Dogz4Life" />
      </Router>
    );
  }
}

export default App;
