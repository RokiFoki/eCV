import { Skeleton } from 'antd';
import React, { lazy, Suspense } from 'react';

const LazyAboutMe = lazy(() => import('./AboutMe'));

const fallback = (
<div style={{padding: 20, width: '100%'}}>
  <div style={{display: 'flex', flexFlow: 'row wrap', alignItems: 'center'}}>
    <Skeleton.Image/>
    <div style={{flex: 1, margin: 10}}>
      <Skeleton active />
    </div>
  </div>

  <div style={{margin: 10}}><Skeleton active/></div>
  <div style={{margin: 10}}><Skeleton active/></div>
  <div style={{margin: 10}}><Skeleton active/></div>
</div>)

const AboutMe = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={fallback}>
    <LazyAboutMe {...props} />
  </Suspense>
);

export default AboutMe;
