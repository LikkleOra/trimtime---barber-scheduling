
import { Service } from './types';
/* 
 * NUGGETS OF WISDOM:
 * 1. Assets in /public are served at the root path (e.g., /services/haircut.jpg).
 * 2. Use kebab-case for filenames to avoid URL encoding issues (%20).
 * 3. Don't import local images as modules when using ESM/CDN builds.
 */

export const SERVICES: Service[] = [
  {
    id: 'haircut',
    name: 'HAIR CUT',
    price: 70,
    duration: 25,
    description: 'Classic haircut',
    image: '/services/haircut.jpg'
  },
  {
    id: 'haircut-dye',
    name: 'HAIRCUT WITH BLACK DYE',
    price: 120,
    duration: 40,
    description: 'Haircut + black dye',
    image: '/services/haircut-black-dye.jpg'
  },
  {
    id: 'chiskop',
    name: 'CHISKOP',
    price: 40,
    duration: 15,
    description: 'Short buzz cut',
    image: '/services/chiskop.jpg'
  },
  {
    id: 'brush-cut',
    name: 'BRUSH CUT',
    price: 50,
    duration: 20,
    description: 'Brush cut style',
    image: '/services/brush-cut.jpg'
  },
  {
    id: 'kids-haircut',
    name: 'KIDS HAIR CUT',
    price: 50,
    duration: 20,
    description: 'Children haircut',
    image: '/services/kids-haircut.jpg'
  },
  {
    id: 'ladies-haircut',
    name: 'LADIES HAIR CUT',
    price: 80,
    duration: 30,
    description: 'Ladies haircut',
    image: '/services/ladies-cut.jpg'
  },
  {
    id: 'shave-beard',
    name: 'SHAVING BEARD',
    price: 30,
    duration: 15,
    description: 'Beard shave',
    image: '/services/beard-shave.jpg'
  },
  {
    id: 'shave-trim',
    name: 'SHAVING AND TRIMMING',
    price: 20,
    duration: 20,
    description: 'Shave and trim service',
    image: '/services/trimming.jpg'
  },
  {
    id: 'unique-haircut',
    name: 'UNIQUE HAIRCUT AND COLOURED DYE',
    price: 250,
    duration: 60,
    description: 'Custom haircut with coloured dye',
    image: '/services/haircut-custom-dye.jpg'
  }
];

export const WORKING_HOURS = {
  start: 8,
  end: 19,
  interval: 30
};

export const BARBER_CONFIG = {
  name: 'Alex',
  phone: '27812687806',
  shopName: 'FADEZONE Grooming',
  locations: [
    {
      id: 'kensington',
      name: 'Kensington',
      address: '424 Commissioner Street, Kensington, Johannesburg',
      hours: [
        { day: 'Sunday', time: 'CLOSED', status: 'closed' },
        { day: 'Monday', time: '08:00 - 17:00', status: 'active' },
        { day: 'Tuesday', time: '08:00 - 18:00', status: 'active' },
        { day: 'Wednesday', time: '08:00 - 18:00', status: 'active' },
        { day: 'Thursday', time: '08:00 - 18:00', status: 'active' },
        { day: 'Friday', time: '08:00 - 18:00', status: 'active' },
        { day: 'Saturday', time: '08:00 - 19:00', status: 'active' }
      ]
    }
  ]
};
