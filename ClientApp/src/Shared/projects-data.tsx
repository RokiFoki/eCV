import droneImg from '../Content/drone-diagram.png';
import poslovkoImg from '../Content/poslovko.png';
import { IProjectProps as IProject } from '../Projects/Project/Project';

const projects: IProject[] = [{
    title: 'Self flying drone for network performance measurements',
    img: {source: droneImg, alt: 'Project diagram',  width: 650},
    paragraphs: ['The project involved a drone that is self-controlled, holding an Android device that measures network bandwidth. The position, status, and network bandwidth are displayed in real-time on a web application where users can send basic commands to the drone. The drone has sensors on it making it able to avoid obstacles on the given path.',
        'I worked on the development of the AI for drone movement, real-time communication with the server, server with real-time information about the drone’s position and status. Assisted in developing measurement tests for the Android device that the drone was holding.'],
    tech: [
        {name: '.NET', description: 'Used for server backend.'}, 
        {name: 'SignalR', description: 'Used to send information in real-time from server to the browser.'},
        {name: 'WebGL', description: `Used to display drone's positon in relation to detected obstacles. `}, 
        {name: 'SQL Server', description: 'Database used for the project.'}, 
        {name: 'JavaScript/jQuery', description: 'Used to make the browser interactive.'},
        {name: 'Bootstrap', description: 'UI library used for the project.'},
        {name: 'RaspberryPi', description: 'Little compter that acted as the brain between sensors, movement logic and Android device.'},
        {name: 'Python', description: 'Scripting lanague used for movement AI.'},
        {name: 'DroneKit.', description: 'Python library to control drone.'},
        {name: 'Android/Java', description: 'Used to implement network measurement tests.'},
        {name: 'Azure', description: 'Clould computing service used to deploy the app.'}, 
    ],
    buzzwords: ['IOT', 'AI', 'ML']
}, {
    title: 'Work marketplace for finding workers for your shortterm projects - PosLovko',
    img: {source: poslovkoImg, alt: 'PosLovko UI',  width: 650},
    paragraphs: ['The platform allows clients to post jobs (when looking for professional help). Professionals, with the advanced search, can find related jobs and apply to them. Similarly, professionals can post their services to allow customers to contact them directly. Platform eases communication between client and professional with its real-time chat functionality and notification system. After the professional finishes the task, the client gives a review to the professional, and the professional gives a review for the client that is used for future ranking.',
        `I've developed the whole platform myself.`],
    tech: [
        {name: 'Node.js', description: 'Used for server backend.'}, 
        {name: 'PostgreSQL', description: 'Database used for the project and for raising pub-sub events.'},
        {name: 'Angular/Javascript', description: `Framework used for frontend. `}, 
        {name: 'WebSocket', description: 'Used to send information in real-time from server to the browser.'}, 
        {name: 'Angular Material', description: 'UI library used for the project.'},
        {name: 'AWS', description: 'Clould computing service used to deploy the app.'},
        {name: 'python', description: 'Used to scrape available locations.'}
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
        {name: '.NET', description: 'Used for server backend.'}, 
        {name: 'SQL Server', description: 'Database used for the project and for raising pub-sub events.'},
        {name: 'Angular/Javascript', description: `Framework used for frontend. `}, 
        {name: 'Angular Material', description: 'UI library used for an app used by insurance company handlers.'},
        {name: 'PrimeNG', description: 'UI library used for an app used by clients.'},
        {name: 'Azure', description: 'Clould computing service used to deploy the app.'}
    ],
    buzzwords: ['Microservices', 'Cloud', 'SAAS']
}, {
    title: 'Microsoft Dynamics 365 for Finance and Operations',
    paragraphs: [
        <>Enterprise resource planning system for medium to large organizations covering the full spectrum of accounting, financial management, production, advanced warehousing and transportation management (<a href="https://www.google.com/search?q=what+is+microsoft+dynamics+365+for+finance+and+operations" target="_blank">google for more</a>).</>,
        <>The system is split into many modules. I've worked on a warehouse module that was solving challenges with inventory (such as "putting", "picking", counting, reserving inventory, etc). Generating works for the warehouse workers when orders received and <a href="https://docs.microsoft.com/en-us/dynamics365/supply-chain/warehousing/warehouse-management-overview" target="_blank">plenty of other stuff</a>.</>,
    ],
    tech: [
        {name: 'X++ (.NET)', description: 'Used for backend and frontend.'}, 
        {name: 'SQL Server', description: 'Database used for the project and for raising pub-sub events.'},
    ],
    buzzwords: ['ERP', 'Cloud', 'SAAS']
}, {
    title: 'My Portofolio (this webiste)',
    paragraphs: [
        <>My online Curriculum Vitae.</>,
        <>I've developed the whole app myself.</>,
    ],
    tech: [
        {name: '.NET', description: 'Used for backend.'}, 
        {name: 'React', description: 'Used for frontend.'},
        {name: 'Ant Design', description: 'UI library used in the project.'},
        {name: 'Docker', description: 'Used to ease building and deployment of the app.'},
        {name: 'Digital Ocean', description: 'Clould computing service used to deploy the app.'}
    ],
    buzzwords: []
}, {
    title: 'Tractor Plowing Tracking App',
    paragraphs: [
        <>Web platform for tracking field plowing by tractors. It allows users to see the current position of tractors and their movement through the past.</>,
        <>I've developed the whole app myself.</>,
    ],
    tech: [
        {name: '.NET', description: 'Used for backend.'}, 
        {name: 'jQuery', description: 'Used for frontend.'},
        {name: 'Bootstrap', description: 'UI library used in the project.'},
        {name: 'SignalR', description: 'Used to send information in real-time from server to the browser.'},
        {name: 'RaspberryPi', description: 'Little compter that is sending current geo position and was attached to the tractors.'},
        {name: 'Python', description: 'Scripting lanague used sending geo positions to the server.'},
        {name: 'AWS', description: 'Clould computing service used to deploy the app.'}
    ],
    buzzwords: ['IOT', 'Clould']
}];
export default projects;