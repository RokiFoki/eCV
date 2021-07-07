import React, { lazy, Suspense } from 'react';
import { ISkillTreeProps } from './SkillTree';

const LazySkillTree = lazy(() => import('./SkillTree'));

const SkillTree = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; } & ISkillTreeProps) => (
  <Suspense fallback={null}>
    <LazySkillTree {...props} />
  </Suspense>
);

export default SkillTree;
