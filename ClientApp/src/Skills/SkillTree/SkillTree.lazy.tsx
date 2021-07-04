import React, { lazy, Suspense } from 'react';

const LazySkillTree = lazy(() => import('./SkillTree'));

const SkillTree = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySkillTree {...props} />
  </Suspense>
);

export default SkillTree;
