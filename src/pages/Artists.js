import React, { useState, useEffect } from 'react';
import '../styles/Artists.css';
import ArtistsCard from '../utils/ArtistsCard';
import axios from 'axios';

const server_url = process.env.REACT_APP_SERVER_URL;

export default function Artists() {
    const [timeRange, setTimeRange] = useState('long_term');
    const [selectedRange, setSelectedRange] = useState('1 año');
    const [topArtists, setTopArtists] = useState(null);

    const timeRangeMap = {
        '1 año': 'long_term',
        '6 meses': 'medium_term',
        '1 mes': 'short_term',
    };

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();

        axios.get(server_url + '/get/topArtists', {
            params: { timeRange: timeRange },
            withCredentials: true,
            cancelToken: cancelToken.token
        })
        .then((response) => {
            const topArtistsData = JSON.parse(response.data.topArtists); 
            setTopArtists(topArtistsData);
        })
        .catch((error) => {
            if (axios.isCancel(error)) {
                console.log("Solicitud cancelada");
            } else {
                console.error("Error al obtener los tracks:", error);
            }
        });

        
        return () => cancelToken.cancel();

    }, [timeRange]);

    const handleTimeRangeChange = (event) => {
        const selectedLabel = event.target.value;
        setSelectedRange(selectedLabel);
        setTimeRange(timeRangeMap[selectedLabel]);
    };

    const formatFollowers = (followers) => {
        return new Intl.NumberFormat('es-ES').format(followers);
    };

    const capitalizeGenres = (genres) => {
        return genres.map(genre => genre.charAt(0).toUpperCase() + genre.slice(1)).join(', ');
    };

    return (
        <div className="songs-container main-content d-flex flex-column align-items-center text-center">
            <h2 className="text-light title">Artistas Más Escuchadas</h2>
            <div className="filter-container">
                <label htmlFor="timeRange" className="text-light subtitle">
                    Tus artistas más escuchadas en:
                </label>
                <select
                    id="timeRange"
                    className="time-range-select"
                    value={selectedRange}
                    onChange={handleTimeRangeChange}
                >
                    <option value="1 año">Último año</option>
                    <option value="6 meses">Últimos 6 meses</option>
                    <option value="1 mes">Último mes</option>
                </select>
            </div>
            <div className="songs-list">
                {topArtists && topArtists.items.length > 0 ? (
                    topArtists.items.map((artist, index) => {
                        return (
                            <ArtistsCard
                                key={index}
                                name={artist.name}
                                genres={capitalizeGenres(artist.genres)}
                                followers={formatFollowers(artist.followers.total)+" de followers"}
                                imageUrl={artist.images[0].url}
                                urlSpotify={artist.external_urls.spotify}
                            />
                        );
                    })
                ) : (
                    <p>No hay canciones disponibles.</p>
                )}
            </div>
        </div>
    );
}
