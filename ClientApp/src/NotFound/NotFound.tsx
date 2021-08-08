import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { logError } from '../Portfolio.utils';
import styles from './NotFound.module.scss';

const emptyIf = (condition: boolean, resultIfFalse: string) => {
  if (condition) return '';

  return resultIfFalse;
}

const BigSmall = (val: string, condition: boolean) => {
  return <div style={{textAlign: 'center'}}>{Array.from(val).map((c, i) => (
    <span key={i + c} className={`${i % 2 === 0 ? styles.BigNumber: styles.SmallNumber} ${emptyIf(condition, styles.Invert)}`}>{c}</span>
  ))}</div>;
}

const NotFound = () => {
  const [counter, setCounter] = useState(0);
  const { state } = useLocation();
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(counter => counter + 1);
    }, 1000 / 3)

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if ((state as any)?.from?.pathname) {
      logError(new Error("Page not found"), {componentStack: 'from: ' + (state as any).from.pathname});
    }
  }, []);

  return (
  <div className={styles.NotFound}>
    <div className={styles.Container}>
      <div>
        {BigSmall("404", counter % 6 < 3)}
      </div>
      <div>
        {BigSmall("Page not found", counter % 8 < 4)}
      </div>
    </div>
    <h1>Please select an option from navbar or go to <Link to="/">Home Page</Link>.</h1>
  </div>
  );
}

export default NotFound;
