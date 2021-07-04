import React, { lazy, Suspense } from 'react';
import { SkillTree3DProps } from './SkillTree3D/SkillTree3D';

const LazySkills = lazy(() => import('./Skills'));

const Skills = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; } & SkillTree3DProps) => (
  <Suspense fallback={null}>
    <LazySkills {...props} />
  </Suspense>
);

export default Skills;
