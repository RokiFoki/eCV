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
          My name is Roko Krstulović, an experienced full-stack web developer with expertise in
            <Link to="/skills/list?tech=.NET,Node.js,React,Angular"> .NET, Node.js, React and Angular </Link>
          for more than {years} years. 
          I started my IT career at a very early age. On my 19th birthday, I won first place in a Regional Competition in Algorithms (Infokup). I graduated (with honors: magna cum laude) masters from the Faculty of Electrical Engineering and Computing.
        </Paragraph>
        <Paragraph>
          I’ve worked on a large cloud-based SAAS solution at Microsoft that millions of users use every day. I’ve developed obstacle detection and movement logic for an autonomous drone for measuring network benchmarks around high buildings at Ericsson. 
          There are other projects I am proud of that you can find under <Link to="/projects">Projects</Link>.
        </Paragraph>
        <Paragraph>
          You can find the complete list of my skills with related projects I've used them on under <Link to="/skills">Skills</Link>.
        </Paragraph>
      </Typography>
    </section>
    

    <Typography className={`${styles.salaryExpectation}`}>
      <PageHeader title="Hire me?" className="page-title" />
      <Paragraph>
        Are you considering hiring me, but you are still unsure, or maybe your company is offering a referral bonus? <Link to="/contact"> Let us have a chat!</Link> 
      </Paragraph>      
      <Paragraph>
        Please check my expectation using the following slider.
      </Paragraph>

      Salary type: <Select value={paymentType} onChange={selectPaymentType} style={{minWidth: 100}}>
        <Option value="Annually">Annually</Option>
        <Option value="Monthly">Monthly</Option>
        <Option value="Daily">Daily</Option>
        <Option value="Hourly">Hourly</Option>
      </Select>
      <section className={styles.salarySection}>
        <Slider min={convertAmount(annualSalaryMin, currency, paymentType)} max={convertAmount(annualSalaryMax, currency, paymentType)} 
          style={{flexGrow: 1, marginRight: 10}}
          onChange={(value: number) => updateSalary(value)}
          value={salary} />
        <Select value={currency} onChange={selectCurrency}>
          <Option value="$">$</Option>
          <Option value="€">€</Option>
          <Option value="£">£</Option>
        </Select>
        <InputNumber
          style={{ width: 100 }}
          min={convertAmount(annualSalaryMin, currency, paymentType)}
          max={convertAmount(annualSalaryMax, currency, paymentType)}
          step={0.01}
          value={salary}
          onChange={(value) => updateSalary(value)}
          formatter={value => `${Number.parseFloat((value || convertAmount(defaultSalary, currency, paymentType)).toString()).toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => Number.parseFloat(value?.replace(/\$\s?|(,*)/g, '') || `${convertAmount(defaultSalary, currency, paymentType)}`)}
        />     
      </section>
      <section style={{ display: 'flex', gap: 5}}>
        <span>Likelihood of me accepting the offer:</span> 
        <span>{salaryMessage()}</span>   
      </section>
    </Typography>
  </div>
)};

export default AboutMe;
