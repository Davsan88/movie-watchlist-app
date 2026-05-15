# 🎬 Dav’s Show Watchlist App – Movie & TV Discovery App

Hello there! 👋
This is a responsive movie and TV watchlist app powered by the TMDB API, where users can search for shows, explore results, and save titles to a personal watchlist.

👉 [**Live Demo**](https://watchlist-app-davsan.netlify.app/)

---

## 🚀 Project Overview

This project started as a Scrimba solo project focused on **APIs and localStorage**, but I expanded it significantly beyond the original scope.

Instead of only displaying raw API data, I focused on building something that felt closer to a real-world frontend application, including:

* Dynamic rendering
* Data transformation
* Persistent watchlist functionality
* Responsive UI design
* Reusable rendering helpers
* Empty/error states
* Component-based CSS organization

The goal was to build something that feels closer to a real-world frontend application, while strengthening my vanilla JavaScript fundamentals.

---

## ✨ What It Does

* ✅ Search movies and TV shows using the TMDB API
* ✅ Dynamically renders search results
* ✅ Displays ratings, genres, release year, and overview
* ✅ Add shows to a persistent watchlist
* ✅ Remove shows from the watchlist
* ✅ Watchlist persists using localStorage
* ✅ Handles missing posters with fallback images
* ✅ Responsive layout across mobile and desktop
* ✅ Includes empty states and “no results” feedback
* ✅ Interactive button states and hover effects

---

## 🧠 Core Concept

The app follows a **data-first rendering approach**.

Raw API responses are transformed into a curated internal structure before rendering:

```js
{
  id,
  label,
  releaseDate,
  posterUrl,
  mediaType,
  genres,
  rating,
  overview
}
```

This separation between:

*API data → transformed state → UI rendering*

helped me practice thinking more like a frontend engineer rather than simply manipulating the DOM directly.

---

## 🛠️ Technologies Used

* HTML5 – Semantic structure
* CSS3 – Responsive layout and UI styling
* JavaScript (ES6) – Rendering logic, API handling, localStorage
* TMDB API – Movie and TV show data

---

## 🎨 Design Approach

* Mobile-first responsive layout
* Flexible containers using min() and clamp()
* Consistent spacing and typography system
* Reusable component styling
* Dark cinematic aesthetic inspired by streaming platforms
* Careful handling of overflowing content and long titles
* Focus on readability and clean hierarchy

---

## 📚 Features Covered

* Dynamic rendering using template functions
* Fetching and transforming external API data
* localStorage persistence
* Event delegation
* Reusable rendering helpers
* Conditional rendering for empty states
* Fallback image handling
* Genre lookup tables using transformed objects
* Responsive card layouts
* Hover, focus, active, disabled, saved, and removed button states
* CSS architecture organization (base / typography / layout / components)

---

## 🧪 How to Use

1. Search for a movie or TV show
2. Browse the rendered results
3. Add shows to your watchlist
4. Visit the Watchlist page
5. Remove shows whenever you want

Your saved watchlist will persist after refreshing the page.

---

## 🎯 What I Focused On

This project was mainly about improving my ability to:

* Organize JavaScript cleanly
* Work with real API data
* Transform and curate data before rendering
* Build reusable rendering logic
* Improve responsive UI consistency
* Polish user interactions and feedback states

I also spent significant time refining layout edge cases like:

* Long titles
* Long genres
* Missing images
* Responsive card alignment

---

## 🏗️ Possible Next Steps

* 🔍 Search suggestions / autocomplete
* 🎭 Filter by genre
* 📄 Individual details page for each show
* 💾 Backend persistence instead of localStorage
* ⚛ Rebuild with React
* 🌙 Theme toggle / dark-light mode
* 🎬 Trailer integration
* 🔐 API proxying with Netlify Functions

---

## 💡 Skills Practiced

* API consumption and asynchronous JavaScript
* Data transformation and normalization
* localStorage persistence
* Event delegation patterns
* Responsive design and layout debugging
* UI/UX polish
* CSS organization and maintainability
* Reusable rendering helpers
* Component-style thinking in vanilla JavaScript

---

## ✅ Why I’m Proud

This project represents a big step forward in how I approach frontend development.

Rather than only focusing on “making it work,” I spent time thinking about:

* Structure
* Maintainability
* User experience
* Responsiveness
* Reusability
* Clean rendering logic

It helped me move beyond tutorial-style coding and closer toward building applications with more intentional architecture and polish.

---

## 🌐 Live Demo

👉 [**Live Demo**](https://watchlist-app-davsan.netlify.app/)

---

## 📫 Contact

Got feedback or questions?
📧 [david.sanchez.martinez@outlook.com](mailto:david.sanchez.martinez@outlook.com)