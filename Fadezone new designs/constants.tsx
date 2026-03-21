
import { Service } from './types';
import TrimmingImg from './Trimming.jpg';
import ChiskopImg from './Chiskop.jpg';
import HaircutImg from './Haircut.jpg';
import BeardShaveImg from './Beard shave.jpg';
import BrushCutImg from './Brush cut.jpg';
import KidsHaircutImg from './Kids Haircut.jpg';
import LadiesCutImg from './Ladies Cut.jpg';
import HaircutBlackDyeImg from './Haircut + Black Dye.jpg';
import HaircutCustomDyeImg from './Haircut + Custom Dye.jpg';

export const SERVICES: Service[] = [
  {
    id: 'haircut',
    name: 'HAIR CUT',
    price: 70,
    duration: 25,
    description: 'Classic haircut',
    image: HaircutImg
  },
  {
    id: 'haircut-dye',
    name: 'HAIRCUT WITH BLACK DYE',
    price: 120,
    duration: 40,
    description: 'Haircut + black dye',
    image: HaircutBlackDyeImg
  },
  {
    id: 'chiskop',
    name: 'CHISKOP',
    price: 40,
    duration: 15,
    description: 'Short buzz cut',
    image: ChiskopImg
  },
  {
    id: 'brush-cut',
    name: 'BRUSH CUT',
    price: 50,
    duration: 20,
    description: 'Brush cut style',
    image: BrushCutImg
  },
  {
    id: 'kids-haircut',
    name: 'KIDS HAIR CUT',
    price: 50,
    duration: 20,
    description: 'Children haircut',
    image: KidsHaircutImg
  },
  {
    id: 'ladies-haircut',
    name: 'LADIES HAIR CUT',
    price: 80,
    duration: 30,
    description: 'Ladies haircut',
    image: LadiesCutImg
  },
  {
    id: 'shave-beard',
    name: 'SHAVING BEARD',
    price: 30,
    duration: 15,
    description: 'Beard shave',
    image: BeardShaveImg
  },
  {
    id: 'shave-trim',
    name: 'SHAVING AND TRIMMING',
    price: 20,
    duration: 20,
    description: 'Shave and trim service',
    image: TrimmingImg
  },
  {
    id: 'unique-haircut',
    name: 'UNIQUE HAIRCUT AND COLOURED DYE',
    price: 250,
    duration: 60,
    description: 'Custom haircut with coloured dye',
    image: HaircutCustomDyeImg
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
