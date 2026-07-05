import { useContext } from "react";
import { PodcastContext } from "../../context/PodcastContext";
import styles from "./Pagination.module.css";

/**
 * Pagination component renders a numeric navigation bar for page-based data.
 * It consumes current page, total pages, and navigation state from `PodcastContext`.
 * Automatically hides itself if there is only one page or fewer to display.
 *
 * @component
 * @returns {JSX.Element|null} A row of interactive page buttons, or null if pagination is unnecessary.
 */
export default function Pagination() {
  const { page, setPage, totalPages } = useContext(PodcastContext);

  if (totalPages <= 1) return null;

  /**
   * Generates a sequential array of page numbers from 1 up to totalPages.
   * @type {number[]}
   */
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.paginationWrapper}>
      {pages.map((p) => (
        <button
          key={p}
          className={`${styles.pageButton} ${p === page ? styles.active : ""}`}
          onClick={() => setPage(p)}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
