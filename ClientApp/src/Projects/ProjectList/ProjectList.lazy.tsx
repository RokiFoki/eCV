import React, { lazy, Suspense } from 'react';
import { IProjectListProps } from './ProjectList';

const LazyProjectList = lazy(() => import('./ProjectList'));

const ProjectList = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; } & IProjectListProps) => (
  <Suspense fallback={null}>
    <LazyProjectList {...props} />
  </Suspense>
);

export default ProjectList;
