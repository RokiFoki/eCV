import { Skeleton } from 'antd';
import React, { lazy, Suspense } from 'react';
import { IProjectListProps } from './ProjectList';

const LazyProjectList = lazy(() => import('./ProjectList'));

const fallback = <div style={{flex: 'flex', flexFlow: 'row wrap', width: '100%'}}>
{Array(15).fill(1).map(i => <div style={{width: 300, margin: 10}}><Skeleton/></div>)}
</div>;

const ProjectList = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; } & IProjectListProps) => (
  <Suspense fallback={fallback}>
    <LazyProjectList {...props} />
  </Suspense>

  
);

export default ProjectList;
