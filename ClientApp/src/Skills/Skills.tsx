import { PageHeader, Radio } from 'antd';
import React, { useState } from 'react';
import styles from './Skills.module.scss';
import SkillTree3D, { SkillTree3DProps } from './SkillTree3D/SkillTree3D';

const Skills = (props: SkillTree3DProps) => {
  const [skillsView, updateSkillsView] = useState<'list' | 'tree' | '3dtree'>('list');

  return <div className={styles.Skills}>    
      <PageHeader title="Skills" className='page-title' />
      <div>
        <label style={{marginRight: 10}}>
          Skills view:
        </label>
        <Radio.Group value={skillsView} onChange={(e) => updateSkillsView(e.target.value)}>
          <Radio.Button value="list">List</Radio.Button>
          <Radio.Button value="tree">Tree</Radio.Button>
          <Radio.Button value="3dtree">3D tree</Radio.Button>
        </Radio.Group>
      </div>

      {/* {skillsView === 'list' && <SkillTree {...props}></SkillTree>} */}
      {/* {skillsView === 'tree' && <SkillTree {...props}></SkillTree>} */}
      {skillsView === '3dtree' && <SkillTree3D {...props}></SkillTree3D>}
    </div>;
}

export default Skills;
