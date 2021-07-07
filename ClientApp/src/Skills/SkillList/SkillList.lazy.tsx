import React, { lazy, Suspense } from 'react';
import { ISkillListProps } from './SkillList';

const LazySkillList = lazy(() => import('./SkillList'));

const SkillList = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; } & ISkillListProps) => (
  <Suspense fallback={null}>
    <LazySkillList {...props} />
  </Suspense>
);

export default SkillList;
