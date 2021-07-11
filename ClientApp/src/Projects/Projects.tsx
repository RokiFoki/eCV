import { AutoComplete, Divider, Input, PageHeader, Tag } from 'antd';
import React, { useState } from 'react';
import styles from './Projects.module.scss';
import projects, { IProject } from '../Shared/projects-data';
import ProjectList from './ProjectList/ProjectList';

const Projects = () => {
  const [techInputValue, setTechInputValue] = useState('');
  const [buzzWordsInputValue, setbuzzWordsInputValue] = useState('');
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [selectedBuzzwords, setSelectedBuzzwords] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('');


  let projectsToDisplay: IProject[] = projects;
  if (selectedTechs.length) {
    projectsToDisplay = projectsToDisplay.filter(p => p.tech.some(t => selectedTechs.includes(t.name)));
  }

  if (selectedBuzzwords.length) {
    projectsToDisplay = projectsToDisplay.filter(p => p.buzzwords.some(b => selectedBuzzwords.includes(b)));
  }

  if (searchValue.length) {
    const searchValueLowerCase = searchValue.toLowerCase();

    projectsToDisplay = projectsToDisplay.filter(p => 
      p.title.toLowerCase().includes(searchValueLowerCase) ||
      p.paragraphs.some(par => par.toString().toLowerCase().includes(searchValueLowerCase)) ||
      p.tech.some(t => t.name.toLowerCase().includes(searchValueLowerCase)) ||
      p.buzzwords.some(b => selectedBuzzwords.includes(b)));
  }

  if (!selectedTechs.length && !selectedBuzzwords.length && !searchValue) {
    projectsToDisplay = projects.filter(p => !p.hideWithAll);
  }

  const avalilTech = [...new Set(([] as string[]).concat(...projects.map(p => p.tech.map(t => t.name))))].filter(t => !selectedTechs.includes(t)).map(value => ({value: value}));
  avalilTech.sort((a, b) => a.value.localeCompare(b.value));
  const avalilBuzzWords = [...new Set(([] as string[]).concat(...projects.map(p => p.buzzwords)))].filter(b => !selectedBuzzwords.includes(b)).map(value => ({value: value}));
  avalilBuzzWords.sort((a, b) => a.value.localeCompare(b.value));

  const onSelectTech = (selected: string) => {
    setSelectedTechs((techs: string[]) => {
      return techs.concat(selected)
    })
    setTechInputValue('');
  }
  const onSelectBuzz = (selected: string) => {
    setSelectedBuzzwords((buzzwords: string[]) => {
      return buzzwords.concat(selected)
    })
    setbuzzWordsInputValue('');
  }

  const onChangeTech = (val: string) => {
    setTechInputValue(val);
  }
  const onChangeBuzz = (val: string) => {
    setbuzzWordsInputValue(val);
  }

  const removeTechTag = (techToremove: string, e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setSelectedTechs((techs: string[]) => {
      return [...techs.filter(t => t !== techToremove)];
    })
  }

  const removeBuzzwordTag = (buzzwordToRemove: string, e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setSelectedBuzzwords((buzzs: string[]) => {
      return [...buzzs.filter(b => b !== buzzwordToRemove)];
    })
  }

  const onSearchChange = (val: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(val.target.value);
  }

  return (
  <div className={styles.Projects}>
    <PageHeader title="Projects" className='page-title' />
    <section className={styles.Filters}>
      <section className={styles.FilterSection}>
        <div className={styles.Label}>
          Search:
        </div>
        <Input
          className={styles.SearchInput}
          value={searchValue}
          onChange={onSearchChange}
          allowClear
        />
      </section>
      <div className={styles.BuzzAndTechFilters}>
        <section className={styles.FilterSection}>
          <div className={styles.Label}>
            Tech: 
          </div>
          <div className={styles.AutoCompleteAndTags}>
            <AutoComplete
              className={styles.AutoComplete}
              value={techInputValue}
              options={avalilTech}
              onSelect={onSelectTech}
              onChange={onChangeTech}
              filterOption={(inputValue, option) => option!.value.toUpperCase().includes(inputValue.toUpperCase())}
            />
            <div className={styles.Tags}>
              {selectedTechs.map(t => (
                <Tag closable key={t} onClose={(e) => removeTechTag(t, e)}>{t}</Tag>
              ))}
            </div>
          </div>
        </section>
        <section className={styles.FilterSection}>
        <div className={styles.Label}>
          Buzzwords: 
        </div>
        <div className={styles.AutoCompleteAndTags}>
          <AutoComplete
            className={styles.AutoComplete}
            value={buzzWordsInputValue}
            options={avalilBuzzWords}
            onSelect={onSelectBuzz}
            onChange={onChangeBuzz}
            filterOption={(inputValue, option) => option!.value.toUpperCase().includes(inputValue.toUpperCase())}
          />
          <div className={styles.Tags}>
            {selectedBuzzwords.map(t => (
              <Tag closable key={t} onClose={(e) => removeBuzzwordTag(t, e)}>{t}</Tag>
            ))}
          </div>
        </div>
      </section>
      </div>
    </section>
    <Divider />

    <ProjectList projects={projectsToDisplay}></ProjectList>
  </div>
)};

export default Projects;
