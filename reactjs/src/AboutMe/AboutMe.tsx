import React from 'react';
import styles from './AboutMe.module.scss';
import profile from '../Content/profil.jpeg';
import { Link } from 'react-router-dom';
import { Slider } from 'antd';

const AboutMe: React.FC = () => {
  const now = new Date();
  let years = now.getFullYear() - 2015;
  if (now.getMonth() < 6) years -= 1; 

  const annualSalaryMin = 50000;
  const annualSalaryMax = 150000;
  const defaultSalary = 65000;

  const newLine = '\n';
  return (
  <div className={styles.AboutMe}>
    <section className={styles.bioContainer}>
      <img src={profile} className={styles.profileImage} alt="Roko Krstulovic's photo"></img>
      <pre className={styles.bio}>
        Hey reader! {newLine}
        {newLine}
        Let me tell you about me! {newLine}
        I am an experienced full-stack web developer with expertise in .NET, node.js, Angular and React for more than {years} years. 
        I started my IT career since very early ages. On my 19th birthday, I won first place on a Regional Competition in Algorithms (Infokup). I graduated (with honors: manga cum laude) masters at Faculty of Electrical Engineering and Computing.{newLine}
        {newLine}
        I’ve worked on a large cloud base SAAS solution at Microsoft that is used by millions of users every day. I’ve developed obstacle detection and movement logic for an autonomous drone for measuring network benchmarks around high buildings at Ericsson. There are other projects I am proud of that you can find under <Link to="/experience">Experience</Link>.  {newLine}
      </pre>
    </section>

    <section className={styles.salaryExpectation}>
      Are you considering to hire me? 
      <Slider min={annualSalaryMin} max={annualSalaryMax} defaultValue={defaultSalary} />
    </section>
  </div>
)};

export default AboutMe;
