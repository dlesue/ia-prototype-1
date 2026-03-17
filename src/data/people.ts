export interface Person {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  avatar: string;
  title: string;
  department: string;
  manager: string | null;
  startDate: string;
  ptoBalance: number;
  directReports: number;
  location: string;
  status: 'Active' | 'On Leave' | 'Remote';
}

// Avatar palette: coral, sage green, soft purple, warm tan, dusty rose, olive
// Photos: randomuser.me CDN (stable URLs, professional headshots)
export const CURRENT_USER: Person = {
  id: 'dl',
  name: 'Dave Lesue',
  initials: 'DL',
  avatarColor: '#2D6A35',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  title: 'Senior Product Design Director',
  department: 'Product Design',
  manager: null,
  startDate: '2019-03-11',
  ptoBalance: 18,
  directReports: 6,
  location: 'Lindon, UT',
  status: 'Active',
};

export const PEOPLE: Person[] = [
  CURRENT_USER,
  {
    id: 'sr',
    name: 'Sofia Reyes',
    initials: 'SR',
    avatarColor: '#C2402C',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    title: 'Engineering Manager',
    department: 'Engineering',
    manager: 'Dave Lesue',
    startDate: '2020-06-15',
    ptoBalance: 12,
    directReports: 8,
    location: 'Austin, TX',
    status: 'Active',
  },
  {
    id: 'jn',
    name: 'James Nakamura',
    initials: 'JN',
    avatarColor: '#4B4B8F',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    title: 'HR Business Partner',
    department: 'People Ops',
    manager: 'Dave Lesue',
    startDate: '2021-01-10',
    ptoBalance: 22,
    directReports: 0,
    location: 'Remote',
    status: 'Remote',
  },
  {
    id: 'ak',
    name: 'Amara Kofi',
    initials: 'AK',
    avatarColor: '#8B6B4A',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    title: 'Senior Product Designer',
    department: 'Product Design',
    manager: 'Dave Lesue',
    startDate: '2022-09-06',
    ptoBalance: 8,
    directReports: 0,
    location: 'Lindon, UT',
    status: 'Active',
  },
  {
    id: 'mp',
    name: 'Marcus Park',
    initials: 'MP',
    avatarColor: '#5A7A8A',
    avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
    title: 'Data Analyst',
    department: 'Analytics',
    manager: 'Sofia Reyes',
    startDate: '2023-02-20',
    ptoBalance: 15,
    directReports: 0,
    location: 'Austin, TX',
    status: 'Active',
  },
  {
    id: 'ew',
    name: 'Elena Whitfield',
    initials: 'EW',
    avatarColor: '#9B6B7A',
    avatar: 'https://randomuser.me/api/portraits/women/90.jpg',
    title: 'Payroll Specialist',
    department: 'Finance',
    manager: 'James Nakamura',
    startDate: '2021-07-14',
    ptoBalance: 5,
    directReports: 0,
    location: 'Lindon, UT',
    status: 'On Leave',
  },
  {
    id: 'tc',
    name: 'Tariq Chen',
    initials: 'TC',
    avatarColor: '#6B8F5E',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    title: 'UX Researcher',
    department: 'Product Design',
    manager: 'Dave Lesue',
    startDate: '2024-01-08',
    ptoBalance: 20,
    directReports: 0,
    location: 'Remote',
    status: 'Remote',
  },
];
