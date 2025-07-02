# 💼 React Job Board Application

A user-friendly job board built using **React**, allowing users to browse job listings, search by title or location, view detailed job descriptions, and manage favorite jobs using localStorage.

---

## 🚀 Features

- 🔍 **Job Search** – Search by job title or location in real time
- 📄 **Job Listing Page** – Paginated job cards with sorting and skeleton loaders
- 📝 **Job Details Page** – View full job information on a separate route
- ⭐ **Favorite Jobs** – Mark/unmark jobs as favorites and view them in a separate tab
- 🧭 **Sidebar Navigation** – Switch between job listings and favorites
- 🍔 **Hamburger Menu** – Toggle sidebar on all devices
- ⏳ **Skeleton Loading** – While data is being fetched
- 📱 **Responsive Design** – Works seamlessly on mobile, tablet, and desktop

---

## 🧰 Tech Stack

- [React](https://reactjs.org/)
- [React Router DOM](https://reactrouter.com/)
- [React Loading Skeleton](https://github.com/dvtng/react-loading-skeleton)
- HTML, CSS (custom), and localStorage

---

## 📦 Installation & Running Locally

1. **Clone the repository**

```bash
git clone https://github.com/your-username/job-board-app.git
cd job-board-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the development server**

```bash
npm start
```

> Open your browser at `http://localhost:3000`

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx
│   ├── JobList.jsx
│   ├── JobDetails.jsx
│   ├── FavoriteJobs.jsx
│   └── *.css (styles)
├── mock/
│   └── jobs.json
├── App.js
├── App.css
└── index.js
```

---

## 📚 How It Works

### 1. **Job Listings**
- Fetched from `/src/mock/jobs.json`
- Filtered by a single search input (title or location)
- Sorted by salary or title
- Paginated (10 per page)
- Shows skeleton loader during initial load

### 2. **Job Details**
- Route: `/job/:id`
- Shows complete job info
- Styled layout with back navigation

### 3. **Favorites**
- Mark/unmark favorites with `localStorage` persistence
- View all favorites on `/favorites` page
- Remove favorites directly
- Includes pagination and skeleton loading
- Toast notification on remove

### 4. **Sidebar + Hamburger**
- Always-visible hamburger
- Toggle sidebar open/close
- Mobile-friendly

---

## 🛠 Customization Tips

- Edit `jobs.json` to change data
- Customize styles in `App.css` or component-level CSS
- Add new routes or pages easily with React Router

---

## 👨‍💻 Author

**Mohamed Samseed**  
Frontend Developer (React)  
📍 Cochin, India  
