# 🎬 Dav’s Show Watchlist App – Movie & TV Discovery App

Hello there! 👋
This is a responsive movie and TV watchlist app powered by the TMDB API, where users can search for shows, explore results, and save titles to a personal watchlist.

👉 [**Live Demo**]()

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

