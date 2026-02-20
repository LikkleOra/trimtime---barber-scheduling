
import { Service } from './types';

export const SERVICES: Service[] = [
  {
    id: 'haircut',
    name: 'HAIR CUT',
    price: 70,
    duration: 30,
    description: 'Classic haircut',
    image: '/services/haircut.jpg'
  },
  {
    id: 'chiskop',
    name: 'CHISKOP',
    price: 30,
    duration: 20,
    description: 'Short buzz cut',
    image: '/services/chiskop.jpg'
  },
  {
    id: 'brush-cut',
    name: 'BRUSH CUT',
    price: 50,
    duration: 25,
    description: 'Brush cut style',
    image: '/services/brush-cut.jpg'
  },
  {
    id: 'kids-haircut',
    name: 'KIDS CUT',
    price: 50,
    duration: 30,
    description: 'Children haircut',
    image: '/services/kids-haircut.jpg'
  },
  {
    id: 'ladies-haircut',
    name: 'LADIES CUT',
    price: 80,
    duration: 45,
    description: 'Ladies haircut',
    image: '/services/ladies-cut.jpg'
  },
  {
    id: 'haircut-dye',
    name: 'HAIRCUT + BLACK DYE',
    price: 120,
    duration: 60,
    description: 'Haircut + black dye',
    image: '/services/haircut-black-dye.jpg'
  },
  {
    id: 'unique-haircut',
    name: 'HAIRCUT + CUSTOM DYE',
    price: 250,
    duration: 90,
    description: 'Custom haircut with coloured dye',
    image: '/services/haircut-custom-dye.jpg'
  },
  {
    id: 'shave-beard',
    name: 'BEARD SHAVE',
    price: 20,
    duration: 15,
    description: 'Beard shave',
    image: '/services/beard-shave.jpg'
  },
  {
    id: 'shave-trim',
    name: 'TRIMMING',
    price: 20,
    duration: 20,
    description: 'Trimming service',
    image: '/services/trimming.jpg'
  },
  {
    id: 'versatile-fade',
    name: 'VERSATILE FADE',
    price: 100,
    duration: 45,
    description: 'Versatile fade haircut',
    image: '/services/versatile-fade.jpg'
  }
];

export const WORKING_HOURS = {
  start: 8,
  end: 19,
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
        { day: 'Monday', time: '08:00 - 17:00', status: 'active' },
        { day: 'Tuesday', time: '08:00 - 18:00', status: 'active' },
        { day: 'Wednesday', time: '08:00 - 18:00', status: 'active' },
        { day: 'Thursday', time: '08:00 - 18:00', status: 'active' },
        { day: 'Friday', time: '08:00 - 18:00', status: 'current' },
        { day: 'Saturday', time: '08:00 - 19:00', status: 'active' },
        { day: 'Sunday', time: '08:00 - 18:00', status: 'active' }
      ]
    },
    {
      id: 'gw',
      name: 'Sandton',
      address: 'Sandton City, Johannesburg',
      hours: []
    }
  ]
};
