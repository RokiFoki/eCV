import React, { lazy, Suspense } from 'react';
import { SkillsProps } from './Skills';

const LazySkills = lazy(() => import('./Skills'));

const Skills = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; } & SkillsProps) => (
  <Suspense fallback={null}>
    <LazySkills {...props} />
  </Suspense>
);

export default Skills;
