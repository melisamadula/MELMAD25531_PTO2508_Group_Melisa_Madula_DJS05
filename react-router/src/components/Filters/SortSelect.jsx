import { useContext } from "react";
import { SORT_OPTIONS, PodcastContext } from "../../context/PodcastContext";
import styles from "./SortSelect.module.css";

/**
 * SortSelect component renders a dropdown menu to change the podcast sorting order.
 * It maps over external `SORT_OPTIONS` constants and manages selection via `PodcastContext`.
 *
 * @component
 * @returns {JSX.Element} A styled HTML select element for sorting criteria.
 */
export default function SortSelect() {
  const { sortKey, setSortKey } = useContext(PodcastContext);

  return (
    <select
      className={styles.select}
      value={sortKey}
      onChange={(e) => setSortKey(e.target.value)}
    >
      {SORT_OPTIONS.map((o) => (
        <option key={o.key} value={o.key}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
