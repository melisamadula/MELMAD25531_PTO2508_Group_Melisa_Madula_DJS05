import { useState, useEffect, useContext } from "react";
import { PodcastContext } from "../../context/PodcastContext";
import styles from "./SearchBar.module.css";

/**
 * SearchBar component provides a text input for filtering podcasts.
 * It uses a local state to capture typing immediately, then debounces 
 * the input by 300ms before updating the global context state.
 *
 * @component
 * @returns {JSX.Element} A styled search input element.
 */
export default function SearchBar() {
  const { search, setSearch } = useContext(PodcastContext);
  const [value, setValue] = useState(search);

  // Debounce input (300ms) to avoid rapid updates.
  useEffect(() => {
    const id = setTimeout(() => setSearch(value), 300);
    return () => clearTimeout(id);
  }, [value]);

  return (
    <input
      type="search"
      placeholder="Search podcasts…"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={styles.searchInput}
    />
  );
}
