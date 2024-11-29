import React, { useState } from "react";
import "../styles/RecommendedSongCard.css"

const RecommendedSongCard = ({ song }) => {
  const [feedback, setFeedback] = useState("");

  const handleLike = () => {
    console.log("Liked:", song.name);
    console.log(song.preview);
  };

  const handleDislike = () => {
    console.log("Disliked:", song.name);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback:", feedback);
    setFeedback("");
  };

  return (
    <div
      className="recommended-card"
    >
      <div className="recommended-card-top">
        <img
          src={song.image}
          alt={song.name}
          className="card-img-top recommended-card-img"
        />
        <div className="recommended-card-text">
          <h5 className="card-title recommended-card-title">{song.name}</h5>
            <p className="card-text">
              <strong>Artistas:</strong> {song.artists.join(", ")} <br />
              <strong>Álbum:</strong> {song.album} <br />
              <strong>Duración:</strong>{" "}
              {Math.floor(song.duration / 60000)}:
              {String(song.duration % 60000).padStart(2, "0").slice(0, 2)} minutos
            </p>
        </div>
      </div>
      <div className="recommended-card-body">
        <a
          href={song.preview}
          target="_blank"
          rel="noopener noreferrer"
          className="btn recommended-card-listen"
        >
          ▶ Escuchar
        </a>
        <div className="mt-3 recommended-card-feedback-container">
          <button className="btn recommended-card-feedback-button" onClick={handleLike}>
            👍
          </button>
          <button className="btn recommended-card-feedback-button" onClick={handleDislike}>
            👎
          </button>
        </div>
        <form className="mt-3 recommended-card-feedback-form" onSubmit={handleFeedbackSubmit}>
          <div className="form-group">
            <textarea
              className="form-control recommended-card-feedback-text"
              rows="5"
              placeholder="Escribe tu feedback aquí..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn recommended-card-feedback-send">
            Enviar Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecommendedSongCard;
