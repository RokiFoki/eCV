import { PageHeader, Row, Timeline, Typography, Col } from 'antd';
import React from 'react';
import styles from './Experience.module.scss';
const { Title, Text, Paragraph } = Typography;

const Experience: React.FC = () => (
  <div className={styles.Experience}>
    <PageHeader title="Experience" className={styles.title} />
    <Timeline style={{maxWidth: 900, margin: 'auto'}}>
      <Timeline.Item>
        <Typography>            
          <Row>
            <Col span={12}>
              <Text strong>
                Alfatoon
              </Text>
            </Col>
            <Col span={12} style={{textAlign: 'right'}}>
              <Text strong>
                Split, Croatia
              </Text>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Text italic>
                Founder - Software consultant
              </Text>
            </Col>
            <Col span={12} style={{textAlign: 'right'}}>
              <Text italic>
                July 2019 - Present
              </Text>
            </Col>
          </Row>
          <Paragraph style={{whiteSpace: 'pre-wrap'}}>
          {
`Working remotely for various clients on optimizing and upgrading their software products such as:
• BeValued (full-time): Maintained .NET/Angular microservice applications. Created reporting system for their clients.
• PosLovko: Created node.js/Angular single page application for connecting employers with professionals.
• Azcal: Created a web application for live and history GPS tracking of vehicles.
• others`}
          </Paragraph>
        </Typography>
      </Timeline.Item>
      <Timeline.Item>
        <Typography>            
          <Row>
            <Col span={12}>
              <Text strong>
                Microsoft
              </Text>
            </Col>
            <Col span={12} style={{textAlign: 'right'}}>
              <Text strong>
                Copenhagen, Danmark
              </Text>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Text italic>
                Software engineer
              </Text>
            </Col>
            <Col span={12} style={{textAlign: 'right'}}>
              <Text italic>
                October 2017 - July 2019
              </Text>
            </Col>
          </Row>
          <Paragraph style={{whiteSpace: 'pre-wrap'}}>
          {
`Maintained Microsoft’s ERP SaaS solution that consisted of designing and implementing new features, bug fixing,
regression preventing by implementing unit/component/scenario tests. Adding telemetry and creating PowerBI reports
for error diagnostics. Leaded two vendor teams of four members`}
          </Paragraph>
        </Typography>
      </Timeline.Item>
      <Timeline.Item>
        <Typography>            
          <Row>
            <Col span={12}>
              <Text strong>
                Ericsson Nikola Tesla
              </Text>
            </Col>
            <Col span={12} style={{textAlign: 'right'}}>
              <Text strong>
                Zagreb, Croatia
              </Text>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Text italic>
                Software developer
              </Text>
            </Col>
            <Col span={12} style={{textAlign: 'right'}}>
              <Text italic>
                August 2015 - August 2017
              </Text>
            </Col>
          </Row>
          <Paragraph style={{whiteSpace: 'pre-wrap'}}>
          {
`Implemented drone’s movement using AI with obstacle mapping, communication and synchronization with
a Web server and android device using complex data structures, algorithms and communication protocols.
• Implemented and deployed web server along with a database that enables real-time visualization and drone
controlling.
• Implemented an Android application for network benchmark tests and enabled real-time communication
with the server and Raspberry Pi.
`}
          </Paragraph>
        </Typography>
      </Timeline.Item>
      <Timeline.Item>
        <Typography>            
          <Row>
            <Col span={12}>
              <Text strong>
                Trovicor
              </Text>
            </Col>
            <Col span={12} style={{textAlign: 'right'}}>
              <Text strong>
                Split, Croatia
              </Text>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Text italic>
                Software developer
              </Text>
            </Col>
            <Col span={12} style={{textAlign: 'right'}}>
              <Text italic>
                October 2016 - October 2016
              </Text>
            </Col>
          </Row>
          <Paragraph style={{whiteSpace: 'pre-wrap'}}>
          {
`Upgraded and added new functionality to software for automatic tests and created stress test tooling.`}
          </Paragraph>
        </Typography>
      </Timeline.Item>
      
    </Timeline>
  </div>
);

export default Experience;
