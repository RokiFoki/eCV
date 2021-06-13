import React, { useState } from 'react';
import styles from './AboutMe.module.scss';
import profile from '../Content/profil.jpeg';
import { Link } from 'react-router-dom';
import { InputNumber, Select, Slider, Tooltip, Typography } from 'antd';
import { DislikeOutlined, LikeOutlined, SmileOutlined } from '@ant-design/icons';
const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

type Currency =  '$' | '€' | '£';
type PaymentType = "Annually" | "Monthly" | "Daily" | "Hourly";

// dollars
const annualSalaryMin = 40000;
const annualSalaryMax = 150000;
const defaultSalary = 65000;

let usdEur = 1;
let usdGbp = 1;
fetch(`https://free.currconv.com/api/v7/convert?q=USD_EUR&compact=ultra&apiKey=d84448d0b2f334d9937d`)
.then(async data => usdEur = (await data.json()).USD_EUR); // move this to server
fetch(`https://free.currconv.com/api/v7/convert?q=USD_GBP&compact=ultra&apiKey=d84448d0b2f334d9937d`)
.then(async data => usdGbp = (await data.json()).USD_GBP); // move this to server
const workingDays = 365 * 5 / 7;


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

const AboutMe: React.FC = () => {
  const [salary, updateSalary] = useState(defaultSalary);
  const [currency, updateCurrency] = useState<Currency>('$');
  const [paymentType, updatePaymentType] = useState<PaymentType>('Annually');

  const now = new Date();
  let years = now.getFullYear() - 2015;
  if (now.getMonth() < 6) years -= 1; 

  const selectCurrency = (newCur: Currency) => {
    updateSalary(toCurrency(salary, newCur, currency));
    updateCurrency(newCur);
  }

  const selectPaymentType = (newPaymentType: PaymentType) => {
    updateSalary(convertPaymentType(salary, newPaymentType, paymentType));
    updatePaymentType(newPaymentType);
  }

  const salaryMessage = () => {
    if (salary < convertAmount(65000, currency, paymentType))
      return <Text type="danger">Highly unlikely <DislikeOutlined /></Text>
    
    if (salary < convertAmount(68000, currency, paymentType)) 
      return <Text type="warning">Unlikely</Text>

    if (salary < convertAmount(72000, currency, paymentType)) 
      return <Text>Possibly</Text>

    if (salary < convertAmount(80000, currency, paymentType))
      return <Text type="success">Likely</Text>

    if (salary < convertAmount(90000, currency, paymentType))
      return <Text type="success">Highly likely <SmileOutlined /></Text>    

    return <Text type="success">Certainly <LikeOutlined /></Text>    
  }

  return (
  <div className={styles.AboutMe}>
    <Typography className={styles.title}>
      <Title>About me</Title>
    </Typography>
    <section className={styles.bioContainer}>
      <img src={profile} className={styles.profileImage} alt="Roko Krstulovic's photo"></img>
      <Typography className={styles.bio}>
        <Paragraph>      
          Hey reader!
        </Paragraph>
        <Paragraph>
          Let me tell you about me!
        </Paragraph>
        <Paragraph>
          I am an experienced full-stack web developer with expertise in 
          <Tooltip title='For better deep in please click here'>
            <Link to="/skills"> .NET, node.js, Angular and React </Link>
            </Tooltip> 
          for more than {years} years. 
          I started my IT career since very early ages. On my 19th birthday, I won first place on a Regional Competition in Algorithms (Infokup). I graduated (with honors: magna cum laude) masters at Faculty of Electrical Engineering and Computing.
        </Paragraph>
        <Paragraph>
          I’ve worked on a large cloud base SAAS solution at Microsoft that is used by millions of users every day. I’ve developed obstacle detection and movement logic for an autonomous drone for measuring network benchmarks around high buildings at Ericsson. There are other projects I am proud of that you can find under <Link to="/experience">Experience</Link>.
        </Paragraph>
      </Typography>
    </section>
    

    <Typography className={`${styles.salaryExpectation}`}>
      <Title style={{textAlign: 'center'}}>
        Hire me?
      </Title>
      <Paragraph>
        Are you considering to hire me but you are still not sure? <Link to="/contact"> Lets have a chat!</Link> 
      </Paragraph>      
      <Paragraph>
        I am sure we can come up to an agreement. Alternativelly, you can check my expectaton using following slider.       
      </Paragraph>

      Salary type: <Select value={paymentType} onChange={selectPaymentType} style={{minWidth: 100}}>
        <Option value="Annually">Annually</Option>
        <Option value="Monthly">Monthly</Option>
        <Option value="Daily">Daily</Option>
        <Option value="Hourly">Hourly</Option>
      </Select>
      <section className={styles.salarySection}>
        <Slider min={convertAmount(annualSalaryMin, currency, paymentType)} max={convertAmount(annualSalaryMax, currency, paymentType)} style={{flexGrow: 1}}
          onChange={(value) => updateSalary(value)}
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
      <section>
      Likelihood of me accepting the offer: { salaryMessage() }   
      </section>
    </Typography>
  </div>
)};

export default AboutMe;
