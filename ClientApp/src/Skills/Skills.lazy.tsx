import React, { lazy, Suspense } from 'react';
import { ISkillsProps } from './Skills';

const LazySkills = lazy(() => import('./Skills'));

const Skills = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; } & ISkillsProps) => (
  <Suspense fallback={null}>
    <LazySkills {...props} />
  </Suspense>
);

export default Skills;
