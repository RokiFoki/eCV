import { PageHeader, Row, Timeline, Typography, Col } from 'antd';
import React from 'react';
import styles from './Experience.module.scss';
const { Text, Paragraph } = Typography;

const Experience: React.FC = () => (
  <div className={styles.Experience}>
    <PageHeader title="Experience" className="page-title" />
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
• `} <Text italic>Hidden (NDA)</Text> {`: Created UI components and displayed market information in real-time (charts, WebSockets, UI library).
• PosLovko: Created Node.js/Angular single page application for connecting employers with professionals.
• Azcal: Created a web application for live and history GPS tracking of vehicles using .Net/React.
• others`}
          </Paragraph>
        </Typography>
      </Timeline.Item>
      <Timeline.Item>
        <Typography>            
          <Row>
            <Col span={12}>
              <Text strong>
                BeValued (via Alfatoon)
              </Text>
            </Col>
            <Col span={12} style={{textAlign: 'right'}}>
              <Text strong>
                Remote
              </Text>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Text italic>
                Senior Software engineer
              </Text>
            </Col>
            <Col span={12} style={{textAlign: 'right'}}>
              <Text italic>
                July 2019 - January 2022
              </Text>
            </Col>
          </Row>
          <Paragraph style={{whiteSpace: 'pre-wrap'}}>
          {
`• Improved microservice B2B SaaS solution for insurance companies.
• Discussed new features with the product owner, architected them and coordinated their development.
• Mentored two junior engineers that quickly became independent`}
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
`• Maintained Microsoft’s ERP SaaS solution that consisted of designing and implementing new
   features, bug fixing, and regression prevention by implementing unit, integration, and scenario tests.. 
• Adding telemetry and creating PowerBI reports for error diagnostics. 
• Leaded two vendor teams of four members.`}
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
`• Implemented drone’s movement using AI with obstacle mapping, communication and synchronization with
a Web server and android device using complex data structures, algorithms and communication protocols.
• Implemented and deployed a Web server and database that enables real-time visualization and drone
control.
• Implemented an Android application for network benchmark tests and enabled real-time communication
with the server and Raspberry Pi.
`}
          </Paragraph>
        </Typography>
      </Timeline.Item>
    </Timeline>
  </div>
);

export default Experience;
