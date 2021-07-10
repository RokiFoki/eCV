import { Skeleton } from 'antd';
import React, { lazy, Suspense } from 'react';

const LazyContact = lazy(() => import('./Contact'));

const fallback = (
  <>
    <div style={{margin: 10}}><Skeleton active/></div>
    <div style={{margin: 10}}><Skeleton active/></div>
    <div style={{margin: 10}}><Skeleton active/></div>
    <div style={{margin: 10}}><Skeleton active/></div>
    <div style={{margin: 10}}><Skeleton active/></div>
  </>
);

const Contact = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={fallback}>
    <LazyContact {...props} />
  </Suspense>
);

export default Contact;
