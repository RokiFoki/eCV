import { Skeleton } from 'antd';
import React, { lazy, Suspense } from 'react';

const LazyExperience = lazy(() => import('./Experience'));

const fallback = (
  <>
    <div style={{margin: 10}}><Skeleton active/></div>
    <div style={{margin: 10}}><Skeleton active/></div>
    <div style={{margin: 10}}><Skeleton active/></div>
    <div style={{margin: 10}}><Skeleton active/></div>
    <div style={{margin: 10}}><Skeleton active/></div>
  </>
);

const Experience = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={fallback}>
    <LazyExperience {...props} />
  </Suspense>
);

export default Experience;
