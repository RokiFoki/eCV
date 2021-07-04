import React, { lazy, Suspense } from 'react';

const LazySkillList = lazy(() => import('./SkillList'));

const SkillList = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySkillList {...props} />
  </Suspense>
);

export default SkillList;
