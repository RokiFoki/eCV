import React, { lazy, Suspense } from 'react';

const LazyExperience = lazy(() => import('./Experience'));

const Experience = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyExperience {...props} />
  </Suspense>
);

export default Experience;
