import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import styles from "./Home.module.css";

/**
 * Mapping of genre IDs to their respective readable titles.
 * @type {Object<number, string>}
 */
const GENRES = {
    1: "Personal Growth",
    2: "Investigative Journalism",
    3: "History",
    4: "Comedy",
    5: "Entertainment",
    6: "Business",
    7: "Fiction",
    8: "News",
    9: "Kids and Family",
};

/**
 * An individual podcast episode.
 * @typedef {Object} Episode
 * @property {string|number} id - Unique identifier for the episode.
 * @property {number} episode - The sequential number of the episode.
 * @property {string} title - The title of the episode.
 * @property {string} description - Summary of what happens in the episode.
 */

/**
 * A seasonal group of episodes.
 * @typedef {Object} Season
 * @property {number} season - The sequential number of the season.
 * @property {string} title - The title of the season.
 * @property {string} [image] - Optional URL string for season-specific cover artwork.
 * @property {Episode[]} episodes - List of episodes belonging to this season.
 */
/**
 * The deep schema of a specific podcast show.
 * @typedef {Object} PodcastShow
 * @property {string} id - Unique identifier for the show.
 * @property {string} title - Title of the podcast.
 * @property {string} description - Detailed overview of the podcast series.
 * @property {string} image - URL string for the primary podcast cover artwork.
 * @property {string} updated - ISO date string indicating the last update time.
 * @property {(number|string)} genres - Array of genre IDs or string names.
 * @property {Season[]} seasons - Nested list of seasons available.
 */

/**
 * ShowDetail component displays explicit details, seasons, and episodes for a chosen podcast.
 * It parses the URL parameters for the target ID, issues a network fetch, reads
 * state history to enable smooth back-navigation filters, and handles internal 
 * conditional view logic for load states and network errors.
 *
 * @component
 * @returns {JSX.Element} The detailed layout containing information about the show, seasonal selection dropdown, and structural list of nested episodes.
 */
function ShowDetail() {
    const { id } = useParams();
    const location = useLocation();

    /** @type {[PodcastShow|null, React.Dispatch<React.SetStateAction<PodcastShow|null>>]} */
    const [show, setShow] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(0);
    const [loading, setLoading] = useState(true);
    /** @type {[string|null, React.Dispatch<React.SetStateAction<string|null>>]} */
    const [error, setError] = useState(null);

    const previousSearchTerm = location.state?.searchTerm || '';

    useEffect(() => {
        setLoading(true);
        fetch(`https://podcast-api.netlify.app/id/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch show details');
                return res.json();
            })
            .then((data) => {
                setShow(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className={styles.centerText}>Loading show <details></details>...</div>;
    if (error) return <div className={styles.centerText}>Error: {error}</div>;
    if (!show) return <div className={styles.centerText}>Show not found.</div>;

    const totalSeasons = show.seasons?.length || 0;
    const totalEpisodes =
        show.seasons?.reduce((sum, s) => sum + (s.episodes?.length || 0), 0) || 0;

    const currentSeason = show.seasons[selectedSeason];

    return (
        <div className={styles.detailContainer}>
            <Link to="/" state={{ searchTerm: previousSearchTerm }} className={styles.backLink}>
                ← Back to Shows
            </Link>

            <div className={styles.showHeader}>
                <img src={show.image} alt={show.title} className={styles.coverImage} />
                <div className={styles.headerInfo}>
                    <h1>{show.title}</h1>
                    <p className={styles.description}>{show.description}</p>
                    <p className={styles.metaText}><strong>Last Updated:</strong> {new Date(show.updated).toLocaleDateString()}</p>
                    <p className={styles.metaText}><strong>Total Seasons:</strong> {totalSeasons} &nbsp; <strong>Total Episodes:</strong> {totalEpisodes}</p>
                    <div className={styles.genres}>
                        {show.genres?.map((genreId) => {
                            const genreName =
                                typeof genreId === "string"
                                    ? genreId
                                    : GENRES[genreId] || `Genre ${genreId}`;
                            return (
                                <span key={genreId} className={styles.genreTag}>
                                    {genreName}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>

            <hr className={styles.divider} />

            <h2 className={styles.sectionTitle}>Seasons</h2>
            <div className={styles.seasonSelector}>
                <select
                    value={selectedSeason}
                    onChange={(e) => setSelectedSeason(Number(e.target.value))}
                >
                    {show.seasons?.map((season, index) => (
                        <option key={season.season || index} value={index}>
                            {season.title} ({season.episodes?.length || 0} Episodes)
                        </option>
                    ))}
                </select>
            </div>

            {currentSeason ? (
                <div>
                    <div className={styles.seasonMetaBlock}>
                        <img src={currentSeason.image || show.image} alt={currentSeason.title} className={styles.seasonThumb} />
                        <h3>{currentSeason.title}</h3>
                    </div>

                    <ul className={styles.episodeList}>
                        {currentSeason.episodes?.map((episode, idx) => (
                            <li key={episode.id} className={styles.episodeItem}>
                                <h4>{episode.episode}. {episode.title}</h4>
                                <p>{episode.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className={styles.centerText}>No episodes available for this season.</p>
            )}
        </div>
    );
}

export default ShowDetail;
