# 🛒 Amazon Clone — Full-Stack E-Commerce Platform

A feature-rich, responsive Amazon clone built with **React 19**, **Vite**, **Redux Toolkit**, and **Firebase** (Authentication & Cloud Firestore). This application delivers an authentic Amazon shopping experience, covering everything from product discovery and live customer reviews to cart persistence, checkout, and an Amazon Seller Central listing studio.

---

## ✨ Features

### 1. 🔍 Navigation & Browsing
- **Authentic Amazon Navbar**: Search bar with category dropdown, Deliver-To location picker, account sign-in controls, returns/orders shortcut, wishlist counter, and live cart item badge.
- **Responsive Subnav Bar**: Horizontal scrollable subnav with Amazon department shortcuts (*Today's Deals*, *Best Sellers*, *Electronics*, *Fashion*, *Beauty*, *Customer Service*, and *🛍️ Sell*).
- **Slide-Out Sidebar Drawer**: Collapsible hamburger menu with department and digital content links.
- **Hero Image Carousel**: Smooth automated banner carousel with Amazon-style bottom gradient overlay.

### 2. 🏷️ Product Catalog, Filtering & Sorting
- **Extensive Catalog**: 24 curated products across multiple departments (*Electronics, Fashion, Beauty, Toys, Grocery, Office, Gifts*), plus support for dynamically published seller products.
- **Real-Time Search & Category Filters**: Search by keyword combined with department selection.
- **Dynamic Sort Bar**:
  - **Featured** (Default catalog order)
  - **Price: Low to High**
  - **Price: High to Low**
  - **Avg. Customer Review** (Highest rated items first)
  - **Highest Discount** (Greatest deals first)
  - **Newest Arrivals**
- **`✓prime` Quick Filter**: One-click toggle to view only Prime-eligible products with fast delivery.

### 3. 📦 Product Details & Customer Reviews
- High-resolution image zoom layout with discount badge and price savings calculation.
- Stock availability indicators and dynamic Amazon "About this item" bullet points.
- **Interactive Review System**: Live customer review submission with star ratings (1–5 stars) and timestamped feedback stored in **Firebase Cloud Firestore**.

### 4. 🛒 Cart & Wishlist (Persistent)
- **Local Storage Persistence**: Cart and Wishlist states are synced to `localStorage`, preserving items, quantities, and subtotal calculations even after page refreshes.
- Adjust item quantities, remove products, or move items directly from Wishlist into the Cart.
- Subtotal and item count calculations formatted to 2 decimal places.

### 5. 💳 Checkout, Payment & Order Tracking
- Delivery address and payment information entry with client-side form validation.
- Submits completed orders to Firebase Firestore under `users/{uid}/orders`.
- **Order History Page (`/orders`)**: View past orders, order dates, items purchased, and total amounts.

### 6. 🚀 Amazon Seller Central (`/sell`)
- **Seller Studio**: Allows users to publish new products directly into the store catalog.
- **Image Uploads**: Upload local images from your computer (converts to persistent Data URL) or paste high-res CDN image URLs.
- **Smart Pricing Engine**: Calculates customer savings and discounted prices in real-time.
- **Dynamic Feature Bullet Points**: Add or remove feature bullets on the fly.
- **Live "How Shoppers See It" Preview Card**: Real-time sticky preview card mirroring what buyers will see in the store.
- **Instant Storefront Publishing**: Products are instantly added to Redux and persisted to `localStorage`, appearing at the top of the Home feed and on their own detail pages.

### 7. 🔐 Authentication
- **Firebase Authentication**: User registration, login, and sign-out with toast feedback.
- Persistent session handling using Firebase `onAuthStateChanged`.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 5](https://vitejs.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & [React-Redux](https://react-redux.js.org/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Backend & Database**: [Firebase v12](https://firebase.google.com/) (Authentication & Cloud Firestore)
- **UI Components & Utilities**:
  - [React Responsive Carousel](https://www.npmjs.com/package/react-responsive-carousel)
  - [React Toastify](https://fkhadra.github.io/react-toastify/)
  - [FontAwesome Icons](https://fontawesome.com/)
- **Linter**: [Oxlint](https://oxc.rs/)

---

## 📂 Project Structure

```text
Amazon-Clone/
├── public/
│   ├── images/              # Hero slides, logos, and product assets
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Footer/          # Multi-column Amazon footer & back-to-top
│   │   ├── Header/          # Main navbar, search, subnav, and badges
│   │   ├── OrderCard/       # Individual order receipt card
│   │   ├── ProductCard/     # Storefront product card with rating & prime badges
│   │   └── Sidebar/         # Drawer navigation menu
│   ├── data/
│   │   └── products.json    # Initial product catalog (24 items)
│   ├── pages/
│   │   ├── Checkout/        # Shopping cart review and subtotal
│   │   ├── Home/            # Hero carousel, filter bar, and product feed
│   │   ├── Login/           # Firebase sign in / sign up form
│   │   ├── Orders/          # Past order history from Firestore
│   │   ├── Payment/         # Delivery address and payment processing
│   │   ├── ProductDetail/   # Product specifications and Firestore reviews
│   │   ├── Sell/            # Seller Central product listing studio
│   │   ├── ThankYou/        # Post-purchase order confirmation
│   │   └── Wishlist/        # Saved products management
│   ├── services/
│   │   └── firebase.js      # Firebase app, Auth, and Firestore initialization
│   ├── store/
│   │   ├── cartSlice.js     # Cart state with localStorage persistence
│   │   ├── productSlice.js  # Product catalog and seller listing state
│   │   ├── searchSlice.js   # Global search term and category filter state
│   │   ├── userSlice.js     # Active user authentication state
│   │   ├── wishlistSlice.js # Wishlist state with localStorage persistence
│   │   └── store.js         # Redux store configuration
│   ├── styles/
│   │   └── global.css       # Core layout, navbar, filter bar, and utility styles
│   ├── App.jsx              # Application routes and auth listener
│   └── main.jsx             # Entry point with Redux Provider
├── .env.example             # Template for Firebase credentials
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher recommended) installed.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Amazon-Clone.git
cd Amazon-Clone
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Firebase Environment Variables

1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication** (Email/Password provider).
3. Enable **Cloud Firestore Database** (start in Test mode or configure appropriate security rules).
4. Create a `.env` file in the root directory by copying `.env.example`:

```bash
cp .env.example .env
```

5. Fill in your Firebase configuration keys in `.env`:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for Production

```bash
npm run build
```

The optimized static production files will be output to the `dist/` directory.

To test the production build locally:

```bash
npm run preview
```

---

## 📝 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server with Hot Module Replacement (HMR). |
| `npm run build` | Compiles and minifies the application for production deployment. |
| `npm run preview` | Runs a local server serving the production `dist/` build. |
| `npm run lint` | Runs Oxlint across the project source code. |

---

## 📄 License

This project is created for educational and portfolio demonstration purposes. All Amazon logos, trademarks, and branding assets belong to **Amazon.com, Inc.**
