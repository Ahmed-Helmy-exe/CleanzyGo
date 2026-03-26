export interface City {
  id: string;
  name: string;
}

export interface Building {
  id: string;
  cityId: string;
  name: string;
}

export interface TimeSlot {
  id: string;
  buildingId: string;
  date: string;
  time: string;
  maxBookings: number;
  currentBookings: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  icon: string;
  duration: string;
}

export interface Extra {
  id: string;
  name: string;
  price: number;
  icon: string;
}

export interface Booking {
  id: string;
  userId: string;
  buildingId: string;
  serviceId: string;
  date: string;
  time: string;
  cleaners: number;
  extras: string[];
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  total: number;
  paymentMethod: 'online' | 'cash';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  assignedBuildings: string[];
  avatar: string;
}

export interface Review {
  id: string;
  bookingId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  serviceType: string;
}

export const cities: City[] = [
  { id: 'abu-dhabi', name: 'Abu Dhabi City' },
  { id: 'yas-island', name: 'Yas Island' },
  { id: 'khalifa-city', name: 'Khalifa City' },
  { id: 'al-reem', name: 'Al Reem Island' },
  { id: 'saadiyat', name: 'Saadiyat Island' },
];

export const buildings: Building[] = [
  { id: 'b1', cityId: 'abu-dhabi', name: 'Etihad Towers' },
  { id: 'b2', cityId: 'abu-dhabi', name: 'Sky Tower' },
  { id: 'b3', cityId: 'abu-dhabi', name: 'Nation Towers' },
  { id: 'b4', cityId: 'yas-island', name: 'Yas Bay Residences' },
  { id: 'b5', cityId: 'yas-island', name: 'Mayan Residences' },
  { id: 'b6', cityId: 'khalifa-city', name: 'Al Rayyana' },
  { id: 'b7', cityId: 'khalifa-city', name: 'Al Forsan Village' },
  { id: 'b8', cityId: 'al-reem', name: 'Sun & Sky Towers' },
  { id: 'b9', cityId: 'al-reem', name: 'Gate Towers' },
  { id: 'b10', cityId: 'saadiyat', name: 'Mamsha Al Saadiyat' },
  { id: 'b11', cityId: 'saadiyat', name: 'Saadiyat Beach Residences' },
];

const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const times = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  const today = new Date();

  buildings.forEach((building) => {
    for (let d = 0; d < 14; d++) {
      const date = new Date(today);
      date.setDate(today.getDate() + d);
      if (date.getDay() === 5) continue; // Skip Fridays
      const dateStr = date.toISOString().split('T')[0];

      times.forEach((time) => {
        const maxBookings = Math.floor(Math.random() * 3) + 1;
        const currentBookings = Math.floor(Math.random() * (maxBookings + 1));
        slots.push({
          id: `${building.id}-${dateStr}-${time}`,
          buildingId: building.id,
          date: dateStr,
          time,
          maxBookings,
          currentBookings,
        });
      });
    }
  });
  return slots;
};

export const timeSlots: TimeSlot[] = generateTimeSlots();

export const services: Service[] = [
  {
    id: 'room',
    name: 'Room Cleaning',
    description: 'Thorough cleaning of individual rooms including dusting, vacuuming, and mopping',
    basePrice: 80,
    icon: '🛏️',
    duration: '1-2 hours',
  },
  {
    id: 'apartment',
    name: 'Full Apartment Cleaning',
    description: 'Complete apartment cleaning from top to bottom, all rooms included',
    basePrice: 200,
    icon: '🏠',
    duration: '3-4 hours',
  },
  {
    id: 'deep',
    name: 'Deep Cleaning',
    description: 'Intensive deep cleaning with special attention to hard-to-reach areas',
    basePrice: 350,
    icon: '✨',
    duration: '5-6 hours',
  },
];

export const extras: Extra[] = [
  { id: 'laundry', name: 'Laundry', price: 50, icon: '👕' },
  { id: 'ironing', name: 'Ironing', price: 40, icon: '👔' },
  { id: 'sanitization', name: 'Sanitization', price: 60, icon: '🧴' },
  { id: 'kitchen', name: 'Kitchen Deep Clean', price: 70, icon: '🍳' },
];

export const packages = [
  {
    id: 'weekly',
    name: 'Weekly Plan',
    description: '4 cleanings per month',
    discount: 15,
    frequency: 'Weekly',
    priceMultiplier: 0.85,
  },
  {
    id: 'monthly',
    name: 'Monthly Subscription',
    description: '2 cleanings per month',
    discount: 10,
    frequency: 'Bi-weekly',
    priceMultiplier: 0.90,
  },
  {
    id: 'bundle',
    name: 'Discount Bundle',
    description: '10 sessions pack',
    discount: 20,
    frequency: 'Use anytime',
    priceMultiplier: 0.80,
  },
];

export const mockBookings: Booking[] = [
  {
    id: 'bk1', userId: 'u1', buildingId: 'b1', serviceId: 'apartment',
    date: '2026-03-25', time: '09:00', cleaners: 2, extras: ['laundry'],
    status: 'confirmed', total: 450, paymentMethod: 'online',
    customerName: 'Ahmed Ali', customerEmail: 'ahmed@example.com', customerPhone: '+971501234567',
  },
  {
    id: 'bk2', userId: 'u2', buildingId: 'b4', serviceId: 'deep',
    date: '2026-03-25', time: '13:00', cleaners: 3, extras: ['sanitization', 'kitchen'],
    status: 'in_progress', total: 780, paymentMethod: 'cash',
    customerName: 'Sara Khan', customerEmail: 'sara@example.com', customerPhone: '+971502345678',
  },
  {
    id: 'bk3', userId: 'u3', buildingId: 'b8', serviceId: 'room',
    date: '2026-03-26', time: '10:00', cleaners: 1, extras: [],
    status: 'pending', total: 80, paymentMethod: 'online',
    customerName: 'John Smith', customerEmail: 'john@example.com', customerPhone: '+971503456789',
  },
  {
    id: 'bk4', userId: 'u1', buildingId: 'b2', serviceId: 'apartment',
    date: '2026-03-24', time: '14:00', cleaners: 2, extras: ['ironing'],
    status: 'completed', total: 440, paymentMethod: 'online',
    customerName: 'Ahmed Ali', customerEmail: 'ahmed@example.com', customerPhone: '+971501234567',
  },
];

export const employees: Employee[] = [
  { id: 'e1', name: 'Maria Santos', email: 'maria@cleanzygo.com', phone: '+971504567890', assignedBuildings: ['b1', 'b2', 'b3'], avatar: '👩' },
  { id: 'e2', name: 'Raj Patel', email: 'raj@cleanzygo.com', phone: '+971505678901', assignedBuildings: ['b4', 'b5'], avatar: '👨' },
  { id: 'e3', name: 'Fatima Hassan', email: 'fatima@cleanzygo.com', phone: '+971506789012', assignedBuildings: ['b6', 'b7'], avatar: '👩' },
  { id: 'e4', name: 'James Wilson', email: 'james@cleanzygo.com', phone: '+971507890123', assignedBuildings: ['b8', 'b9'], avatar: '👨' },
  { id: 'e5', name: 'Aisha Mohammed', email: 'aisha@cleanzygo.com', phone: '+971508901234', assignedBuildings: ['b10', 'b11'], avatar: '👩' },
];

export const reviews: Review[] = [
  { id: 'r1', bookingId: 'bk4', userId: 'u1', userName: 'Ahmed A.', rating: 5, comment: 'Exceptional service! The team was professional and thorough. My apartment has never been this clean.', date: '2026-03-24', serviceType: 'Full Apartment Cleaning' },
  { id: 'r2', bookingId: 'bk5', userId: 'u4', userName: 'Layla M.', rating: 4, comment: 'Very good deep cleaning service. Arrived on time and were very respectful. Will book again!', date: '2026-03-22', serviceType: 'Deep Cleaning' },
  { id: 'r3', bookingId: 'bk6', userId: 'u5', userName: 'David R.', rating: 5, comment: 'Best cleaning service in Abu Dhabi. The booking process was so easy and the results were amazing.', date: '2026-03-20', serviceType: 'Room Cleaning' },
  { id: 'r4', bookingId: 'bk7', userId: 'u6', userName: 'Maryam S.', rating: 5, comment: 'Love the weekly plan! Consistent quality every single time. Highly recommended.', date: '2026-03-18', serviceType: 'Full Apartment Cleaning' },
  { id: 'r5', bookingId: 'bk8', userId: 'u7', userName: 'Omar K.', rating: 4, comment: 'Great service and very competitive pricing. The sanitization extra was worth every dirham.', date: '2026-03-15', serviceType: 'Deep Cleaning' },
];
