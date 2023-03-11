

import { IProjectProps } from '../Projects/ProjectList/Project/Project';
import { androidImg, angularImg, angularMaterialImg, antDesignImg, awsImg, azureImg, azureSearchImg, bashImg, bootstrapImg, cssImg, digitalOceanImg, dockerImg, dotNetImg, dronekitImg, graphqlImg, htmlImg, javaImg, javascriptImg, jenkinsImg, jqueryImg, mongoDbImg, mySqlImg, nextJsImg, nodejsImg, octopusImg, pawnImg, phpImg, postgresImg, powerShellImg, primengImg, pythonImg, raspberryPiImg, reactImg, scipyImg, signalRImg, sqlServerImg, teamCityImg, tensorflowImg, wbGLImg } from './tech-images';
import gtaImg from '../Content/gta.png';
import droneImg from '../Content/drone-diagram.png';
import poslovkoImg from '../Content/poslovko.png';

export declare type IProject = IProjectProps;

const projects: IProject[] = [{
    title: 'Self-flying drone for network performance measurements',
    img: {source: droneImg, alt: 'Project diagram',  width: 650},
    paragraphs: ['The project involved a self-controlled drone holding an Android device that measures network bandwidth. The Web application displays the position, status, and network bandwidth in real-time. Additionally, the users can send basic commands to the drone through the Web application. The drone has sensors on it, making it able to avoid obstacles on the given path.',
        'I worked on developing the AI for drone movement, real-time communication with the server, and server with real-time information about the drone’s position and status. I assisted in developing measurement tests for the Android device that the drone was holding.'],
    tech: [
        {name: '.NET', description: 'Used for server backend.', img: dotNetImg}, 
        {name: 'SignalR', description: 'Used to send information in real-time from server to the browser.', img: signalRImg},
        {name: 'WebGL', description: `Used to display drone's positon in relation to detected obstacles. `, img: wbGLImg}, 
        {name: 'SQL Server', description: 'Database used for the project.', img: sqlServerImg}, 
        {name: 'jQuery', description: 'Used to make the browser interactive.', img: jqueryImg},
        {name: 'JavaScript', description: 'Used to make the browser interactive.', img: javascriptImg},
        {name: 'Bootstrap', description: 'UI library used for the project.', img: bootstrapImg},
        {name: 'RaspberryPi', img: raspberryPiImg, description: 'Little compter that acted as the brain between sensors, movement logic and Android device.'},
        {name: 'Python', description: 'Scripting lanague used for movement AI.', img: pythonImg},
        {name: 'DroneKit.', description: 'Python library to control drone.', img: dronekitImg},
        {name: 'Android/Java', description: 'Used to implement network measurement tests.', imgs: [androidImg, javaImg]},
        {name: 'Azure', description: 'Cloud computing service used to deploy the app.', img: azureImg},
        {name: 'bash', description: 'For Linux configuration on RaspberryPi', img: bashImg}, 
        {name: 'HTML', description: 'For building frontend UI', img: htmlImg},
        {name: 'CSS', description: 'For building frontend UI', img: cssImg},
    ],
    buzzwords: ['IOT', 'AI', 'ML', 'Algorithms']
}, {
    title: 'Work marketplace for finding workers for your short-term projects - PosLovko',
    img: {source: poslovkoImg, alt: 'PosLovko UI',  width: 650},
    paragraphs: ['The platform allows clients to post jobs (when looking for professional help). With the advanced search, professionals can find related jobs and apply to them. Similarly, professionals can publish their services to allow customers to contact them directly. Platform eases communication between client and professional with its real-time chat functionality and notification system. After the professional finishes the task, the client gives a review to the professional, and the professional gives a review for the client that is used for future ranking.',
        `I've developed the whole platform myself.`],
    tech: [
        {name: 'Node.js', description: 'Used for server backend.', img: nodejsImg}, 
        {name: 'PostgreSQL', description: 'Database used for the project and for raising pub-sub events.', img: postgresImg},
        {name: 'React', description: `Framework used for frontend.`, img: reactImg}, 
        {name: 'JavaScript', description: 'Used to make the browser interactive.', img: javascriptImg},
        {name: 'WebSocket', description: 'Used to send information in real-time from server to the browser.'},
        {name: 'AWS', description: 'Cloud computing service used to deploy the app.', img: awsImg},
        {name: 'Python', description: 'Used to scrape available locations.', img: pythonImg}, 
        {name: 'HTML', description: 'For building frontend UI', img: htmlImg},
        {name: 'CSS', description: 'For building frontend UI', img: cssImg},
    ],
    buzzwords: ['Startup', 'Client/Server', 'Algorithms', 'Scraping']
}, {
    title: 'SAAS for settling insurance claims',
    paragraphs: [
        `The solution connects the insurance company and its policyholders with item suppliers and item repair companies allowing policyholders to create claims that will be settled with a replacement or repair depending on the mutual agreement.`,
        `The project is implemented with a Microservice architecture. Application logic is split into different services which work together and accomplish a successful SAAS. There is a service for processing feed files from suppliers that populates/updates the database with available settlements, a service for serving UI for insurance company handlers, a service for finding products that would best replace the item of the claim, a service for serving UI for policyholders, service for processing and ordering settlements, service for booking collections/inspections/repairs, service for invoice generation and other internal services. Mentioned services communicate using message queue and REST HTTP requests.`,
        `I've worked on most of the services, but mainly on the one for UI for insurance company handlers which I took ownership of.`
    ],
    tech: [
        {name: '.NET', description: 'Used for server backend.', img: dotNetImg}, 
        {name: 'SQL Server', description: 'Database used for the project and for raising pub-sub events.', img: sqlServerImg},
        {name: 'React', description: `Framework used for frontend.`, img: reactImg},
        {name: 'Angular', description: `Framework used for frontend.`, img: angularImg}, 
        {name: 'Angular Material', description: 'UI library used for an app used by insurance company handlers.', img: angularMaterialImg},
        {name: 'JavaScript', description: 'Used to make the browser interactive.', img: javascriptImg},
        {name: 'PrimeNG', description: 'UI library used for an app used by clients.', img: primengImg},
        {name: 'Azure', description: 'Cloud computing service used to deploy the app.', img: azureImg},
        {name: 'Azure search', description: 'Quick text search used to find products by their characteristics.', img: azureSearchImg},
        {name: 'Octopus', description: 'Used to manage different SAAS tenants confiration and deployments.', img: octopusImg},
        {name: 'TeamCity', description: 'Used to create build versions used for deployments.', img: teamCityImg},
        {name: 'PowerShell', description: 'Custom scripts used tp configure Octopus and TeamCity', img: powerShellImg}, 
        {name: 'HTML', description: 'For building frontend UI', img: htmlImg},
        {name: 'CSS', description: 'For building frontend UI', img: cssImg},
    ],
    buzzwords: ['Microservices', 'Cloud', 'SAAS']
},{
    title: 'Stock and Cryptocurrency market dashboard',
    paragraphs: [
        `Display different markets in real-time graphs.`,
        `The platform allows users to directly run different technical analyses (TA) on the market graphs and compare them.`,
        'Furthermore, the platform allows users to trigger different actions, such as alerting or order placing, when TA conditions are triggered.'
    ],
    tech: [
        {name: 'React', description: 'Library for UI interactivity.', img: reactImg}, 
        {name: 'Next.js', description: 'React framework.', img: nextJsImg},
        {name: 'Docker', description: `Framework used for frontend.`, img: dockerImg},
        {name: 'WebSocket', description: 'Used to receive real-time market information.'}, 
        {name: 'GraphQL', description: 'For fetching data from the server.', img: graphqlImg }, 
        {name: 'HTML', description: 'For building frontend UI', img: htmlImg},
        {name: 'CSS', description: 'For building frontend UI', img: cssImg},
    ],
    buzzwords: []
}, {
    title: 'Microsoft Dynamics 365 for Finance and Operations',
    paragraphs: [
        <>Enterprise resource planning system for medium to large organizations covering the full spectrum of accounting, financial management, production, advanced warehousing and transportation management (<a href="https://www.google.com/search?q=what+is+microsoft+dynamics+365+for+finance+and+operations" target="_blank" rel="noopener noreferrer">google for more</a>).</>,
        <>The system is split into many modules. I've worked on a warehouse module that was solving challenges with inventory (such as "putting", "picking", counting, reserving inventory, etc.). Generating works for the warehouse workers when orders are received and <a href="https://docs.microsoft.com/en-us/dynamics365/supply-chain/warehousing/warehouse-management-overview" target="_blank" rel="noopener noreferrer">plenty of other stuff</a>.</>,
    ],
    tech: [
        {name: 'X++', description: 'Used for backend and frontend.'}, 
        {name: '.NET', description: 'Used for backend and frontend.', img: dotNetImg}, 
        {name: 'SQL Server', description: 'Database used for the project.', img: sqlServerImg},
        {name: 'PowerShell', description: 'Useful scripts for used to speedup development', img: powerShellImg}
    ],
    buzzwords: ['ERP', 'Cloud', 'SAAS']
} ,{
    title: 'Codeswifter - App for scaffolding applications from Database/Data models',
    paragraphs: [
        <>A Web application that allows you to import your database schema and scaffold apps using custom-defined templates.</>,
        <>It's architected so that multiple users can share the projects created by the same team.</>,
        <>I worked on UI part of the App, and I've done little bits on the server-side.</>
    ],
    tech: [
        {name: '.NET', description: 'Used for backend.', img: dotNetImg}, 
        {name: 'Angular', description: `Framework used for frontend.`, img: angularImg}, 
        {name: 'Angular Material', description: 'UI library used in the project.', img: angularMaterialImg},
        {name: 'JavaScript', description: 'Used to make the browser interactive.', img: javascriptImg},
        {name: 'SQL Server', description: 'Database used for the project.', img: sqlServerImg},
        {name: 'Jenkins', description: 'Continuous integration and continuous delivery tool used.', img: jenkinsImg},
        {name: 'Docker', description: 'Used to ease building and deployment of the app.', img: dockerImg},
        {name: 'DigitalOcean', description: 'Cloud computing service used to deploy the app.', img: digitalOceanImg}, 
        {name: 'HTML', description: 'For building frontend UI', img: htmlImg},
        {name: 'CSS', description: 'For building frontend UI', img: cssImg},
    ],
    buzzwords: ['Cloud', 'AI', 'Startup']
}, {
    title: 'My Portofolio (this webiste)',
    paragraphs: [
        <>My online Curriculum Vitae.</>,
        <>I've developed the whole app myself.</>,
    ],
    tech: [
        {name: '.NET', description: 'Used for backend.', img: dotNetImg}, 
        {name: 'React', description: 'Used for frontend.', img: reactImg},
        {name: 'JavaScript', description: 'Used to make the browser interactive.', img: javascriptImg},
        {name: 'Ant Design', description: 'UI library used in the project.', img: antDesignImg},
        {name: 'Docker', description: 'Used to ease building and deployment of the app.', img: dockerImg},
        {name: 'DigitalOcean', description: 'Cloud computing service used to deploy the app.', img: digitalOceanImg}, 
        {name: 'HTML', description: 'For building frontend UI', img: htmlImg},
        {name: 'CSS', description: 'For building frontend UI', img: cssImg},
    ],
    buzzwords: []
}, {
    title: 'Tractor Plowing Tracking App',
    paragraphs: [
        <>It is a Web platform for tracking field plowing by tractors. It allows users to see the current position of tractors and their movement through the past.</>,
        <>I've developed the whole app myself.</>,
    ],
    tech: [
        {name: '.NET', description: 'Used for backend.', img: dotNetImg}, 
        {name: 'React', description: 'Used for frontend.', img: reactImg},
        {name: 'JavaScript', description: 'Used to make the browser interactive.', img: javascriptImg},
        {name: 'Bootstrap', description: 'UI library used in the project.', img: bootstrapImg},
        {name: 'SignalR', description: 'Used to send information in real-time from server to the browser.', img: signalRImg},
        {name: 'RaspberryPi', description: 'Little compter that is sending current geo position and was attached to the tractors.', img: raspberryPiImg},
        {name: 'Python', description: 'Scripting lanague used sending geo positions to the server.', img: pythonImg},
        {name: 'SQL Server', description: 'Database used for the project.', img: sqlServerImg},
        {name: 'AWS', description: 'Cloud computing service used to deploy the app.', img: awsImg}, 
        {name: 'HTML', description: 'For building frontend UI', img: htmlImg},
        {name: 'CSS', description: 'For building frontend UI', img: cssImg},
    ],
    buzzwords: ['IOT', 'Cloud']
}, {
    title: 'Web app for log analysis for PosLovko - Supporko',
    paragraphs: [
        <>It is a Web application that eases log analysis for PosLovko. It allows users to filter out the errors and display logs generated for a particular job/user, allowing easier troubleshooting of production errors.</>,
        <>I've developed the whole app myself.</>,
    ],
    tech: [
        {name: 'Node.js', description: 'Used for backend.', img: nodejsImg},
        {name: 'React', description: 'Used for frontend.', img: reactImg},
        {name: 'JavaScript', description: 'Used to make the browser interactive.', img: javascriptImg},
        {name: 'MaterialUI', description: 'UI library used in the project.'},        
        {name: 'PostgreSQL', description: 'Database used for the project.', img: postgresImg},
        {name: 'DigitalOcean', description: 'Cloud computing service used to deploy the app.', img: digitalOceanImg}, 
        {name: 'HTML', description: 'For building frontend UI', img: htmlImg},
        {name: 'CSS', description: 'For building frontend UI', img: cssImg},
    ], 
    buzzwords: ['Cloud', 'DevOps']
}, {
    title: 'Tuition center management application',
    paragraphs: [
        <>The application allows teachers to maintain the time of their courses, their classes, and their students.</>,
        <>I've developed the whole server myself.</>,
    ],
    tech: [
        {name: 'jQuery', description: 'Used to make the browser interactive.', img: jqueryImg},
        {name: 'JavaScript', description: 'Used to make the browser interactive.', img: javascriptImg},
        { name: 'PHP', description: 'Used for backend', img: phpImg},
        { name: 'MySQL', description: 'Database used for the project.', img: mySqlImg}, 
        {name: 'HTML', description: 'For building frontend UI', img: htmlImg},
        {name: 'CSS', description: 'For building frontend UI', img: cssImg},
    ],
    buzzwords: ['eLearning']
}, {
    title: 'GTA San Andreas Multiplayer Roleplay Server - Towny RP',
    img: { source: gtaImg, alt: 'GTA San Andreas', width: 542 },
    paragraphs: [
        <>Towny RP is a custom-made roleplay server for <a href="https://www.sa-mp.com/" target="_blank" rel="noopener noreferrer">San Andreas Multiplayer</a>. On top of what Grand Theft Auto: San Andreas offers, players can find a job and, earn money, join gangs or mafias to fight over the drugs and weapon business. Alternatively, players can join factions. There are Police Departments in big cities and Sheriffs' Departments in villages that are supposed to fight crime. Other factions such as ambulance, firefighters, FBI, government, hitman agency, and others make the roleplay very exciting. Custom casinos have been designed and implemented, allowing users to play Holdem Texas Poker. Players distribute given skill points to their character skills. That makes them unique to other players. Available skills were: strength, health, speed, agility, shooting, reflexes, intelligence, poker, detective, and others. There are other features that the roleplay server offers.  
        </>,
        <>I've developed the whole server myself.</>,
    ],
    tech: [
        {name: 'Pawn', description: 'Programming language used to write servers for San Andreas Multiplayer Servers.', img: pawnImg},
        {name: 'PHP', description: 'Scripting language used to communicate with outside resources.', img: phpImg},      
        {name: 'MySQL', description: 'Database used.', img: mySqlImg},
    ], 
    buzzwords: ['Gaming']
}, {
    title: 'MongoDB - 2 semester university course',
    paragraphs: [
        <>In the 2 semester course, I've learned basic MongoDB features and its usages in the industry.</>,
    ],
    tech: [
        {name: 'mongoDB', description: 'Topic of the course.', img: mongoDbImg},
    ], 
    buzzwords: [],
    hideWithAll: true
}, {
    title: 'Artificial Intelligence  - 2 semester university course',
    paragraphs: [
        <>In the 2 semester course, we used SciPi and scikit-learn to implement advanced AI algorithms.</>,
    ],
    tech: [
        {name: 'SciPy', description: 'Python package for AI.', img: scipyImg},
        {name: 'Python', description: 'Programming language used in the course.', img: pythonImg},
    ], 
    buzzwords: [],
    hideWithAll: true
}, {
    title: 'Deep Learning  - 2 semester university course',
    paragraphs: [
        <>In the 2 semester course, we used TensorFlow to implement different neural networks.</>,
    ],
    tech: [
        {name: 'TensorFlow', description: 'Python package for building and training neural networks.', img: tensorflowImg},
        {name: 'Python', description: 'Programming language used in the course.', img: pythonImg},
    ], 
    buzzwords: [],
    hideWithAll: true
}, {
    title: 'QraphQL tutorial',
    paragraphs: [
        <>A simple app to test QraphQL basics.</>,
    ],
    tech: [
        {name: 'GraphQL', description: 'Data query language used to fetch data', img: graphqlImg},
        {name: 'Node.js', description: 'Used for backend.', img: nodejsImg},
        {name: 'React', description: 'Used for frontend.', img: reactImg},
        {name: 'JavaScript', description: 'Used to make the browser interactive.', img: javascriptImg}, 
        {name: 'HTML', description: 'For building frontend UI', img: htmlImg},
        {name: 'CSS', description: 'For building frontend UI', img: cssImg},
    ], 
    buzzwords: [],
    hideWithAll: true
}];
export default projects;