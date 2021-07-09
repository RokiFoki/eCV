import { Skeleton } from 'antd';
import React, { lazy, Suspense } from 'react';
import { ISkillsProps } from './Skills';

const LazySkills = lazy(() => import('./Skills'));

const fallback = (
  <>
    <div style={{margin: 10}}><Skeleton active/></div>
    <div style={{margin: 10}}><Skeleton active/></div>
    <div style={{margin: 10}}><Skeleton active/></div>
    <div style={{margin: 10}}><Skeleton active/></div>
    <div style={{margin: 10}}><Skeleton active/></div>
  </>
);

const Skills = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; } & ISkillsProps) => (
  <Suspense fallback={fallback}>
    <LazySkills {...props} />
  </Suspense>
);

export default Skills;
