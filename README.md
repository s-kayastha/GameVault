# 🎮 GameVault

> Discover free-to-play games, explore new genres, and build your personal gaming collection.

GameVault is a modern, responsive game discovery web application built with React and TypeScript. It allows users to browse a large collection of free-to-play games, search and filter games by genre, view detailed game information, and save their favorite games locally.

## ✨ Features

* 🎮 Browse a large collection of free-to-play games
* 🔎 Search games by title, genre, or platform
* 🏷️ Dynamically filter games by genre
* 📊 View the number of matching games
* ❤️ Add and remove games from Favorites
* 💾 Persist favorites using browser localStorage
* 📖 View detailed information for individual games
* 🔗 Launch games through their external game page
* 📱 Fully responsive design for desktop, tablet, and mobile
* ⚡ Smooth navigation with React Router
* 🎨 Modern dark gaming-focused interface
* ✨ Interactive hover effects and animations

## 🖥️ Preview

### Home

Add a screenshot of your Home page here.

```text
![GameVault Home](./screenshots/home.png)
```

### Games Library

Add a screenshot of your Games page here.

```text
![GameVault Games](./screenshots/games.png)
```

### Game Details

Add a screenshot of your Game Details page here.

```text
![GameVault Details](./screenshots/details.png)
```

### Favorites

Add a screenshot of your Favorites page here.

```text
![GameVault Favorites](./screenshots/favorites.png)
```

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Vite
* React Router
* Lucide React
* CSS

### Data

Game data is retrieved from the FreeToGame API.

### Storage

Favorites are stored locally in the browser using `localStorage`.

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js and npm installed.

### Installation

Clone the repository:

```bash
git clone https://github.com/s-kayastha/GameVault.git
```

Move into the project directory:

```bash
cd GameVault
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the local development URL shown in your terminal.

## 📁 Project Structure

```text
GameVault/
├── public/
├── src/
│   ├── components/
│   │   ├── GameCard.tsx
│   │   ├── GenreButton.tsx
│   │   └── Navbar.tsx
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Games.tsx
│   │   ├── GameDetails.tsx
│   │   └── Favorites.tsx
│   │
│   ├── services/
│   │   ├── gameApi.ts
│   │   └── favorites.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```

## 🔍 How It Works

### Game Discovery

The application retrieves game information from the FreeToGame API and displays the available games through reusable React components.

### Search

Users can search for games using keywords. The Games page searches across:

* Game title
* Genre
* Platform

### Genre Filtering

The available genres are generated from the game data, allowing the filter to adapt to the games returned by the API rather than relying on a small hard-coded genre list.

### Favorites

When a user adds a game to Favorites, a simplified version of the game information is saved to:

```text
localStorage
```

using the GameVault favorites storage key.

The Favorites page reads this information and displays the user's saved collection.

## 📱 Responsive Design

GameVault is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile phones

The interface adapts the navigation, game grid, search controls, hero section, game details, and spacing according to the screen size.

## 🧭 Application Routes

| Route        | Description             |
| ------------ | ----------------------- |
| `/`          | Home / discovery page   |
| `/games`     | Full game library       |
| `/game/:id`  | Individual game details |
| `/favorites` | Saved favorite games    |

## 🔮 Future Improvements

Possible future additions include:

* User accounts
* Cloud-synced favorites
* Advanced sorting
* Multiple platform filters
* Pagination
* Game ratings
* Recently viewed games
* Personalized recommendations
* Loading skeletons
* Dark/light theme support

## 📄 License

This project is intended as a personal portfolio and learning project.

## 👨‍💻 Author

**S. Kayastha**

GitHub:
https://github.com/s-kayastha
