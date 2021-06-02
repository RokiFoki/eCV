import React from 'react';
import { Layout, Menu, } from 'antd';
import { UserOutlined, PhoneFilled } from '@ant-design/icons';
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom';

import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faChess } from '@fortawesome/free-solid-svg-icons'

const { Header, Content, Footer, Sider } = Layout;

const App = () => (
  <Router>
    <Layout>
      <Sider id="components-layout-demo-fixed-sider"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/">About me</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<FontAwesomeIcon icon={faBook} />}>
            <Link to="/experience">Experience</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<FontAwesomeIcon icon={faChess} />}>
            <Link to="/skills">Skills</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<PhoneFilled />}>
            <Link to="/contact">Contact</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{marginLeft: 200, minHeight: '100vh'}}>
        <Switch>
          <Route exact path="/">
            <Layout className="site-layout">
              <Header className="site-layout-background" style={{ padding: 0 }} />
              <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
                  ...
                  <br />
                  Really
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  long
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  content
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        
          </Route>
          <Route path="/experience">
            <Layout>Experience</Layout>
          </Route>
          <Route path="/skills">
            Skills
          </Route>
          <Route path="/contact">
            Contact
          </Route>
          <Redirect to="/not-found"></Redirect>
        </Switch>
      </Layout>     
    </Layout>
  </Router>
);

export default App;
