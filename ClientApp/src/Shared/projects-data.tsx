

import { IProjectProps as IProject } from '../Projects/ProjectList/Project/Project';
import { androidImg, angularImg, angularMaterialImg, antDesignImg, awsImg, azureImg, azureSearchImg, bootstrapImg, digitalOceanImg, dockerImg, dotNetImg, dronekitImg, javaImg, javascriptImg, jenkinsImg, jqueryImg, mongoDbImg, mySqlImg, nodejsImg, octopusImg, pawnImg, phpImg, postgresImg, primengImg, pythonImg, raspberryPiImg, reactImg, scipyImg, signalRImg, sqlServerImg, teamCityImg, tensorflowImg, wbGLImg } from './tech-images';
import gtaImg from '../Content/gta.png';
import droneImg from '../Content/drone-diagram.png';
import poslovkoImg from '../Content/poslovko.png';


const projects: IProject[] = [{
    title: 'Self flying drone for network performance measurements',
    img: {source: droneImg, alt: 'Project diagram',  width: 650},
    paragraphs: ['The project involved a drone that is self-controlled, holding an Android device that measures network bandwidth. The position, status, and network bandwidth are displayed in real-time on a web application where users can send basic commands to the drone. The drone has sensors on it making it able to avoid obstacles on the given path.',
        'I worked on the development of the AI for drone movement, real-time communication with the server, server with real-time information about the drone’s position and status. Assisted in developing measurement tests for the Android device that the drone was holding.'],
    tech: [
        {name: '.NET', description: 'Used for server backend.', img: dotNetImg}, 
        {name: 'SignalR', description: 'Used to send information in real-time from server to the browser.', img: signalRImg},
        {name: 'WebGL', description: `Used to display drone's positon in relation to detected obstacles. `, img: wbGLImg}, 
        {name: 'SQL Server', description: 'Database used for the project.', img: sqlServerImg}, 
        {name: 'JavaScript/jQuery', description: 'Used to make the browser interactive.', imgs: [jqueryImg, javascriptImg]},
        {name: 'Bootstrap', description: 'UI library used for the project.', img: bootstrapImg},
        {name: 'RaspberryPi', img: raspberryPiImg, description: 'Little compter that acted as the brain between sensors, movement logic and Android device.'},
        {name: 'Python', description: 'Scripting lanague used for movement AI.', img: pythonImg},
        {name: 'DroneKit.', description: 'Python library to control drone.', img: dronekitImg},
        {name: 'Android/Java', description: 'Used to implement network measurement tests.', imgs: [androidImg, javaImg]},
        {name: 'Azure', description: 'Clould computing service used to deploy the app.', img: azureImg}, 
    ],
    buzzwords: ['IOT', 'AI', 'ML']
}, {
    title: 'Work marketplace for finding workers for your shortterm projects - PosLovko',
    img: {source: poslovkoImg, alt: 'PosLovko UI',  width: 650},
    paragraphs: ['The platform allows clients to post jobs (when looking for professional help). Professionals, with the advanced search, can find related jobs and apply to them. Similarly, professionals can post their services to allow customers to contact them directly. Platform eases communication between client and professional with its real-time chat functionality and notification system. After the professional finishes the task, the client gives a review to the professional, and the professional gives a review for the client that is used for future ranking.',
        `I've developed the whole platform myself.`],
    tech: [
        {name: 'Node.js', description: 'Used for server backend.', img: nodejsImg}, 
        {name: 'PostgreSQL', description: 'Database used for the project and for raising pub-sub events.', img: postgresImg},
        {name: 'Angular', description: `Framework used for frontend.`, img: angularImg}, 
        {name: 'WebSocket', description: 'Used to send information in real-time from server to the browser.'}, 
        {name: 'Angular Material', description: 'UI library used for the project.', img: angularMaterialImg},
        {name: 'AWS', description: 'Clould computing service used to deploy the app.', img: awsImg},
        {name: 'Python', description: 'Used to scrape available locations.', img: pythonImg}
    ],
    buzzwords: ['Startup', 'Client/Server', 'Algorithms', 'Scraping']
}, {
    title: 'SAAS for settling insurance claims',
    paragraphs: [
        `The solution connects the insurance company, its policyholders with item suppliers and item repair companies allowing policyholders to create claims, which can be settled with a replacement or repair depending on the mutual agreement.`,
        `For the solution, microservice architecture is used. Its logic is split into different services which work together and accomplish successful SAAS. There is a service for processing feed files from suppliers that populates/updates the database with available settlements, a service for serving UI for insurance company handlers, a service for finding products that would best replace the item in the claim, a service for serving UI for policyholders, service for processing and ordering settlements, service for booking collections/inspections/repairs, service for invoice generation and other internal services. Mentioned services communicate using message queue and REST HTTP requests.`,
        `I've worked on most of the services, but mostly on the one for UI for insurance company handlers which I took ownership off.`
    ],
    tech: [
        {name: '.NET', description: 'Used for server backend.', img: dotNetImg}, 
        {name: 'SQL Server', description: 'Database used for the project and for raising pub-sub events.', img: sqlServerImg},
        {name: 'Angular', description: `Framework used for frontend.`, img: angularImg},
        {name: 'AngularJS', description: `Framework used for frontend.`, img: angularImg}, 
        {name: 'Angular Material', description: 'UI library used for an app used by insurance company handlers.', img: angularMaterialImg},
        {name: 'PrimeNG', description: 'UI library used for an app used by clients.', img: primengImg},
        {name: 'Azure', description: 'Clould computing service used to deploy the app.', img: azureImg},
        {name: 'Azure search', description: 'Quick text search used to find products by their characteristics.', img: azureSearchImg},
        {name: 'Octopus', description: 'Used to manage different SAAS tenants confiration and deployments.', img: octopusImg},
        {name: 'TeamCity', description: 'Used to create build versions used for deployments.', img: teamCityImg},
    ],
    buzzwords: ['Microservices', 'Cloud', 'SAAS']
}, {
    title: 'Microsoft Dynamics 365 for Finance and Operations',
    paragraphs: [
        <>Enterprise resource planning system for medium to large organizations covering the full spectrum of accounting, financial management, production, advanced warehousing and transportation management (<a href="https://www.google.com/search?q=what+is+microsoft+dynamics+365+for+finance+and+operations" target="_blank">google for more</a>).</>,
        <>The system is split into many modules. I've worked on a warehouse module that was solving challenges with inventory (such as "putting", "picking", counting, reserving inventory, etc). Generating works for the warehouse workers when orders received and <a href="https://docs.microsoft.com/en-us/dynamics365/supply-chain/warehousing/warehouse-management-overview" target="_blank">plenty of other stuff</a>.</>,
    ],
    tech: [
        {name: 'X++ (.NET)', description: 'Used for backend and frontend.', img: dotNetImg}, 
        {name: 'SQL Server', description: 'Database used for the project.', img: sqlServerImg},
    ],
    buzzwords: ['ERP', 'Cloud', 'SAAS']
} ,{
    title: 'Codeswifter - App for scaffolding applications from Database/Data models',
    paragraphs: [
        <>Web application that allows you to import your database schema and scaffold apps using it with custom defined templates.</>,
        <>Its arhitected in a way that the projects created can be shared within multiple users in he same team.</>,
        <>I worked on part of the frontend of the app and I've done little bits on the backend.</>
    ],
    tech: [
        {name: '.NET', description: 'Used for backend.', img: dotNetImg}, 
        {name: 'Angular', description: `Framework used for frontend.`, img: angularImg}, 
        {name: 'Angular Material', description: 'UI library used in the project.', img: angularMaterialImg},
        {name: 'SQL Server', description: 'Database used for the project.', img: sqlServerImg},
        {name: 'Jenkins', description: 'Continuous integration and continuous delivery tool used.', img: jenkinsImg},
        {name: 'Docker', description: 'Used to ease building and deployment of the app.', img: dockerImg},
        {name: 'DigitalOcean', description: 'Clould computing service used to deploy the app.', img: digitalOceanImg}
    ],
    buzzwords: ['Clould', 'AI', 'Startup']
}, {
    title: 'My Portofolio (this webiste)',
    paragraphs: [
        <>My online Curriculum Vitae.</>,
        <>I've developed the whole app myself.</>,
    ],
    tech: [
        {name: '.NET', description: 'Used for backend.', img: dotNetImg}, 
        {name: 'React', description: 'Used for frontend.', img: reactImg},
        {name: 'Ant Design', description: 'UI library used in the project.', img: antDesignImg},
        {name: 'Docker', description: 'Used to ease building and deployment of the app.', img: dockerImg},
        {name: 'DigitalOcean', description: 'Clould computing service used to deploy the app.', img: digitalOceanImg}
    ],
    buzzwords: []
}, {
    title: 'Tractor Plowing Tracking App',
    paragraphs: [
        <>Web platform for tracking field plowing by tractors. It allows users to see the current position of tractors and their movement through the past.</>,
        <>I've developed the whole app myself.</>,
    ],
    tech: [
        {name: '.NET', description: 'Used for backend.', img: dotNetImg}, 
        {name: 'jQuery/Javascript', description: 'Used for frontend.', imgs: [jqueryImg, javascriptImg]},
        {name: 'Bootstrap', description: 'UI library used in the project.', img: bootstrapImg},
        {name: 'SignalR', description: 'Used to send information in real-time from server to the browser.', img: signalRImg},
        {name: 'RaspberryPi', description: 'Little compter that is sending current geo position and was attached to the tractors.', img: raspberryPiImg},
        {name: 'Python', description: 'Scripting lanague used sending geo positions to the server.', img: pythonImg},
        {name: 'SQL Server', description: 'Database used for the project.', img: sqlServerImg},
        {name: 'AWS', description: 'Clould computing service used to deploy the app.', img: awsImg},
    ],
    buzzwords: ['IOT', 'Clould']
}, {
    title: 'Web app for log analysis for PosLovko - Supporko',
    paragraphs: [
        <>Web application that eases log analysis for PosLovko. It allows users to filter out the errors and display logs generated for a particular job/user which allows easier troubleshooting of production errors.</>,
        <>I've developed the whole app myself.</>,
    ],
    tech: [
        {name: 'Node.js', description: 'Used for backend.', img: nodejsImg},
        {name: 'Angular', description: 'Used for frontend.', img: angularImg},
        {name: 'Angular Material', description: 'UI library used in the project.', img: angularMaterialImg},        
        {name: 'PostgreSQL', description: 'Database used for the project.', img: postgresImg},
        {name: 'DigitalOcean', description: 'Clould computing service used to deploy the app.', img: digitalOceanImg}
    ], 
    buzzwords: ['Could', 'DevOps']
}, {
    title: 'Tuition centre management application',
    paragraphs: [
        <>The application allows teachers to maintain the time of their courses, their classes and their students.</>,
        <>I've developed the whole server myself.</>,
    ],
    tech: [
        {name: 'JavaScript/jQuery', description: 'Used to make the browser interactive.', imgs: [jqueryImg, javascriptImg]},
        { name: 'PHP', description: 'Used for backend', img: phpImg},
        { name: 'MySQL', description: 'Database used for the project.', img: mySqlImg}
    ],
    buzzwords: ['eLearning']
}, {
    title: 'GTA San Andreas Multiplayer Roleplay Server - Towny RP',
    img: { source: gtaImg, alt: 'GTA San Andreas', width: 542 },
    paragraphs: [
        <>Towny RP is a custom-made roleplay server for <a href="https://www.sa-mp.com/" target="_blank">San Andreas Multiplayer</a>. On top of what Grand Theft Auto: San Andreas offers, 
        players can find a job and earn money, join gangs or mafias to fight over the drugs and weapon business. Alternatively, players can join factions. There are Police Departments in 
        big cities and Sheriffs' Departments in villages that are supposed to fight crime. There are other factions such as ambulance, firefighters, FBI, government, hitman agency and others 
        that make the roleplay very exciting. Custom casinos have been designed and implemented allowing users to play Holdem Texas Poker. Players distribute given skill points to their 
        character skills. That makes them unique to other players. Available skills were: strength, health, speed, agility, shooting, reflexes, intelligence, poker, detective, and others. 
        There are other features that the roleplay server offers.  
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
}];
export default projects;