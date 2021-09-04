import { angularImg, awsImg, azureImg, bashImg, cssImg, digitalOceanImg, dockerImg, dotNetImg, graphqlImg, htmlImg, javascriptImg, mongoDbImg, mySqlImg, nodejsImg, octopusImg, postgresImg, powerShellImg, pythonImg, reactImg, scipyImg, sqlServerImg, teamCityImg, tensorflowImg } from './tech-images';

export interface ISkillNoLevel {
    level?: number,
    name: string,
    key?: string,
    children: ISkillNoLevel[],
    url?: string,
    experience: number | 'avg' | 'max' | 'min',
    hideInTree?: boolean
}


export interface ISkill extends ISkillNoLevel {
    level: number,
    children: ISkill[],
    experience: number;
    key: string;
    hideInTree: boolean;
}

const avg = (exps: number[]) => exps.length && exps.reduce((a, b) => a + b, 0) / exps.length;
const max = (exps: number[]) => exps.reduce((a, b) => a > b ? a : b, 0);
const min = (exps: number[]) => exps.reduce((a, b) => a > b ? b : a, 99999);

const skills: ISkillNoLevel[] = [{
    level: 0,
    name: 'Full Stack',
    experience: 'avg', 
    children: [{
        name: 'Backend',
        experience: 'max',
        children: [{
            name: '.NET',
            children: [],
            experience: 90,
            url: dotNetImg
        }, {
            name: 'Node.js',
            children: [],
            experience: 90,
            url: nodejsImg
        }, {
            name: 'Database',
            experience: 'max',
            children: [{
                name: 'SQL',
                experience: 'max',
                children: [{
                    name: 'PostgreSQL',
                    children: [],
                    experience: 90,
                    url: postgresImg
                }, {
                    name: 'SQL Server',
                    children: [],
                    experience: 90,
                    url: sqlServerImg
                }, {
                    name: 'MySQL',
                    children: [],
                    experience: 50,
                    url: mySqlImg
                }]
            }, {
                name: 'NoSQL',
                experience: 'max',
                children: [{
                    name: 'mongoDB',
                    children: [],
                    experience: 40,
                    url: mongoDbImg
                }]
            }]
        }]
    }, {
        name: 'Frontend',
        experience: 'max',
        children: [{
            name: 'Angular',
            key: 'All Angulars',
            experience: 'max',
            children: [{
                name: 'Angular2+',
                key: 'Angular',
                children: [],
                experience: 90,
                url: angularImg
            }, {
                name: 'AngularJS',
                children: [],
                experience: 90,
                url: angularImg
            }]
        }, {
            name: 'React',
            children: [],
            experience: 75,
            url: reactImg
        }]
    }]
}, {
    level: 1,
    name: 'Data Science',
    experience: 'max',
    children: [{
        name: 'SciPy',
        children: [],
        experience: 40,
        url: scipyImg
    }, {
        name: 'TensorFlow',
        children: [],
        experience: 50,
        url: tensorflowImg
    }]
}, {
    level: 1,
    name: 'DevOps',
    experience: 'avg',
    children: [{
        name: 'Scripting',
        experience: 'max',
        children: [{
            name: 'Python',
            children: [],
            experience: 80,
            url: pythonImg
        }, {
            name: 'bash', 
            children: [],
            experience: 65,
            url: bashImg
        }, {
            name: 'PowerShell',
            children: [],
            experience: 35,
            url: powerShellImg
        }]
    }, {
        name: 'Octopus', 
        children: [],
        experience: 80,
        url: octopusImg
    }, {
        name: 'TeamCity',
        children: [],
        experience: 80,
        url: teamCityImg
    }, {
        name: 'Docker',
        children: [],
        experience: 70,
        url: dockerImg
    },
    {
        name: 'Cloud Platforms',
        experience: 'max',
        children: [{
            name: 'AWS',
            children: [],
            experience: 65,
            url: awsImg
        }, {
            name: 'Azure',
            children: [],
            experience: 65,
            url: azureImg
        }, {
            name: 'DigitalOcean',
            children: [],
            experience: 65,
            url: digitalOceanImg
        }]
    }]
}, {
    name: 'GraphQL',
    children: [],
    experience: 55,
    hideInTree: true,
    url: graphqlImg
}, {
    name: 'JavaScript',
    children: [],
    experience: 100,
    hideInTree: true,
    url: javascriptImg
}, {
    name: 'HTML',
    children: [],
    experience: 100,
    hideInTree: true,
    url: htmlImg
}, {
    name: 'CSS',
    children: [],
    experience: 100,
    hideInTree: true,
    url: cssImg
}]

const updateNodes = (data: ISkillNoLevel, level=1) => {
    if (data.level === undefined) {
        data.level = level;
    }

    if (data.key === undefined) {
        data.key = data.name;
    }

    if (data.hideInTree === undefined) {
        data.hideInTree = false;
    }
    
    for (const node of data.children) {
        updateNodes(node, data.level+1);
    }

    if (data.experience === 'avg') {
        data.experience = avg(data.children.map(c => c.experience as number));
    } else if (data.experience === 'max') {
        data.experience = max(data.children.map(c => c.experience as number));
    } else if (data.experience === 'min') {
        data.experience = min(data.children.map(c => c.experience as number));
    }

    return data as ISkill;
}

function *treeToList(nodes: ISkill[]): Generator<ISkill> {
    for (const n of nodes) {
        yield n;
        for (const e of [...treeToList(n.children)]) {
        yield e;
        }
    }
}

const skillsTree = skills.map(skill => updateNodes(skill));
const skillsList = [...treeToList(skillsTree)]
export { skillsTree, skillsList };