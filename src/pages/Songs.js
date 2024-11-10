import React, { useState, useEffect } from 'react';
import '../styles/Songs.css';
import TrackCard from '../utils/TrackCard';
import axios from 'axios';

const server_url = process.env.REACT_APP_SERVER_URL;

export default function Songs() {
    const [timeRange, setTimeRange] = useState('long_term');
    const [selectedRange, setSelectedRange] = useState('1 año');
    const [topTracks, setTopTracks] = useState(null);

    const timeRangeMap = {
        '1 año': 'long_term',
        '6 meses': 'medium_term',
        '1 mes': 'short_term',
    };

    useEffect(() => {
        const cancelToken = axios.CancelToken.source(); // Crear un cancel token

        axios.get(server_url + '/get/topTracks', {
            params: { timeRange: timeRange },
            withCredentials: true,
            cancelToken: cancelToken.token // Asignamos el token de cancelación
        })
        .then((response) => {
            setTopTracks(JSON.parse(response.data.topTracks));
        })
        .catch((error) => {
            if (axios.isCancel(error)) {
                console.log("Solicitud cancelada");
            } else {
                console.error("Error al obtener los tracks:", error);
            }
        });

        // Cancelar la solicitud anterior si el componente se desmonta o cambia `timeRange`
        return () => cancelToken.cancel();

    }, [timeRange]);

    const handleTimeRangeChange = (event) => {
        const selectedLabel = event.target.value;
        setSelectedRange(selectedLabel);
        setTimeRange(timeRangeMap[selectedLabel]);
    };

    return (
        <div className="songs-container main-content d-flex flex-column align-items-center text-center">
            <h2 className="text-light title">Canciones Más Escuchadas</h2>
            <div className="filter-container">
                <label htmlFor="timeRange" className="text-light subtitle">
                    Tus canciones más escuchadas en:
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
                {topTracks && topTracks.items.length > 0 ? (
                    topTracks.items.map((track, index) => {
                        return (
                            <TrackCard
                                key={index}
                                title={track.name}
                                artists={track.artists.map(artist => artist.name).join(' ')}
                                album={track.album.name}
                                duration={formatDuration(track.duration_ms)}
                                imageUrl={track.album.images[0].url}
                                urlSpotify={track.external_urls.spotify}
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

const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};
