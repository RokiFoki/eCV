import { AutoComplete, Divider, Input, PageHeader, Tag } from 'antd';
import React, { useState } from 'react';
import styles from './Projects.module.scss';
import projects, { IProject } from '../Shared/projects-data';
import ProjectList from './ProjectList/ProjectList';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';

function useFiltersQuery() {
  const queryParams = new URLSearchParams(useLocation().search);

  return ({
    selectedTechs: queryParams.get('tech')?.split(',').filter(t => projects.some(p => p.tech.map(p => p.name).includes(t))) || [],
    selectedBuzzwords: queryParams.get('buzz')?.split(',').filter(t => projects.some(p => p.buzzwords.includes(t))) || [],
    searchValue: queryParams.get('search') || ''
  });
}

const Projects = () => {
  const { selectedTechs, selectedBuzzwords, searchValue } = useFiltersQuery();
  const { url } = useRouteMatch();
  const history = useHistory();
  const [techInputValue, setTechInputValue] = useState('');
  const [buzzWordsInputValue, setbuzzWordsInputValue] = useState('');
  
  const buildUrl = ({tech, buzz, search}: {tech: string[], buzz: string[], search: string}) => {
    let newUrl = url;
    let separator = '';
    if (tech.length || buzz.length || search.length) {
      newUrl += '?';

      if (tech.length) {
        newUrl += `${separator}tech=${tech.join(',')}`;
        separator = '&'
      }

      if (buzz.length) {
        newUrl += `${separator}buzz=${buzz.join(',')}`;
        separator = '&'
      }

      if (search.length) {
        newUrl += `${separator}search=${search}`;
        separator = '&'
      }
    }

    history.push(newUrl);
  }


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
    buildUrl({tech: selectedTechs.concat(selected), buzz: selectedBuzzwords, search: searchValue });
    setTechInputValue('');
  }
  const onSelectBuzz = (selected: string) => {
    buildUrl({tech: selectedTechs, buzz: selectedBuzzwords.concat(selected), search: searchValue });    
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
    buildUrl({tech: selectedTechs.filter(t => t !== techToremove), buzz: selectedBuzzwords, search: searchValue});
  }

  const removeBuzzwordTag = (buzzwordToRemove: string, e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    buildUrl({tech: selectedTechs, buzz: selectedBuzzwords.filter(b => b !== buzzwordToRemove), search: searchValue});
  }

  const onSearchChange = (val: React.ChangeEvent<HTMLInputElement>) => {
    buildUrl({tech: selectedTechs, buzz: selectedBuzzwords, search: val.target.value});
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
