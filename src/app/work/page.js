"use client";
import { useState } from "react";

const videos = [
  {
    id: "OMDSyxDsKBk",
    title: "Cinematic Travel Edit",
  },
  {
    id: "nGb7ViZoAcE",
    title: "Railgun Project",
  },
  {
    id: "6OgrukR7zpw",
    title: "Promotion Ad",
  },
];

export default function Work() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <main className="bg-black text-white min-h-screen px-4 py-16">

      <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        My Work
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        
        {videos.map((video, index) => (
          <div 
            key={index} 
            onClick={() => setActiveVideo(video.id)}
            className="cursor-pointer group transform hover:scale-105 transition duration-300 relative"
          >

            {/* Thumbnail */}
            <img
              src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
              alt={video.title}
              className="rounded-xl w-full shadow-lg group-hover:shadow-2xl transition duration-300"
            />

            {/* Overlay */}
            <div className="absolute inset-0 z-10 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 rounded-xl flex items-center justify-center">
              <span className="text-white text-4xl">▶</span>
            </div>

            {/* Title */}
            <h2 className="mt-4 text-lg font-semibold text-gray-200 group-hover:text-white transition">
              {video.title}
            </h2>

          </div>
        ))}

      </div>

      {/* MODAL */}
      {activeVideo && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setActiveVideo(null)}
        >
          <div className="w-full max-w-4xl p-4">
            <iframe
              className="w-full aspect-video rounded-xl"
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

    </main>
  );
}