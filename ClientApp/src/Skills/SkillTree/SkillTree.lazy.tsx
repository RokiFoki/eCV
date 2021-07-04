import React, { lazy, Suspense } from 'react';
import { SkillTreeProps } from './SkillTree';

const LazySkills = lazy(() => import('./SkillTree'));

const SkillTree = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; } & SkillTreeProps) => (
  <Suspense fallback={null}>
    <LazySkills {...props} />
  </Suspense>
);

export default SkillTree;
