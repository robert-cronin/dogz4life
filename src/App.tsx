import React from 'react';
import Banner from './components/Banner';
import Navigation from './components/Navigation';
import Logo from './static/dogz4lifelogo.jpg'
import Bella from './static/bella.jpg'
import Benni from './static/benni-silly.jpg'
import DocumentTitle from 'react-document-title';
import { Layout, BackTop, Row, Col, Image, List, Button } from 'antd';
import { UpCircleOutlined, CalendarOutlined } from '@ant-design/icons';
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
    const style1: React.CSSProperties = {
      height: '1000px',
    }
    const threeSteps = [
      "1. Book an apointment",
      "2. Bring your puppy on the selected date",
      "3. Come back when they're ready!"
    ]
    return (
      <>
        <Layout>
          <Header>
            <Navigation />
          </Header>

          <Content>
            <Banner odd>
              <Row gutter={[24, 0]} style={{ height: '100vmin' }} justify="space-around" align="middle">
                <Col span={12} style={{
                  textAlign: 'center'
                }}>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <p className="text-4xl font-mono">Dogs for life</p>
                  <p className="text-2xl font-mono">Your dog deserves the best.</p>
                  <Button type="primary" icon={<CalendarOutlined />}>Book Now</Button>
                </Col>
                <Col span={12} style={{
                  height: '100vmin',
                  backgroundImage: `url(${Logo})`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'
                }} />
              </Row>
            </Banner>
            <Banner even style={{ height: '100vmin' }}>
              <Row gutter={[24, 0]} style={{ height: '100vmin' }} justify="space-around" align="middle">
                <Col span={12} style={{
                  height: '100vmin',
                  backgroundImage: `url(${Bella})`,
                  backgroundPosition: 'right',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'
                }} />
                <Col span={12} style={{
                  textAlign: 'center'
                }}>
                  <p className="text-5xl font-mono">Take care of your pet in 3 simple steps</p>
                  <List
                    dataSource={threeSteps}
                    renderItem={item => (
                      <List.Item>
                        <p className="text-xl font-mono">{item}</p>
                      </List.Item>
                    )}
                  />

                </Col>
              </Row>
            </Banner>
            <Banner odd>
              <Row gutter={[24, 0]} style={{ height: '100vmin' }} justify="space-around" align="middle">
                <Col span={12} style={{
                  textAlign: 'center'
                }}>
                  <p className="text-4xl font-mono">We love your pets as much as you do!</p>
                  <p className="text-2xl font-mono">Treat your best friend with a groom or massage, up their skills with a training session or get a tailoured nutrition plan.</p>
                </Col>
                <Col span={12} style={{
                  height: '100vmin',
                  backgroundImage: `url(${Benni})`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'
                }} />
              </Row>
            </Banner>
            <Banner even>
            </Banner>
            <Banner odd>
            </Banner>
          </Content>
          <Footer>Copyright ©2020 Dogz4Life. Created by FortyTwoApps.</Footer>
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
