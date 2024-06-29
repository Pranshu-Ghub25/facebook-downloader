// src/FacebookDownloader.js
import React, { useState } from 'react';
import axios from 'axios';
import './Facebook.css';

const FBDownloader = () => {
  const [url, setUrl] = useState('');
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    setLoading(true);
    setError(null);

    const options = {
      method: 'GET',
      url: 'https://facebook-reel-and-video-downloader.p.rapidapi.com/app/main.php',
      params: { url },
      headers: {
        'x-rapidapi-key': '5149801459mshc73f6dd56a0de63p1fde6djsn014b47b2b314',
        'x-rapidapi-host': 'facebook-reel-and-video-downloader.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      if (response.data.success) {
        setVideoData(response.data);
      } else {
        setError('Failed to download video');
      }
    } catch (err) {
      setError('Failed to download video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="downloader-container">
      <h1>Facebook Video Downloader</h1>
      <h5>Powered by <span >Social Media Video Downloader</span> & presented by <span>Lucifer Panda</span> 🐼</h5>
      <input
        type="text"
        placeholder="Enter Facebook video URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="url-input"
      />
      <button onClick={handleDownload} className="download-button" disabled={loading}>
        {loading ? 'Downloading...' : 'Download'}
      </button>
      {error && <p className="error-message">{error}</p>}
      {videoData && (
        <div className="video-data">
          <img src={videoData.thumbnail}  alt={videoData.title} className="thumbnail" />
          <p>Title: {videoData.title}</p>
          <a href={videoData.links['Download Low Quality']} download className="download-link">Download Low Quality</a>
          <a href={videoData.links['Download High Quality']} download className="download-link">Download High Quality</a>
        </div>
      )}
    </div>
  );
};

export default FBDownloader;
