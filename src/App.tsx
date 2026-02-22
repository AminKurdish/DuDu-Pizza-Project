import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  X, 
  Phone, 
  Clock, 
  ChevronRight,
  Pizza,
  Utensils,
  Coffee,
  Languages,
  Search,
  MapPin
} from 'lucide-react';
import { MENU_ITEMS, WHATSAPP_NUMBER, PIZZA_PRICE_INCREMENTS, DELIVERY_AREAS, RESTAURANT_LOCATION } from './constants';
import { CartItem, CustomerDetails, MenuItem } from './types';

type Language = 'ku' | 'ar';

const TRANSLATIONS = {
  ku: {
    menu: 'لیست',
    about: 'دەربارە',
    contact: 'پەیوەندی',
    bestInShaqlawa: 'باشترین لە شەقڵاوە',
    heroTitle: 'DUDU PIZZA',
    heroSub: 'باشترین پیتزای فڕنی تەقلیدی لە شەقڵاوە. تامی ڕەسەن، کەرەستەی تازە.',
    orderNow: 'ئێستا داوا بکە',
    findUs: 'شوێنەکەمان',
    ourMenu: 'لیستەکەمان',
    menuDesc: 'بە خۆشەویستییەوە لە فڕنی تەقلیدیمان ئامادە کراوە.',
    categories: ['هەمووی', 'پیتزا', 'تەنیشت', 'خواردنەوەکان'],
    add: 'زیادکردن',
    aboutTitle: 'تەقلید لە هەر پارچەیەکدا',
    aboutDesc: 'دوودوو پیتزا کە لە دڵی شەقڵاوە هەڵکەوتووە، لە ساڵی ٢٠١٥ەوە خزمەت بە کۆمەڵگاکە دەکات بە پیتزای ڕەسەنی فڕنی تەقلیدی.',
    fastDelivery: 'گەیاندنی خێرا',
    under30: 'کەمتر لە ٣٠ خولەک',
    localShop: 'دوکانی ناوخۆیی',
    shaqlawaCenter: 'ناوەندی شەقڵاوە',
    visitUs: 'سەردانمان بکەن',
    callUs: 'پەیوەندیمان پێوە بکەن',
    location: 'شوێن',
    mainRoad: 'شەقامی سەرەکی، شەقڵاوە',
    hours: 'کاتژمێرەکان',
    hoursVal: '١٢:٠٠ پ.ن - ١٢:٠٠ ش.ن',
    footer: '© ٢٠٢٦ دوودوو پیتزا شەقڵاوە. هەموو مافەکان پارێزراوە.',
    total: 'کۆی گشتی',
    cartTitle: 'سەبەتەکەت',
    emptyCart: 'سەبەتەکەت بەتاڵە.',
    browseMenu: 'سەیری لیستەکە بکە',
    completeOrder: 'تەواوکردنی داواکاری',
    deliveryDetails: 'زانیارییەکانی گەیاندن',
    whereTo: 'پیتزاکەت بۆ کوێ بنێرین؟',
    fullName: 'ناوی تەواو',
    namePlaceholder: 'بۆ نموونە: ئەحمەد محەمەد',
    neighborhood: 'گەڕەک (شەقڵاوە)',
    locPlaceholder: 'بۆ نموونە: ساراو، ناوەندی شەقڵاوە',
    sendWhatsApp: 'ناردن بۆ واتسئەپ',
    cancel: 'پاشگەزبوونەوە',
    clearCart: 'سڕینەوەی سەبەتە',
    waHeader: '🍕 *داواکاری نوێ لە وێبی دوودوو* 🍕',
    waCustomer: '👤 کڕیار',
    waLocation: '📍 شوێن',
    waItems: '📦 کاڵاکان',
    waTotal: '💰 *کۆی گشتی',
    searchPlaceholder: 'گەڕان بۆ خواردن...',
    size: 'قەبارە',
    small: 'بچووک',
    medium: 'ناوەند',
    large: 'گەورە',
    noResults: 'هیچ خواردنێک نەدۆزرایەوە بەم ناوە.',
    deliveryMethod: 'ڕێگای وەرگرتن',
    pickup: 'وەرگرتن لە چێشتخانە',
    delivery: 'گەیاندن',
    selectArea: 'ناوچەکە هەڵبژێرە',
    deliveryFee: 'کرێی گەیاندن',
    getLocation: 'دیاریکردنی شوێنی من',
    locationFound: 'شوێنەکەت دۆزرایەوە',
    distance: 'دووری',
    km: 'کم',
    waMethod: 'ڕێگا',
    waFee: 'کرێی گەیاندن'
  },
  ar: {
    menu: 'القائمة',
    about: 'حول',
    contact: 'اتصل بنا',
    bestInShaqlawa: 'الأفضل في شقلاوة',
    heroTitle: 'DUDU PIZZA',
    heroSub: 'أفضل بيتزا فرن تقليدي في شقلاوة. نكهة أصيلة، مكونات طازجة.',
    orderNow: 'اطلب الآن',
    findUs: 'موقعنا',
    ourMenu: 'قائمتنا',
    menuDesc: 'محضر بكل حب في فرننا التقليدي.',
    categories: ['الكل', 'بيتزا', 'جانبي', 'مشروبات'],
    add: 'إضافة',
    aboutTitle: 'التقليد في كل قطعة',
    aboutDesc: 'يقع دودو بيتزا في قلب شقلاوة، ويخدم المجتمع ببيتزا الفرن التقليدية الأصيلة منذ عام 2015.',
    fastDelivery: 'توصيل سريع',
    under30: 'أقل من 30 دقيقة',
    localShop: 'متجر محلي',
    shaqlawaCenter: 'مركز شقلاوة',
    visitUs: 'تفضل بزيارتنا',
    callUs: 'اتصل بنا',
    location: 'الموقع',
    mainRoad: 'الطريق الرئيسي، شقلاوة',
    hours: 'الساعات',
    hoursVal: '12:00 م - 12:00 ص',
    footer: '© 2026 دودو بيتزا شقلاوة. جميع الحقوق محفوظة.',
    total: 'المجموع',
    cartTitle: 'سلتك',
    emptyCart: 'سلتك فارغة.',
    browseMenu: 'تصفح القائمة',
    completeOrder: 'إتمام الطلب',
    deliveryDetails: 'تفاصيل التوصيل',
    whereTo: 'أين نرسل البيتزا الخاصة بك؟',
    fullName: 'الاسم الكامل',
    namePlaceholder: 'مثال: أحمد محمد',
    neighborhood: 'الحي (شقلاوة)',
    locPlaceholder: 'مثال: ساراو، مركز شقلاوة',
    sendWhatsApp: 'إرسال إلى واتساب',
    cancel: 'إلغاء',
    clearCart: 'مسح السلة',
    waHeader: '🍕 *طلب جديد من ويب دودو* 🍕',
    waCustomer: '👤 العميل',
    waLocation: '📍 الموقع',
    waItems: '📦 الأصناف',
    waTotal: '💰 *المجموع الكلي',
    searchPlaceholder: 'البحث عن طعام...',
    size: 'الحجم',
    small: 'صغير',
    medium: 'وسط',
    large: 'كبير',
    noResults: 'لم يتم العثور على نتائج لهذا البحث.',
    deliveryMethod: 'طريقة الاستلام',
    pickup: 'الاستلام من المطعم',
    delivery: 'توصيل',
    selectArea: 'اختر المنطقة',
    deliveryFee: 'رسوم التوصيل',
    getLocation: 'تحديد موقعي',
    locationFound: 'تم العثور على موقعك',
    distance: 'المسافة',
    km: 'كم',
    waMethod: 'الطريقة',
    waFee: 'رسوم التوصيل'
  }
};

interface MenuItemCardProps {
  item: MenuItem;
  lang: Language;
  t: any;
  onAdd: (item: MenuItem, quantity: number, size?: 'Small' | 'Medium' | 'Large') => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, lang, t, onAdd }) => {
  const [selectedSize, setSelectedSize] = useState<'Small' | 'Medium' | 'Large'>('Small');
  const [quantity, setQuantity] = useState(1);
  
  const currentPrice = item.category === 'pizza' 
    ? (selectedSize === 'Medium' ? item.price + PIZZA_PRICE_INCREMENTS.MEDIUM : selectedSize === 'Large' ? item.price + PIZZA_PRICE_INCREMENTS.LARGE : item.price)
    : item.price;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card rounded-2xl overflow-hidden group hover:border-pizza-red/20 transition-compact flex flex-col"
    >
      <div className="relative h-40 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name[lang]} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-md border border-gray-100 shadow-sm">
          <span className="text-pizza-red font-bold text-xs">{currentPrice.toLocaleString()} IQD</span>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-base font-bold text-[#333333] leading-tight">{item.name[lang]}</h3>
          {item.category === 'pizza' ? <Pizza className="w-4 h-4 text-pizza-red shrink-0" /> : 
           item.category === 'side' ? <Utensils className="w-4 h-4 text-pizza-red shrink-0" /> : 
           <Coffee className="w-4 h-4 text-blue-500 shrink-0" />}
        </div>
        <p className="text-[#333333]/40 text-xs mb-4 line-clamp-2 h-8">
          {item.description[lang]}
        </p>
        
        {item.category === 'pizza' && (
          <div className="mb-4">
            <p className="text-[10px] uppercase font-bold text-[#333333]/40 mb-2 tracking-widest">{t.size}</p>
            <div className="grid grid-cols-3 gap-1">
              {(['Small', 'Medium', 'Large'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                    selectedSize === size 
                      ? 'bg-pizza-red text-white border-pizza-red shadow-sm' 
                      : 'bg-gray-50 text-[#333333]/60 border-gray-100 hover:border-pizza-red/30'
                  }`}
                >
                  {size === 'Small' ? t.small : size === 'Medium' ? t.medium : t.large}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto flex items-center gap-2">
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1 border border-gray-200">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 text-[#333333]/40 hover:text-pizza-red transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-bold w-4 text-center text-[#333333]">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 text-[#333333]/40 hover:text-pizza-red transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <button 
            onClick={() => {
              onAdd(item, quantity, item.category === 'pizza' ? selectedSize : undefined);
              setQuantity(1);
            }}
            className="flex-1 py-2 bg-gray-50 hover:bg-pizza-red text-[#333333] hover:text-white text-xs font-bold rounded-xl border border-gray-200 hover:border-pizza-red transition-compact flex items-center justify-center gap-2 group/btn"
          >
            <Plus className="w-3.5 h-3.5 group-hover/btn:rotate-90 transition-transform" /> {t.add}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('ku');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: '',
    neighborhood: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup');
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const t = TRANSLATIONS[lang];

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const deg2rad = (deg: number) => deg * (Math.PI / 180);

  const handleGetLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          const dist = calculateDistance(latitude, longitude, RESTAURANT_LOCATION.lat, RESTAURANT_LOCATION.lng);
          setDistance(dist);
          setIsLocating(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLocating(false);
          alert("نەتوانرا شوێنەکەت دیاری بکرێت. تکایە بە دەست ناوچەکە هەڵبژێرە.");
        }
      );
    } else {
      alert("گەڕانۆکەکەت پشتگیری دیاریکردنی شوێن ناکات.");
      setIsLocating(false);
    }
  };

  const selectedArea = useMemo(() => {
    return DELIVERY_AREAS.find(a => a.id === selectedAreaId);
  }, [selectedAreaId]);

  const deliveryFee = useMemo(() => {
    if (deliveryMethod === 'pickup') return 0;
    
    if (distance !== null) {
      if (distance < 2) return 2000;
      if (distance < 5) return 4000;
      return 6000;
    }
    
    return selectedArea?.price || 0;
  }, [deliveryMethod, selectedArea, distance]);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchesSearch = item.name[lang].toLowerCase().includes(searchQuery.toLowerCase());
      
      if (activeCategoryIndex === 0) return matchesSearch;
      
      const activeCategory = t.categories[activeCategoryIndex];
      const matchesCategory = 
                             (activeCategory === 'Pizza' && item.category === 'pizza') ||
                             (activeCategory === 'Sides' && item.category === 'side') ||
                             (activeCategory === 'Drinks' && item.category === 'drink') ||
                             // Kurdish translations for categories
                             (activeCategory === 'پیتزا' && item.category === 'pizza') ||
                             (activeCategory === 'تەنیشت' && item.category === 'side') ||
                             (activeCategory === 'خواردنەوەکان' && item.category === 'drink') ||
                             // Arabic translations for categories
                             (activeCategory === 'بيتزا' && item.category === 'pizza') ||
                             (activeCategory === 'جانبي' && item.category === 'side') ||
                             (activeCategory === 'مشروبات' && item.category === 'drink');
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategoryIndex, lang, t.categories]);

  const totalAmount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + deliveryFee;
  }, [cart, deliveryFee]);

  const addToCart = (item: MenuItem, quantity: number, size?: 'Small' | 'Medium' | 'Large') => {
    const price = size === 'Medium' ? item.price + PIZZA_PRICE_INCREMENTS.MEDIUM : size === 'Large' ? item.price + PIZZA_PRICE_INCREMENTS.LARGE : item.price;
    const cartId = size ? `${item.id}-${size}` : item.id;
    const displayName = size ? `${item.name[lang]} (${size === 'Small' ? t.small : size === 'Medium' ? t.medium : t.large})` : item.name[lang];

    setCart(prev => {
      const existing = prev.find(i => i.id === cartId);
      if (existing) {
        return prev.map(i => i.id === cartId ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { 
        id: cartId, 
        name: displayName, 
        price, 
        quantity, 
        image: item.image,
        size
      }];
    });
  };

  const incrementCartItem = (id: string) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.id !== id);
    });
  };

  const handleCompleteOrder = () => {
    if (cart.length === 0) return;
    setIsOrderModalOpen(true);
  };

  const sendWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    const itemsList = cart.map(item => `${item.quantity}x ${item.name} - ${(item.price * item.quantity).toLocaleString()} IQD`).join('\n');
    
    let methodStr = deliveryMethod === 'pickup' ? t.pickup : t.delivery;
    if (deliveryMethod === 'delivery') {
      if (userLocation) {
        methodStr += ` (GPS - ${distance?.toFixed(1)}km)`;
      } else if (selectedArea) {
        methodStr += ` (${selectedArea.name[lang]})`;
      }
    }
    
    let locationSection = `${t.waLocation}: ${customerDetails.neighborhood}`;
    if (userLocation) {
      locationSection += `\n📍 Maps: https://www.google.com/maps?q=${userLocation.lat},${userLocation.lng}`;
    }

    const message = `${t.waHeader}
--------------------------
${t.waCustomer}: ${customerDetails.name}
${locationSection}
--------------------------
${t.waMethod}: ${methodStr}
${t.waFee}: ${deliveryFee.toLocaleString()} IQD
--------------------------
${t.waItems}:
${itemsList}
--------------------------
${t.waTotal}: ${totalAmount.toLocaleString()} IQD*`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}?text=${encodedMessage}`, '_blank');
    
    setIsOrderModalOpen(false);
    setIsCartOpen(false);
    setCart([]);
    setCustomerDetails({ name: '', neighborhood: '' });
  };

  return (
    <div className="min-h-screen font-sans selection:bg-pizza-red selection:text-white" dir="rtl">
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-40 sticky-nav border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-pizza-red rounded-full flex items-center justify-center shadow-lg shadow-pizza-red/20">
              <Pizza className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-[#333333]">
              DuDu <span className="text-pizza-red">Pizza</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#menu" className="text-sm font-medium text-[#333333]/70 hover:text-pizza-red transition-colors">{t.menu}</a>
            <a href="#about" className="text-sm font-medium text-[#333333]/70 hover:text-pizza-red transition-colors">{t.about}</a>
            <a href="#contact" className="text-sm font-medium text-[#333333]/70 hover:text-pizza-red transition-colors">{t.contact}</a>
          </nav>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLang(lang === 'ku' ? 'ar' : 'ku')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 border border-gray-200 text-xs font-bold text-[#333333] hover:bg-gray-200 transition-compact"
            >
              <Languages className="w-4 h-4 text-pizza-red" />
              {lang === 'ku' ? 'العربية' : 'کوردی'}
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#333333] hover:text-pizza-red transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pizza-red text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/pizza-hero/1920/1080?blur=3" 
            alt="Wood-fired pizza" 
            className="w-full h-full object-cover opacity-10"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/50 to-white" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-0.5 rounded-full bg-pizza-red/10 border border-pizza-red/20 text-pizza-red text-[10px] font-bold uppercase tracking-widest mb-4">
              {t.bestInShaqlawa}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-[#333333] mb-4 tracking-tighter leading-none">
              DUDU <span className="text-pizza-red">PIZZA</span>
            </h1>
            <p className="text-lg md:text-xl text-[#333333]/60 mb-8 font-light max-w-xl mx-auto">
              {t.heroSub}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a 
                href="#menu" 
                className="w-full sm:w-auto px-6 py-3 bg-pizza-red hover:bg-pizza-red/90 text-white text-sm font-bold rounded-lg transition-compact transform hover:scale-105 flex items-center justify-center gap-2"
              >
                {t.orderNow} <ChevronRight className="w-4 h-4 rotate-180" />
              </a>
              <a 
                href="#contact" 
                className="w-full sm:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-[#333333] text-sm font-bold rounded-lg transition-compact border border-gray-200"
              >
                {t.findUs}
              </a>
            </div>
            <p className="mt-6 text-[10px] text-[#333333]/30 uppercase tracking-[0.2em] font-bold">
              {lang === 'ku' ? 'گەیاندنی خۆڕایی بۆ ناو شەقڵاوە' : 'توصيل مجاني داخل شقلاوة'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="flex-1">
            <h2 className="text-3xl font-black text-[#333333] mb-1 tracking-tight">{t.ourMenu}</h2>
            <p className="text-[#333333]/40 text-sm mb-4">{t.menuDesc}</p>
            <div className="relative max-w-md">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#333333] placeholder:text-[#333333]/20 focus:outline-none focus:border-pizza-red transition-colors"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#333333]/30 hover:text-[#333333]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-2 no-scrollbar">
            {t.categories.map((cat, index) => (
              <button 
                key={cat}
                onClick={() => setActiveCategoryIndex(index)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-compact whitespace-nowrap border ${
                  activeCategoryIndex === index ? 'bg-pizza-red text-white border-pizza-red shadow-md' : 'bg-white text-[#333333]/60 border-gray-200 hover:text-pizza-red hover:border-pizza-red/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <MenuItemCard 
              key={item.id} 
              item={item} 
              lang={lang} 
              t={t} 
              onAdd={addToCart} 
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[#333333]/10" />
            </div>
            <p className="text-[#333333]/40 text-sm">{t.noResults}</p>
          </div>
        )}
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border-4 border-white shadow-xl">
              <img 
                src="https://picsum.photos/seed/pizza-oven/800/600" 
                alt="Our Oven" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-black text-[#333333] mb-4 tracking-tight">{t.aboutTitle}</h2>
            <p className="text-base text-[#333333]/60 mb-6 leading-relaxed">
              {t.aboutDesc}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-pizza-red/10 text-pizza-red">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#333333] text-xs">{t.fastDelivery}</h4>
                  <p className="text-[10px] text-[#333333]/40">{t.under30}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-pizza-red/10 text-pizza-red">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#333333] text-xs">{t.localShop}</h4>
                  <p className="text-[10px] text-[#333333]/40">{t.shaqlawaCenter}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black text-[#333333] mb-10 tracking-tight">{t.visitUs}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-2xl">
              <Phone className="w-6 h-6 text-pizza-red mx-auto mb-3" />
              <h4 className="font-bold text-[#333333] text-sm mb-1">{t.callUs}</h4>
              <p className="text-[#333333]/40 text-xs">+964 750 XXX XXXX</p>
            </div>
            <div className="glass-card p-6 rounded-2xl">
              <MapPin className="w-6 h-6 text-pizza-red mx-auto mb-3" />
              <h4 className="font-bold text-[#333333] text-sm mb-1">{t.location}</h4>
              <p className="text-[#333333]/40 text-xs">{t.mainRoad}</p>
            </div>
            <div className="glass-card p-6 rounded-2xl">
              <Clock className="w-6 h-6 text-emerald-600 mx-auto mb-3" />
              <h4 className="font-bold text-[#333333] text-sm mb-1">{t.hours}</h4>
              <p className="text-[#333333]/40 text-xs">{t.hoursVal}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-100 text-center">
        <p className="text-[#333333]/20 text-[10px]">{t.footer}</p>
      </footer>

      {/* Floating Cart Icon (Mobile) */}
      <AnimatePresence>
        {cart.length > 0 && !isCartOpen && (
          <motion.button
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-pizza-red text-white px-5 py-3 rounded-full shadow-2xl shadow-pizza-red/40 flex items-center gap-3 border border-white/20"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-white text-pizza-red text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            </div>
            <div className="text-right">
              <p className="text-[8px] uppercase font-bold opacity-70 leading-none mb-0.5">{t.total}</p>
              <p className="text-base font-black leading-none">{totalAmount.toLocaleString()} IQD</p>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-[70] shadow-2xl border-l border-gray-100 flex flex-col"
            >
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-xl font-black text-[#333333]">{t.cartTitle}</h3>
                <div className="flex items-center gap-2">
                  {cart.length > 0 && (
                    <button 
                      onClick={() => setCart([])}
                      className="text-[10px] font-bold text-pizza-red/40 hover:text-pizza-red transition-colors uppercase tracking-wider"
                    >
                      {t.clearCart}
                    </button>
                  )}
                  <button onClick={() => setIsCartOpen(false)} className="p-2 text-[#333333]/40 hover:text-[#333333]">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                      <ShoppingCart className="w-8 h-8 text-[#333333]/10" />
                    </div>
                    <p className="text-[#333333]/40 text-sm">{t.emptyCart}</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="mt-3 text-pizza-red text-sm font-bold hover:underline"
                    >
                      {t.browseMenu}
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover border border-gray-100" referrerPolicy="no-referrer" />
                      <div className="flex-1">
                        <h4 className="font-bold text-[#333333] text-sm">{item.name}</h4>
                        <p className="text-pizza-red text-xs font-bold">{item.price.toLocaleString()} IQD</p>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1 border border-gray-100">
                        <button onClick={() => removeFromCart(item.id)} className="p-1 hover:text-pizza-red transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-3 text-center text-[#333333]">{item.quantity}</span>
                        <button onClick={() => incrementCartItem(item.id)} className="p-1 hover:text-pizza-red transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-5 border-t border-gray-100 bg-gray-50 space-y-4">
                  {/* Delivery Method Selection in Sidebar */}
                  <div className="space-y-2">
                    <p className="text-[9px] uppercase font-bold text-[#333333]/40 tracking-widest">{t.deliveryMethod}</p>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setDeliveryMethod('pickup')}
                        className={`py-2 rounded-lg text-[10px] font-bold border transition-all flex items-center justify-center gap-1.5 ${
                          deliveryMethod === 'pickup'
                            ? 'bg-pizza-red text-white border-pizza-red shadow-sm'
                            : 'bg-white text-[#333333]/60 border-gray-200 hover:border-pizza-red/30'
                        }`}
                      >
                        <Utensils className="w-3 h-3" />
                        {t.pickup}
                      </button>
                      <button
                        onClick={() => setDeliveryMethod('delivery')}
                        className={`py-2 rounded-lg text-[10px] font-bold border transition-all flex items-center justify-center gap-1.5 ${
                          deliveryMethod === 'delivery'
                            ? 'bg-pizza-red text-white border-pizza-red shadow-sm'
                            : 'bg-white text-[#333333]/60 border-gray-200 hover:border-pizza-red/30'
                        }`}
                      >
                        <MapPin className="w-3 h-3" />
                        {t.delivery}
                      </button>
                    </div>
                  </div>

                  {deliveryMethod === 'delivery' && (
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <p className="text-[9px] uppercase font-bold text-[#333333]/40 tracking-widest">{t.getLocation}</p>
                        <button 
                          onClick={handleGetLocation}
                          disabled={isLocating}
                          className={`w-full py-2.5 rounded-lg text-[10px] font-bold border transition-all flex items-center justify-center gap-2 ${
                            userLocation 
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                              : 'bg-white text-pizza-red border-pizza-red/20 hover:bg-pizza-red/5'
                          }`}
                        >
                          {isLocating ? (
                            <div className="w-3 h-3 border-2 border-pizza-red border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <MapPin className="w-3.5 h-3.5" />
                          )}
                          {userLocation ? t.locationFound : t.getLocation}
                        </button>
                        {distance !== null && (
                          <div className="flex items-center justify-between px-1">
                            <span className="text-[10px] text-[#333333]/40">{t.distance}</span>
                            <span className="text-[10px] font-bold text-emerald-600">{distance.toFixed(1)} {t.km}</span>
                          </div>
                        )}
                      </div>

                      {!userLocation && (
                        <div className="space-y-1.5">
                          <p className="text-[9px] uppercase font-bold text-[#333333]/40 tracking-widest">{t.selectArea}</p>
                          <div className="flex flex-col gap-1">
                            {DELIVERY_AREAS.map((area) => (
                              <button
                                key={area.id}
                                onClick={() => setSelectedAreaId(area.id)}
                                className={`px-3 py-2 rounded-lg text-[10px] font-bold border transition-all flex items-center justify-between ${
                                  selectedAreaId === area.id
                                    ? 'bg-pizza-red/5 text-pizza-red border-pizza-red'
                                    : 'bg-white text-[#333333]/60 border-gray-200 hover:border-pizza-red/30'
                                }`}
                              >
                                <span>{area.name[lang]}</span>
                                <span>+{area.price.toLocaleString()} IQD</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex justify-between mb-1">
                      <span className="text-[#333333]/40 text-xs">{t.deliveryFee}</span>
                      <span className="text-xs font-bold text-[#333333]">{deliveryFee.toLocaleString()} IQD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#333333]/40 text-sm">{t.total}</span>
                      <span className="text-lg font-black text-[#333333]">{totalAmount.toLocaleString()} IQD</span>
                    </div>
                  </div>
                  <button 
                    onClick={handleCompleteOrder}
                    disabled={deliveryMethod === 'delivery' && !selectedAreaId && !userLocation}
                    className="w-full py-3.5 bg-pizza-red hover:bg-pizza-red/90 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white text-sm font-black rounded-xl shadow-xl shadow-pizza-red/20 transition-all flex items-center justify-center gap-2"
                  >
                    {t.completeOrder} <ChevronRight className="w-4 h-4 rotate-180" />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Order Modal */}
      <AnimatePresence>
        {isOrderModalOpen && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOrderModalOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-white rounded-[2rem] p-6 border border-gray-100 shadow-2xl"
            >
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-pizza-red/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-pizza-red" />
                </div>
                <h3 className="text-xl font-black text-[#333333]">{t.deliveryDetails}</h3>
                <p className="text-[#333333]/40 text-xs">{t.whereTo}</p>
              </div>

              <form onSubmit={sendWhatsAppOrder} className="space-y-4">
                <div>
                  <label className="block text-[9px] uppercase font-bold text-[#333333]/40 mb-1 mr-1 tracking-widest">{t.fullName}</label>
                  <input 
                    required
                    type="text" 
                    value={customerDetails.name}
                    onChange={(e) => setCustomerDetails(prev => ({ ...prev, name: e.target.value }))}
                    placeholder={t.namePlaceholder}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#333333] placeholder:text-[#333333]/10 focus:outline-none focus:border-pizza-red transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[9px] uppercase font-bold text-[#333333]/40 mb-1 mr-1 tracking-widest">{t.neighborhood}</label>
                  <input 
                    required
                    type="text" 
                    value={customerDetails.neighborhood}
                    onChange={(e) => setCustomerDetails(prev => ({ ...prev, neighborhood: e.target.value }))}
                    placeholder={t.locPlaceholder}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#333333] placeholder:text-[#333333]/10 focus:outline-none focus:border-pizza-red transition-colors"
                  />
                </div>
                <div className="pt-4">
                  <button 
                    type="submit"
                    disabled={
                      !customerDetails.name.trim() || 
                      !customerDetails.neighborhood.trim() || 
                      (deliveryMethod === 'delivery' && !selectedAreaId && !userLocation)
                    }
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white text-sm font-black rounded-xl shadow-xl shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
                  >
                    {t.sendWhatsApp} <ChevronRight className="w-4 h-4 rotate-180" />
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsOrderModalOpen(false)}
                    className="w-full mt-2 py-2 text-[#333333]/20 hover:text-[#333333]/40 text-xs font-bold transition-colors"
                  >
                    {t.cancel}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
