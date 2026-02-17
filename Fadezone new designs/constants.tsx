
import { Service } from './types';

export const SERVICES: Service[] = [
  {
    id: 'haircut',
    name: 'HAIR CUT',
    price: 70,
    duration: 25,
    description: 'Classic haircut'
  },
  {
    id: 'haircut-dye',
    name: 'HAIRCUT WITH BLACK DYE',
    price: 120,
    duration: 40,
    description: 'Haircut + black dye'
  },
  {
    id: 'chiskop',
    name: 'CHISKOP',
    price: 30,
    duration: 15,
    description: 'Short buzz cut'
  },
  {
    id: 'brush-cut',
    name: 'BRUSH CUT',
    price: 50,
    duration: 20,
    description: 'Brush cut style'
  },
  {
    id: 'kids-haircut',
    name: 'KIDS HAIR CUT',
    price: 50,
    duration: 20,
    description: 'Children haircut'
  },
  {
    id: 'ladies-haircut',
    name: 'LADIES HAIR CUT',
    price: 80,
    duration: 30,
    description: 'Ladies haircut'
  },
  {
    id: 'shave-beard',
    name: 'SHAVING BEARD',
    price: 20,
    duration: 15,
    description: 'Beard shave'
  },
  {
    id: 'shave-trim',
    name: 'SHAVING AND TRIMMING',
    price: 20,
    duration: 20,
    description: 'Shave and trim service'
  },
  {
    id: 'unique-haircut',
    name: 'UNIQUE HAIRCUT AND COLOURED DYE',
    price: 250,
    duration: 60,
    description: 'Custom haircut with coloured dye'
  }
];

export const WORKING_HOURS = {
  start: 7, 
  end: 17,  
  interval: 30 
};

export const BARBER_CONFIG = {
  name: 'Alex',
  phone: '27721234567',
  shopName: 'FADEZONE Grooming',
  locations: [
    { 
      id: 'kensington',
      name: 'Kensington', 
      address: '424 Commissioner Street, Kensington, Johannesburg',
      hours: [
        { day: 'Monday', time: '07:00 - 12:00', status: 'active' },
        { day: 'Tuesday', time: '07:00 - 17:00', status: 'active' },
        { day: 'Wednesday', time: '07:00 - 17:00', status: 'active' },
        { day: 'Thursday', time: '07:00 - 17:00', status: 'active' },
        { day: 'Friday', time: '07:00 - 15:30', status: 'current' },
        { day: 'Saturday', time: '07:30 - 13:00', status: 'active' },
        { day: 'Sunday', time: 'CLOSED', status: 'closed' }
      ]
    },
    { 
      id: 'gw',
      name: 'Glenwood', 
      address: '123 Helen Joseph Rd, Glenwood',
      hours: [] // Assume similar
    }
  ]
};
