import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'p1',
    name: { ku: 'پیتزای مارگریتا', ar: 'بيتزا مارغريتا' },
    price: 6000,
    category: 'pizza',
    description: { 
      ku: 'سۆسی تەماتەی کلاسیک، مۆزارێلای تازە، و ڕێحانەی کێوی.', 
      ar: 'صلصة طماطم كلاسيكية، موزاريلا طازجة، وريحان بري.' 
    },
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p2',
    name: { ku: 'پیتزای پێپەرۆنی', ar: 'بيتزا بيبيروني' },
    price: 10000,
    category: 'pizza',
    description: { 
      ku: 'سۆسی تەماتەی تیژ، مۆزارێلا، و پارچەی پێپەرۆنی نایاب.', 
      ar: 'صلصة طماطم حارة، موزاريلا، وقطع بيبيروني فاخرة.' 
    },
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p3',
    name: { ku: 'پیتزای مریشکی BBQ', ar: 'بيتزا دجاج باربيكيو' },
    price: 11000,
    category: 'pizza',
    description: { 
      ku: 'مریشکی برژاو، سۆسی BBQ، پیازی سوور، و کەرەوز.', 
      ar: 'دجاج مشوي، صلصة باربيكيو، بصل أحمر، وكزبرة.' 
    },
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p4',
    name: { ku: 'ڤێجی سوپریم', ar: 'فيجي سوبريم' },
    price: 9000,
    category: 'pizza',
    description: { 
      ku: 'بیبەری شیرین، پیاز، قارچک، زەیتوون، و تەماتەی تازە.', 
      ar: 'فلفل حلو، بصل، فطر، زيتون، وطماطم طازجة.' 
    },
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 's1',
    name: { ku: 'پەتاتەی سوورەکراو', ar: 'بطاطس مقلية' },
    price: 3000,
    category: 'side',
    description: { 
      ku: 'پەتاتەی ئاڵتوونی و کریسپی کە لەگەڵ کەتچەپ پێشکەش دەکرێت.', 
      ar: 'بطاطس ذهبية مقرمشة تقدم مع الكاتشب.' 
    },
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 's2',
    name: { ku: 'باڵی مریشک', ar: 'أجنحة دجاج' },
    price: 6000,
    category: 'side',
    description: { 
      ku: 'باڵی مریشکی برژاو بە سۆسی تیژ یان سادە.', 
      ar: 'أجنحة دجاج مشوية بصلصة حارة أو سادة.' 
    },
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'd1',
    name: { ku: 'کۆلا/دیو', ar: 'كولا/ديو' },
    price: 1000,
    category: 'drink',
    description: { 
      ku: 'خواردنەوەی گازی سارد و تازە کەرەوە.', 
      ar: 'مشروب غازي بارد ومنعش.' 
    },
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'd2',
    name: { ku: 'ئاوی کانزایی', ar: 'مياه معدنية' },
    price: 500,
    category: 'drink',
    description: { 
      ku: 'ئاوی پاک و سارد.', 
      ar: 'مياه نقية وباردة.' 
    },
    image: 'https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&w=800&q=80'
  }
];

export const WHATSAPP_NUMBER = '+9647500000000'; // Placeholder as requested +964750XXXXXXX

export const PIZZA_PRICE_INCREMENTS = {
  MEDIUM: 3000,
  LARGE: 6000
};

export const DELIVERY_AREAS = [
  { id: 'center', name: { ku: 'ناوەندی شەقڵاوە', ar: 'مركز شقلاوة' }, price: 2000 },
  { id: 'surrounding', name: { ku: 'دەوروبەری شەقڵاوە', ar: 'ضواحي شقلاوة' }, price: 3000 },
  { id: 'resorts', name: { ku: 'هاوینەهەوارەکان و ڤێلاکان', ar: 'المنتجعات والفيلات' }, price: 5000 }
];

export const RESTAURANT_LOCATION = {
  lat: 36.40,
  lng: 44.31
};
