import { useContext } from "react";
import { PodcastContext } from "../../context/PodcastContext";
import styles from "./GenreFilter.module.css";

/**
 * An individual genre object.
 * @typedef {Object} Genre
 * @property {number} id - The unique identifier for the genre.
 * @property {string} title - The display name of the genre.
 */

/**
 * GenreFilter component renders a dropdown menu to select a podcast genre.
 * It consumes `genre` and `setGenre` from the `PodcastContext` to manage global state.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Genre[]} props.genres - Array of available genre objects to populate the dropdown.
 * @returns {JSX.Element} A styled HTML select element with genre options.
 */
export default function GenreFilter({ genres }) {
  const { genre, setGenre } = useContext(PodcastContext);

  return (
    <select
      className={styles.select}
      value={genre}
      onChange={(e) => setGenre(e.target.value)}
    >
      <option value="all">All Genres</option>
      {genres.map((g) => (
        <option key={g.id} value={g.id}>
          {g.title}
        </option>
      ))}
    </select>
  );
}
