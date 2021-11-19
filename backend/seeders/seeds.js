const db = require('../config/connection');
const Job = require('../models/Job.js');

db.once('open', async () => {

    await Job.deleteMany();

    const jobs = await Job.insertMany([
        {
            title: 'Web Developer',
            jobDescription:'Looking for an experienced developer for a 3 month project with the possibility of an extension. You will be working remotely with a flexible schedule within a small team environment for an award winning and 100% women owned and operated Canadian company.',
            company: 'Facebook',
            address: '200 Queen Street West, Toronto, ON M8I N2O',
            jobTypes: 'Part-time',
            coordinates: [43.65595, -79.401264]
        },
        {
          title: 'Mobile Developer',
          jobDescription:'As a Mobile Developer, you will be working closely with our clients, building elegant and performant mobile applications. You will be contributing to the development of world-class digital products and experiences used by customers globally on the Android/ iOS platform. We are looking for a versatile and experienced developer who is excited to work in and foster a collaborative engineering environment.',
          company: 'Shopify',
          address: '1765 Eglinton Avenue East, Toronto, ON M8I N2O',
          jobTypes: 'Contractor',
          coordinates: [43.725389, -79.309639]
        },
        {
          title: 'Graphic Designer',
          jobDescription:'The Graphic Designer is responsible for conceptualizing, designing, presenting and supporting production of finished artwork to an established design and production schedule.',
          company: 'Apple',
          address: '43 Spadina Avenue, Toronto, ON M4V L9E',
          jobTypes: 'Full-time',
          coordinates: [43.657232, -79.400784]
        },
        {
          title: 'Store Inventory Lead',
          jobDescription:'The Key Leader role is an essential part of the store leadership team, impacting salesfloor team members and guest (i.e., customer) experience every day. Key Leaders are responsible for leading by example and providing support to Educators, facilitating an outstanding guest experience in the store, and overseeing all operations of the retail floor. Key Leaders leverage key performance indicators and metrics to prioritize responsibilities while adapting to day-to-day business adjustments and challenges.',
          company: 'Lululemon',
          address: '1968 Sheppard Avenue West, Toronto, ON M3L 2E8',
          jobTypes: 'Full-time',
          coordinates: [43.739081, -79.514295]
        },
        {
          title: 'Software Dev Engineer',
          jobDescription:'We’re looking for experienced, motivated software engineers with a proven track record of building data engineering and scalable web services. If you are passionate about developing analytical solutions to solve business problems, and you are looking for a team that drives results that influence Amazon’s business, this is the right place for you.',
          company: 'Amazon Dev Centre',
          address: '4846 Younge Street, Toronto, ON M2N 3C8',
          jobTypes: 'Contractor',
          coordinates: [43.762533, -79.411218]
        },
        {
          title: 'Software Developer',
          jobDescription:'The BlackBerry IVY Engineering organization is focused on developing and delivering on this vision of BlackBerry IVY through delivery of software and services that will be used by vehicle OEMs and also the broader development community worldwide. We are looking for a Software Developer I to join our team. The successful candidate will work toward the common goal of delivering innovative new technologies to ensure BlackBerry IVY delivers on its vision.' ,
          company:'BlackBerry',
          address: '149 Adelaide Street West, Toronto, ON M5H 3M7',
          jobTypes: 'Full-time',
          coordinates: [43.649072, -79.384783]
        },
        {
          title: 'Marketing Coordinator',
          jobDescription:'The Marketing Coordinator, Sales is responsible for the marketing support and administrative activities of the Marketing Communications department under the direction of the Senior Manager, Marketing & Communications with a focus on supporting the equipment sales segment of the business. ',
          company:'IBM',
          address: '26 Maitland Street, Toronto ON M4Y 2C5',
          jobTypes: 'Full-time',
          coordinates: [43.66455, -79.382963]
        },
        {
          title: 'Associate Marketing Manager',
          jobDescription:'Working in Marketing at PepsiCo is about building epic brands that deeply connect with consumers, setting the Canadian strategy, building award winning marketing campaigns and creating consumer-loved innovation to enable industry leading results while having fun with the people you work with.',
          company:'PepsiCo',
          address: '825 Don Mills Road, Toronto ON M3C 1V5',
          jobTypes: 'Contractor',
          coordinates: [43.720451, -79.338828]
        },
        {
          title: 'Data Scientist',
          jobDescription: 'We are looking for someone to work as part of a trailblazing team of data scientists who create groundbreaking analytical solutions that improve our core work enterprise wide.',
          company:'TD Bank',
          address: '161 Wellesley Street East, Toronto, ON M5A 2K3',
          jobTypes: 'Contractor',
          coordinates: [43.666909, -79.374212]
        },
        {
          title: 'Product Manager',
          jobDescription: 'Provides end-to-end support for BMO mutual funds, ETFs, segregated funds, term investments, and savings products for internal and external stakeholders. Delivers operational processes and provides after-sales support to the personal wealth and asset management businesses and stakeholders.',
          company:'BMO Financial Group',
          address: '736 St.Clair Avenue West, Toronto, ON M6C 1B6',
          jobTypes: 'Full-time',
          coordinates: [43.681391, -79.427433]
        },
        {
          title: 'Pharmacist',
          jobDescription: 'In this role, you will support the Pharmacy Manager in executing store level corporate and operational Rx policies and procedures in regards to budgets, store operations, loss prevention, prescription dispensing and the provision of patient focused services. Dedicated focus on customer needs in order to deliver quality customer service.',
          company:'Rexall Pharmacy Group',
          address: '1729 Bloor Street West, Toronto, ON M6P 1B2',
          jobTypes: 'Contractor',
          coordinates: [43.654777, -79.459654]
        },
        {
          title: 'HR Advisor',
          jobDescription: 'Reporting to the Human Resources Manager, this individual will provide HR guidance and leadership as well as execute HR initiatives to a fast paced, growth-oriented food manufacturing plant employing approximately 35 salaried and 180 unionized employees operating on a day, and afternoon shift schedule.',
          company:'Maple Leaf Foods',
          address: '1123 Weston Road, Toronto, ON M6N 2T7',
          jobTypes: 'Part-time',
          coordinates: [43.686869, -79.488062]
        },
        {
          title: 'Finance Associate',
          jobDescription: 'Responsible for invoice submission to customers, customer Master creation/updates, recurring Services renewal calculation and customer correspondence, invoice credits and/or reissues.',
          company:'Johnson & Johnson',
          address: '3504 Hurontario Street, Mississauga, ON L5A 3W9',
          jobTypes: 'Contractor',
          coordinates: [43.589835, -79.630557]
        },
        {
          title: 'Global Strategy Consultant',
          jobDescription: 'As a Global Strategy Consultant, you will help Deloitte top leaders solve their toughest problems and help them take advantage of Deloitte’s most significant market opportunities. You will be a thought partner, performing in-depth analysis, and collaborating with a team to provide compelling points of view to senior leadership.',
          company: "Deloitte",
          address: '1304 King Street West, Toronto, ON M6K 1G4',
          jobTypes: 'Full-time',
          coordinates: [43.638135, -79.431254]
        },
        {
          title: 'Machine Learning Engineer',
          jobDescription: 'As a Machine Learning Engineer, you will be working alongside a multidisciplinary team of cloud engineers, developers, data scientists, QA analysts, designers, and business professionals. You will be leveraging your technical skills to develop the features and infrastructure powering the machine learning/data science capabilities of the product. Work with us and learn what it takes to be the leader in a competitive global software industry.',
          company:'Sunnybrook Health Sciences Centre',
          address: '1781 Queen Street East, Toronto, ON M4L 6S5',
          jobTypes: 'Full-time',
          coordinates: [43.667956, -79.308987]
        },
    ]);

    console.log('jobs seeded');

    process.exit();
});
