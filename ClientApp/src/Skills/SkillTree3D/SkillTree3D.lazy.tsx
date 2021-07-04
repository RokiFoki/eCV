import React, { lazy, Suspense } from 'react';
import { SkillTree3DProps } from './SkillTree3D';

const LazySkillTree3D = lazy(() => import('./SkillTree3D'));

const SkillTree3D = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; } & SkillTree3DProps) => (
  <Suspense fallback={null}>
    <LazySkillTree3D {...props} />
  </Suspense>
);

export default SkillTree3D;
