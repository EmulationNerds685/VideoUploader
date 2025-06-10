// src/components/OperationVideos.jsx
import { useEffect, useState } from 'react';

const OperationVideos = () => {
  const [videos, setVideos] = useState([]);
const backend=import.meta.env.VITE_BACKEND_URL
  useEffect(() => {
    fetch(`${backend}/api/videos`)
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 flex justify-center items-center">Operation Videos</h2>
      <div className="flex flex-col gap-4 justify-center items-center">
        {videos.map((video) => (
          <div key={video._id} className="bg-white p-4 rounded shadow w-[100%] md:w-[70%]">
            <h3 className="font-semibold mb-2">{video.title}</h3>
            <video
              src={video.videoUrl}
              controls
              className="w-full rounded"
            ></video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OperationVideos;
