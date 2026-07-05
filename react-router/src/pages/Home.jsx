import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Simplified representation of a podcast show object returned by the API.
 * @typedef {Object} ShowPreview
 * @property {string} id - Unique identifier for the show.
 * @property {string} title - The display name/title of the podcast.
 * @property {string} image - URL string pointing to the podcast cover artwork image.
 */

/**
 * Home component serves as the primary catalog landing page for the application.
 * It fetches a list of available podcasts, handles localized text filtering, 
 * and retains search history across React Router history states.
 *
 * @component
 * @returns {JSX.Element} A layout containing a search filter input and a grid of filtered podcast cards.
 */
function Home() {
    const location = useLocation();

    // Restore search term if navigating back from a detail page
    const [searchTerm, setSearchTerm] = useState(location.state?.searchTerm || '');

    /** @type {[ShowPreview[], React.Dispatch<React.SetStateAction<ShowPreview[]>>]} */
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://podcast-api.netlify.app')
            .then((res) => res.json())
            .then((data) => {
                setShows(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    /**
     * Filters the base show array based on case-insensitive matches against `searchTerm`.
     * @type {ShowPreview[]}
     */
    const filteredShows = shows.filter(show =>
        show.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div>Loading podcasts...</div>;

    return (
        <div>
            <input
                type="text"
                placeholder="Search podcasts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <div className="podcast-grid">
                {filteredShows.map((show) => (
                    <div key={show.id} className="podcast-card">
                        <img src={show.image} alt={show.title} width="150" />
                        <h3>{show.title}</h3>
                        {/* Pass the current filter state along with the navigation */}
                        <Link to={`/show/${show.id}`} state={{ searchTerm }}>
                            View Show
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
