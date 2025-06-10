import { useEffect, useState } from 'react';
import axios from 'axios';

const OperationVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backend = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${backend}/api/videos`);
        setVideos(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch videos');
        console.error('Error fetching videos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [backend]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 text-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 flex justify-center items-center">
        Operation Videos
      </h2>
      <div className="flex flex-col gap-4 justify-center items-center">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div key={video._id} className="bg-white p-4 rounded shadow w-full md:w-[70%]">
              <h3 className="font-semibold mb-2">{video.title}</h3>
              <video
                src={video.videoUrl}
                controls
                className="w-full rounded"
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No videos available</p>
        )}
      </div>
    </div>
  );
};

export default OperationVideos;