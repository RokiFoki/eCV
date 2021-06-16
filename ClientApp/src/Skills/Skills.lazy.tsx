import React, { lazy, Suspense } from 'react';

const LazySkills = lazy(() => import('./Skills'));

const Skills = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySkills {...props} />
  </Suspense>
);

export default Skills;
