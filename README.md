# DuDu Pizza Shaqlawa

Professional wood-fired pizza ordering website for DuDu Pizza in Shaqlawa, Kurdistan. Built with a focus on speed, usability, and a "Fresh and Appetizing" clean light mode aesthetic.

## 🍕 Features

- **Multi-language Support**: Fully localized in Kurdish (Sorani) and Arabic.
- **Clean Light Mode**: A modern, high-contrast design using Pure White (#FFFFFF), Dark Charcoal (#333333), and Bright Red (#D32F2F) accents.
- **Smart Menu**:
  - Search functionality to quickly find items.
  - Category filtering (Pizza, Sides, Drinks).
  - **Size Selection**: Choose between Small, Medium (+3,000 IQD), and Large (+6,000 IQD) for pizzas.
  - **Quantity Selector**: Add multiple quantities of specific sizes directly from the menu.
- **Interactive Cart**: Manage your order with a slide-out sidebar, update quantities, or remove items.
- **WhatsApp Integration**: Seamlessly send your order details, including sizes and quantities, directly to the shop's WhatsApp.
- **Responsive Design**: Optimized for both desktop precision and mobile touch interactions.

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 📱 WhatsApp Order Format

Orders are sent to WhatsApp in a clean, scannable format:

```text
🍕 *داواکاری نوێ لە وێبی دوودوو* 🍕
--------------------------
👤 کڕیار: [ناوی کڕیار]
📍 شوێن: [گەڕەک]
--------------------------
📦 کاڵاکان:
1x پیتزای پێپەرۆنی (گەورە) - 16,000 IQD
2x کۆلا/دیو - 2,000 IQD
--------------------------
💰 *کۆی گشتی: 18,000 IQD*
```

## 📄 License

© 2026 DuDu Pizza Shaqlawa. All rights reserved.
