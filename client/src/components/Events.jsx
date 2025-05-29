import React from 'react';
import '../styles/Events.css';

const Events = () => {
    const videos = [
        { id: '5Ct7HIf1jOg', title: 'Matri Shark Tank Pitch' },
        { id: 'vPfH1JT6X2M', title: 'GIMS CMI Overview' },
        { id: 'o2fbnXOR-1Q', title: 'Incubation Intro by GIMS' },
    ];

    return (
        <section className="events-section">
            <h2>Events & Videos</h2>
            <div className="video-grid">
                {videos.map((video) => (
                    <div key={video.id} className="video-container">
                        <iframe
                            width="100%"
                            height="315"
                            src={`https://www.youtube.com/embed/${video.id}`}
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        <p>{video.title}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Events;
