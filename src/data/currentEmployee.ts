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

  exec: {
    id: 4,
    firstName: 'David',
    preferredName: 'David',
    lastName: 'Park',
    middleName: 'James',
    pronouns: 'He/him',
    title: 'VP, Marketing',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    workPhone: '801-763-1893 x 1001',
    mobilePhone: '801-555-0101',
    workEmail: 'dpark@acmecorp.com',
    personalEmail: 'david.park@gmail.com',
    linkedIn: 'LinkedIn',
    location: 'Seattle, WA',
    timezone: 'PST',
    localTime: '7:49 am',
    department: 'Marketing',
    hireDate: 'Aug 28, 2015',
    tenure: '10y · 6m · 15d',
    birthDate: 'Feb 8, 1976',
    ssn: '891-44-3327',
    gender: 'Male',
    genderIdentity: 'Male',
    maritalStatus: 'Married',
    tshirtSize: 'Large',
    favoriteCereal: 'Grape Nuts',
    manager: {
      name: 'Rebecca Liu',
      title: 'CEO',
      avatar: 'https://randomuser.me/api/portraits/women/79.jpg',
    },
    directReports: [
      'Hailey Gutierrez',
      'Jordan Chen',
      'Tom Bradley',
      'Sarah Kim',
    ],
    moreReportsCount: 4,
    passports: [
      { number: '31195855', issued: '5/7/16', expiry: '5/7/26', country: 'United States' },
      { number: '54682-22272', issued: '7/18/17', expiry: '7/18/27', country: 'South Korea' },
    ],
  },
};

/** Get employee data for a given persona */
export function getEmployee(persona: PersonaType): CurrentEmployee {
  return EMPLOYEES[persona];
}

/** Legacy default export — defaults to hr-admin */
export const currentEmployee = EMPLOYEES['hr-admin'];
