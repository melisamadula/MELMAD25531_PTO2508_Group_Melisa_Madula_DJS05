import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PodcastProvider } from "./context/PodcastContext";
import { fetchPata } from "./api/fetchPata";
import { genres } from "./data";
import Header from "./components/UI/Header";
import SearchBar from "./components/Filters/SearchBar";
import SortSelect from "./components/Filters/SortSelect";
import GenreFilter from "./components/Filters/GenreFilter";
import PodcastGrid from "./components/Podcasts/PodcastGrid";
import Pagination from "./components/UI/Pagination";
import styles from "./App.module.css";
import ShowDetail from "./pages/ShowDetail";

function HomePage() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPata(setPodcasts, setError, setLoading);
  }, []);

  return (
    <>
      <Header />

      <PodcastProvider initialPodcasts={podcasts}>
        <main className={styles.main}>
          <section className={styles.controls}>
            <SearchBar />
            <GenreFilter genres={genres} />
            <SortSelect />
          </section>

          {loading && (
            <div className={styles.messageContainer}>
              <div className={styles.spinner}></div>
              <p>Loading podcasts...</p>
            </div>
          )}

          {error && (
            <div className={styles.message}>
              <div className={styles.error}>
                Error occurred while fetching podcasts: {error}
              </div>
            </div>
          )}

          {!loading && !error && (
            <>
              <PodcastGrid genres={genres} />
              <Pagination />
            </>
          )}
        </main>
      </PodcastProvider>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/show/:id" element={<ShowDetail />} />
        </Routes>
      </div>
    </Router>
  );
}
