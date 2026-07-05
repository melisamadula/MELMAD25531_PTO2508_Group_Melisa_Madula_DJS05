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

/**
 * HomePage component acts as the foundational sub-route dashboard layout.
 * It houses global filters, async data state banners, and structured podcast lists.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Array} props.podcasts - Complete list of loaded raw podcast shows from the API hook.
 * @param {boolean} props.loading - System-wide evaluation indicator for API operations.
 * @param {string|null} props.error - Relayed structural message string received upon a data capture failure.
 * @returns {JSX.Element} The aggregated home screen landing view.
 */
function HomePage({ podcasts, loading, error }) {
  return (
    <>
      <Header />

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
    </>
  );
}

/**
 * App component serves as the application entry point.
 * It initializes client-side network fetching, orchestrates React Router navigation schemas,
 * and sets up the global `PodcastProvider` state encapsulation mechanism.
 *
 * @component
 * @returns {JSX.Element} Root UI application router wrapping global context.
 */
export default function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPata(setPodcasts, setError, setLoading);
  }, []);

  return (
    <Router>
      <div className="app-container">
        <PodcastProvider initialPodcasts={podcasts}>
          <Routes>
            <Route path="/" element={<HomePage podcasts={podcasts} loading={loading} error={error} />} />
            <Route path="/show/:id" element={<ShowDetail />} />
          </Routes>
        </PodcastProvider>
      </div>
    </Router>
  );
}
