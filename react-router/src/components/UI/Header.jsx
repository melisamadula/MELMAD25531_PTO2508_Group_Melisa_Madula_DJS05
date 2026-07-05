import styles from "./Header.module.css";

/**
 * Header component displays the main application branding and title.
 * This is a stateless presentational component with no props or side effects.
 *
 * @component
 * @returns {JSX.Element} The semantic HTML header containing the app title.
 */
export default function Header() {
  return (
    <header className={styles.appHeader}>
      <h1>🎙️ Podcast App</h1>
    </header>
  );
}
