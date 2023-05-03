import React, { useEffect, useState } from 'react';
import styles from './AboutMe.module.scss';
import profile from '../Content/profil.jpeg';
import { Link } from 'react-router-dom';
import { InputNumber, PageHeader, Select, Slider, Typography } from 'antd';
import { DislikeOutlined, LikeOutlined, SmileOutlined } from '@ant-design/icons';
const { Paragraph, Text } = Typography;
const { Option } = Select;

type Currency =  '$' | '€' | '£';
type PaymentType = "Annually" | "Monthly" | "Daily" | "Hourly";

// dollars
const annualSalaryMin = 80000;
const annualSalaryMax = 250000;
const defaultSalary = 120000;
const workingDays = 365 * 5 / 7;
const highlyUnlikely = 120000;
const unlikely = 130000;
const possibly = 140000;
const likely = 165000;
const highlyLikely = 200000;

const AboutMe: React.FC = () => {
  const [salary, updateSalary] = useState(defaultSalary);
  const [currency, updateCurrency] = useState<Currency>('$');
  const [paymentType, updatePaymentType] = useState<PaymentType>('Annually');
  const [usdEur, setUsdEur] = useState(1);
  const [usdGbp, setUsdGbp] = useState(1);

  useEffect(() => {
    fetch(`/api/salary/currency-rates`).then(async response => response.json())
      .then(data => { 
        setUsdEur(data.usdToEur);
        setUsdGbp(data.usdToGbp);
    });
  }, []);

  const now = new Date();
  let years = now.getFullYear() - 2015;
  if (now.getMonth() < 6) years -= 1; 

  const toCurrency = (amount: number, toCur: Currency, fromCur: Currency = '$') => {
    if (fromCur === '€') amount = amount / usdEur;
    else if (fromCur === '£') amount = amount / usdGbp;
  
    if (toCur === '$') return amount;
    if (toCur === '€') return usdEur * amount;
    return usdGbp * amount;
  }
  
  const convertPaymentType = (amount: number, toPaymentType: PaymentType, fromPaymentType: PaymentType = 'Annually') => {
    if (fromPaymentType === 'Monthly') amount *= 12;
    else if (fromPaymentType === 'Daily') amount *= workingDays;
    else if (fromPaymentType === 'Hourly') amount *= workingDays * 8;
    
    if (toPaymentType === 'Annually') return amount;
    if (toPaymentType === 'Monthly') return amount / 12;
    if (toPaymentType === 'Daily') return amount / workingDays;
    return amount / workingDays / 8;
  }
  
  const convertAmount = (amount: number, currency: Currency, paymentType: PaymentType) => {
    return convertPaymentType(toCurrency(amount, currency), paymentType);
  }

  const selectCurrency = (newCur: Currency) => {
    updateSalary(toCurrency(salary, newCur, currency));
    updateCurrency(newCur);
  }

  const selectPaymentType = (newPaymentType: PaymentType) => {
    updateSalary(convertPaymentType(salary, newPaymentType, paymentType));
    updatePaymentType(newPaymentType);
  }

  const salaryMessage = () => {
    if (salary < convertAmount(highlyUnlikely, currency, paymentType))
      return <Text type="danger">Highly unlikely <DislikeOutlined /></Text>
    
    if (salary < convertAmount(unlikely, currency, paymentType)) 
      return <Text type="warning">Unlikely</Text>

    if (salary < convertAmount(possibly, currency, paymentType)) 
      return <Text>Possibly</Text>

    if (salary < convertAmount(likely, currency, paymentType))
      return <Text type="success">Likely</Text>

    if (salary < convertAmount(highlyLikely, currency, paymentType))
      return <Text type="success">Highly likely <SmileOutlined /></Text>    

    return <Text type="success">Certainly <LikeOutlined /></Text>    
  }

  return (
  <div className={styles.AboutMe}>
    <PageHeader title="About me" className="page-title" />
    
    <section className={styles.bioContainer}>
      <img src={profile} className={styles.profileImage} alt="Roko Krstulovic"></img>
      <Typography className={styles.bio}>
        <Paragraph>      
          Hey reader!
        </Paragraph>
        <Paragraph>
          Let me tell you about me!
        </Paragraph>
        <Paragraph>
          As a seasoned full-stack web developer with over {years} years of experience, I specialize in leveraging{' '} 
          <Link to="/skills/list?tech=.NET,Node.js,React,Angular">.NET, Node.js, React, and Angular</Link>{' '} 
          to create scalable, high-performance web applications. I got an early start in my IT career, winning first place in the Regional Competition in Algorithms (Infokup) on my 19th birthday. Later, I earned a masters degree with honors (magna cum laude) from the Faculty of Electrical Engineering and Computing.
        </Paragraph>
        <Paragraph>
        <Link to="/projects?search=Microsoft">At Microsoft</Link>, I played a key role in developing a cloud-based SaaS solution that's used by millions of users worldwide. 
        I also contributed to the development of <Link to="projects?search=drone">obstacle detection and movement logic for an autonomous drone designed to measure network benchmarks around high buildings</Link> at Ericsson.
        </Paragraph>
        <Paragraph>
        In addition, I worked on a cutting-edge platform that <Link to="/projects?search=market%20dashboard">collects market data and presents it in an intuitive, easy-to-use format</Link>. My focus was on optimizing frontend performance, and I gained extensive experience working with WebSockets.
        </Paragraph>

        <Paragraph>
        I am passionate about leveraging my skills and expertise to help businesses achieve their goals and drive growth. Whether you need a full-stack web developer or a specialist in .NET, node.js, React, or Angular, I have the skills and experience necessary to deliver results. Let's connect and see how I can help take your business to the next level!
        </Paragraph>
      </Typography>
    </section>
    

    <Typography className={`${styles.salaryExpectation}`}>
      <PageHeader title="Hire me?" className="page-title" />
      <Paragraph>
        Are you considering hiring me, but you are still unsure, or maybe your company is offering a referral bonus? <Link to="/contact"> Let us have a chat!</Link> 
      </Paragraph>      
    </Typography>
  </div>
)};

export default AboutMe;
