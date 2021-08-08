import React, { useCallback, useRef, useState } from 'react';
import { Button, Layout, Menu, } from 'antd';
import { UserOutlined, PhoneFilled, MenuOutlined, ExperimentOutlined } from '@ant-design/icons';
import { Link, Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';

import './Global.scss';
import styles from './App.module.scss';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faBook, faChess } from '@fortawesome/free-solid-svg-icons'
import AboutMe from './AboutMe/AboutMe.lazy';
import Experience from './Experience/Experience.lazy';
import Skills from './Skills/Skills.lazy';
import Contact from './Contact/Contact.lazy';
import { useOutsideAlerter } from './Shared/utils';
import Projects from './Projects/Projects.lazy';
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './ErrorFallback/ErrorFallback';
import { logError } from './Portfolio.utils';

const { Sider } = Layout;

interface SideNavbarContentProps extends RouteComponentProps<any> {
  onClick?: () => void;
}

const SideNavbarContent = withRouter((props: SideNavbarContentProps) => {
  const path = props.location.pathname;
  let selectionKey = '1';
  if (path.startsWith('/experience'))  {
    selectionKey = '2';
  } else if (path.startsWith('/skills')) {
    selectionKey = '3';
  } else if (path.startsWith('/projects')) {
    selectionKey = '4';
  } else if (path.startsWith('/contact')) {
    selectionKey = '5';
  }
  return (
    <React.Fragment>
      <div className="logo">ePortfolio</div>
      <Menu theme="dark" mode="inline" selectedKeys={[selectionKey]} onClick={props.onClick}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/">About me</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<FontAwesomeIcon icon={faBook} />}>
          <Link to="/experience">Experience</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<FontAwesomeIcon icon={faChess} />}>
          <Link to="/skills">Skills</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<ExperimentOutlined />}>
          <Link to="/projects">Projects</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<PhoneFilled />}>
          <Link to="/contact">Contact</Link>
        </Menu.Item>
      </Menu>
    </React.Fragment>
  )
})

const App = () => {
  const [sidenavCollapsed, setSidenavCollapsed] = useState(true);
  const [redrawSkillsTime, setRedrawSkillsTime] = useState(+new Date());
  const [clearErrorToggle, setClearErrorToggle] = useState(false);
  const clearErrorState = () => setClearErrorToggle(e => !e);
  const updateCollapsed = (collapsed: boolean) => {    
    setSidenavCollapsed((wasCollapsed) => {
      if (wasCollapsed !== collapsed) {
        setRedrawSkillsTime(+new Date());
      }
      return collapsed;
    });
  }
  const onSidebarOptionClick = () => {
    clearErrorState();
    updateCollapsed(true);
  }

  const ref = useRef(null);
  useOutsideAlerter(ref, useCallback(() => {
    updateCollapsed(true);
  }, []))

  return (
  <Layout style={{height: '100vh', width: '100vw'}}>
      <Sider id="components-layout-demo-fixed-sider"
        className={`${styles.Sider} ${sidenavCollapsed ? styles.Collapsed : ''}`}
        ref={ref}
      >
        <SideNavbarContent onClick={() => onSidebarOptionClick()}></SideNavbarContent>
      </Sider>
      <Layout className={styles.Container}>
        <ErrorBoundary 
          FallbackComponent={ErrorFallback}
          onError={logError}
          resetKeys={[clearErrorToggle]}
          >
          { !!sidenavCollapsed &&
            <Button type="primary" size="large" icon={<MenuOutlined />} shape="circle"
              className={styles.MenuButton}
              onClick={() => updateCollapsed(false) }></Button>}
          <Switch>
            <Route exact path="/">
              <AboutMe></AboutMe>
            </Route>
            <Route path="/experience">
              <Experience></Experience>
            </Route>
            <Route path="/skills/:skillsView?">
              <Skills redraw={redrawSkillsTime}></Skills>
            </Route>
            <Route path="/projects">
              <Projects></Projects>
            </Route>
            <Route path="/contact">
              <Contact></Contact>
            </Route>
            <Redirect to="/not-found"></Redirect>
        </Switch>
        </ErrorBoundary>
      </Layout> 
    </Layout> 
)};

export default App;
