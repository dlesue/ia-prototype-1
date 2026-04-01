import type { PersonaType } from '../contexts/ScenarioContext';

export interface Passport {
  number: string;
  issued: string;
  expiry: string;
  country: string;
}

export interface Manager {
  name: string;
  title: string;
  avatar: string;
}

export interface CurrentEmployee {
  id: number;
  firstName: string;
  preferredName: string;
  lastName: string;
  middleName: string;
  pronouns: string;
  title: string;
  avatar: string;

  // Contact
  workPhone: string;
  mobilePhone: string;
  workEmail: string;
  personalEmail: string;
  linkedIn: string;

  // Location
  location: string;
  timezone: string;
  localTime: string;
  department: string;

  // Dates
  hireDate: string;
  tenure: string;
  birthDate: string;

  // Personal
  ssn: string;
  gender: string;
  genderIdentity: string;
  maritalStatus: string;
  tshirtSize: string;
  favoriteCereal: string;

  // Manager
  manager: Manager;

  // Direct Reports
  directReports: string[];
  moreReportsCount: number;

  // Passports
  passports: Passport[];
}

const EMPLOYEES: Record<PersonaType, CurrentEmployee> = {
  employee: {
    id: 1,
    firstName: 'Samuel',
    preferredName: 'Sam',
    lastName: 'Rivera',
    middleName: '',
    pronouns: 'He/him',
    title: 'Marketing Coordinator',
    avatar: 'https://randomuser.me/api/portraits/men/86.jpg',
    workPhone: '801-763-1893 x 6109',
    mobilePhone: '801-344-1998',
    workEmail: 'srivera@acmecorp.com',
    personalEmail: 'sam.rivera@gmail.com',
    linkedIn: 'LinkedIn',
    location: 'Seattle, WA',
    timezone: 'PST',
    localTime: '7:49 am',
    department: 'Marketing',
    hireDate: 'Jun 12, 2022',
    tenure: '3y · 9m · 1d',
    birthDate: 'Apr 22, 1996',
    ssn: '648-55-2415',
    gender: 'Male',
    genderIdentity: 'Male',
    maritalStatus: 'Single',
    tshirtSize: 'Medium',
    favoriteCereal: 'Crispix',
    manager: {
      name: 'Jordan Chen',
      title: 'Marketing Manager',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    directReports: [],
    moreReportsCount: 0,
    passports: [
      { number: '31195855', issued: '5/7/16', expiry: '5/7/26', country: 'United States' },
    ],
  },

  manager: {
    id: 2,
    firstName: 'Jordan',
    preferredName: 'Jordan',
    lastName: 'Chen',
    middleName: 'Li',
    pronouns: 'She/her',
    title: 'Marketing Manager',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    workPhone: '801-763-1893 x 4201',
    mobilePhone: '801-555-0142',
    workEmail: 'jchen@acmecorp.com',
    personalEmail: 'jordan.chen@gmail.com',
    linkedIn: 'LinkedIn',
    location: 'Seattle, WA',
    timezone: 'PST',
    localTime: '7:49 am',
    department: 'Marketing',
    hireDate: 'Mar 15, 2019',
    tenure: '7y · 0m · 0d',
    birthDate: 'Nov 3, 1988',
    ssn: '512-33-7891',
    gender: 'Female',
    genderIdentity: 'Female',
    maritalStatus: 'Married',
    tshirtSize: 'Small',
    favoriteCereal: 'Cheerios',
    manager: {
      name: 'David Park',
      title: 'VP, Marketing',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    },
    directReports: [
      'Sam Rivera',
      'Alan Nguyen',
      'Jeff Hawkins',
      'Melinda Pittman',
      'Tony Fonseca',
    ],
    moreReportsCount: 3,
    passports: [
      { number: '44219876', issued: '3/12/18', expiry: '3/12/28', country: 'United States' },
    ],
  },

  'dept-head': {
    id: 7,
    firstName: 'David',
    preferredName: 'David',
    lastName: 'Park',
    middleName: 'James',
    pronouns: 'He/him',
    title: 'VP, Marketing',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    workPhone: '801-763-1893 x 3100',
    mobilePhone: '801-555-0175',
    workEmail: 'dpark@acmecorp.com',
    personalEmail: 'david.park@gmail.com',
    linkedIn: 'LinkedIn',
    location: 'Seattle, WA',
    timezone: 'PST',
    localTime: '7:49 am',
    department: 'Marketing',
    hireDate: 'Jan 8, 2017',
    tenure: '9y · 2m · 16d',
    birthDate: 'Jul 14, 1980',
    ssn: '321-44-6789',
    gender: 'Male',
    genderIdentity: 'Male',
    maritalStatus: 'Married',
    tshirtSize: 'Large',
    favoriteCereal: 'Grape-Nuts',
    manager: {
      name: 'Brian Westfall',
      title: 'Chief Product Officer',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    directReports: [
      'Jordan Chen',
      'Lisa Yamamoto',
      'Marcus Reid',
    ],
    moreReportsCount: 2,
    passports: [
      { number: '55123456', issued: '8/1/20', expiry: '8/1/30', country: 'United States' },
    ],
  },

  executive: {
    id: 8,
    firstName: 'Brian',
    preferredName: 'Brian',
    lastName: 'Westfall',
    middleName: 'Thomas',
    pronouns: 'He/him',
    title: 'Chief Product Officer',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    workPhone: '801-763-1893 x 1001',
    mobilePhone: '801-555-0132',
    workEmail: 'bwestfall@acmecorp.com',
    personalEmail: 'brian.westfall@gmail.com',
    linkedIn: 'LinkedIn',
    location: 'Lindon, UT',
    timezone: 'MST',
    localTime: '8:49 am',
    department: 'Product',
    hireDate: 'Sep 22, 2014',
    tenure: '11y · 6m · 2d',
    birthDate: 'Feb 28, 1975',
    ssn: '198-22-5544',
    gender: 'Male',
    genderIdentity: 'Male',
    maritalStatus: 'Married',
    tshirtSize: 'Large',
    favoriteCereal: 'Raisin Bran',
    manager: {
      name: 'Brad Rencher',
      title: 'CEO',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
    directReports: [
      'David Park',
      'Sarah Lin',
      'Michael Torres',
    ],
    moreReportsCount: 4,
    passports: [
      { number: '66789012', issued: '2/15/22', expiry: '2/15/32', country: 'United States' },
    ],
  },

  'hr-admin': {
    id: 3,
    firstName: 'Hailey',
    preferredName: 'Hailey',
    lastName: 'Gutierrez',
    middleName: 'Marie',
    pronouns: 'She/her',
    title: 'HR Director',
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
    workPhone: '801-763-1893 x 3050',
    mobilePhone: '801-555-0198',
    workEmail: 'hgutierrez@acmecorp.com',
    personalEmail: 'hailey.gutierrez@gmail.com',
    linkedIn: 'LinkedIn',
    location: 'Seattle, WA',
    timezone: 'PST',
    localTime: '7:49 am',
    department: 'Human Resources',
    hireDate: 'Jan 10, 2017',
    tenure: '9y · 2m · 3d',
    birthDate: 'Sep 14, 1981',
    ssn: '739-22-6148',
    gender: 'Female',
    genderIdentity: 'Female',
    maritalStatus: 'Married',
    tshirtSize: 'Medium',
    favoriteCereal: 'Frosted Flakes',
    manager: {
      name: 'Rebecca Liu',
      title: 'CEO',
      avatar: 'https://randomuser.me/api/portraits/women/79.jpg',
    },
    directReports: [
      'Lisa Thompson',
      'Marcus Webb',
      'Priya Patel',
    ],
    moreReportsCount: 1,
    passports: [
      { number: '55832147', issued: '8/22/19', expiry: '8/22/29', country: 'United States' },
    ],
  },

  'it-admin': {
    id: 5,
    firstName: 'Jordan',
    preferredName: 'Jordan',
    lastName: 'Chen',
    middleName: 'Ray',
    pronouns: 'They/them',
    title: 'IT Director',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    workPhone: '801-763-1893 x 4010',
    mobilePhone: '801-555-0432',
    workEmail: 'jchen@acmecorp.com',
    personalEmail: 'jordan.chen@gmail.com',
    linkedIn: 'LinkedIn',
    location: 'Seattle, WA',
    timezone: 'PST',
    localTime: '7:49 am',
    department: 'Information Technology',
    hireDate: 'Mar 15, 2019',
    tenure: '7y · 0m · 8d',
    birthDate: 'Nov 22, 1988',
    ssn: '412-55-7893',
    gender: 'Non-binary',
    genderIdentity: 'Non-binary',
    maritalStatus: 'Single',
    tshirtSize: 'Medium',
    favoriteCereal: 'Lucky Charms',
    manager: {
      name: 'Rebecca Liu',
      title: 'CEO',
      avatar: 'https://randomuser.me/api/portraits/women/79.jpg',
    },
    directReports: [
      'Alex Kim',
      'Taylor Morrison',
      'Casey Wright',
    ],
    moreReportsCount: 5,
    passports: [
      { number: '66294813', issued: '3/11/20', expiry: '3/11/30', country: 'United States' },
    ],
  },

  'finance-admin': {
    id: 6,
    firstName: 'Monica',
    preferredName: 'Monica',
    lastName: 'Vasquez',
    middleName: 'Elena',
    pronouns: 'She/her',
    title: 'Finance Director',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    workPhone: '801-763-1893 x 5020',
    mobilePhone: '801-555-0567',
    workEmail: 'mvasquez@acmecorp.com',
    personalEmail: 'monica.vasquez@gmail.com',
    linkedIn: 'LinkedIn',
    location: 'Seattle, WA',
    timezone: 'PST',
    localTime: '7:49 am',
    department: 'Finance',
    hireDate: 'Jun 1, 2018',
    tenure: '7y · 9m · 22d',
    birthDate: 'Apr 3, 1985',
    ssn: '583-17-4629',
    gender: 'Female',
    genderIdentity: 'Female',
    maritalStatus: 'Married',
    tshirtSize: 'Small',
    favoriteCereal: 'Cheerios',
    manager: {
      name: 'Rebecca Liu',
      title: 'CEO',
      avatar: 'https://randomuser.me/api/portraits/women/79.jpg',
    },
    directReports: [
      'Ryan Patel',
      'Sarah Kim',
    ],
    moreReportsCount: 3,
    passports: [
      { number: '77135924', issued: '9/4/21', expiry: '9/4/31', country: 'United States' },
    ],
  },

  'workplace-admin': {
    id: 7,
    firstName: 'Marcus',
    preferredName: 'Marcus',
    lastName: 'Webb',
    middleName: 'Anthony',
    pronouns: 'He/him',
    title: 'Workplace Operations Director',
    avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
    workPhone: '801-763-1893 x 6030',
    mobilePhone: '801-555-0678',
    workEmail: 'mwebb@acmecorp.com',
    personalEmail: 'marcus.webb@gmail.com',
    linkedIn: 'LinkedIn',
    location: 'Seattle, WA',
    timezone: 'PST',
    localTime: '7:49 am',
    department: 'Workplace Operations',
    hireDate: 'Oct 12, 2020',
    tenure: '5y · 5m · 11d',
    birthDate: 'Jul 19, 1990',
    ssn: '294-68-1057',
    gender: 'Male',
    genderIdentity: 'Male',
    maritalStatus: 'Single',
    tshirtSize: 'Large',
    favoriteCereal: 'Cinnamon Toast Crunch',
    manager: {
      name: 'Rebecca Liu',
      title: 'CEO',
      avatar: 'https://randomuser.me/api/portraits/women/79.jpg',
    },
    directReports: [
      'Jamie Foster',
      'Chris Nguyen',
    ],
    moreReportsCount: 2,
    passports: [
      { number: '88462715', issued: '1/20/22', expiry: '1/20/32', country: 'United States' },
    ],
  },
};

/** Get employee data for a given persona */
export function getEmployee(persona: PersonaType): CurrentEmployee {
  return EMPLOYEES[persona];
}

/** Legacy default export — defaults to hr-admin */
export const currentEmployee = EMPLOYEES['hr-admin'];
