import React from 'react';
import Banner from './components/Banner';
import Navigation from './components/Navigation';
import Logo from './static/dogz4lifelogo.jpg'
import DocumentTitle from 'react-document-title';
import { Layout, BackTop } from 'antd';
import { UpCircleOutlined } from '@ant-design/icons';
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
      <>
        <Layout>
          <Header>
            <Navigation />
          </Header>
          <Content>
            <Banner backgroundImage={Logo} />
            <Banner even>
            </Banner>
            <Banner>
            </Banner>
            <Banner even>
            </Banner>
            <Banner>
            </Banner>
          </Content>
          <Footer>Copyright ©2020 Dogz4Life LLC.</Footer>
        </Layout>
        <BackTop style={backTopStyle}>
          <UpCircleOutlined />
        </BackTop>
        <DocumentTitle title="Dogz4Life" />
      </>
    );
  }
}

export default App;
