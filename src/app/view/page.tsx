'use client';

import { Player } from '@remotion/player';
import { InviteComposition } from '@/app/components/Remotion';
import { useInviteStore } from '@/store/useInviteStore';
import responseData from '@/data/response.json';

export default function ViewPage() {
  const formData = useInviteStore(state => state.formData);

  if (!formData) return <div className="text-white">Loading...</div>;

  const themeMedia = formData.themeMedia;
  const themeMediaType = formData.themeMediaType;
  const eventName = formData.eventName;

  // Match category_id
  const categoryMatch = formData.category_id === responseData.category_id;

  // Download handler for video
  const handleDownload = () => {
    if (themeMedia && themeMediaType?.startsWith('video')) {
      const a = document.createElement('a');
      a.href = themeMedia;
      a.download = 'invite-video.mp4';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <main className="min-h-screen bg-[#3B1F44] flex items-center justify-center p-4">
      <div className="max-w-[900px] w-full bg-[#4c2567] rounded-xl shadow-lg p-8 flex flex-col items-center">
        <h1 className="text-2xl text-white font-bold mb-4">{formData.eventName}</h1>
        {/* Preview uploaded image or video from Zustand */}
        <div className="w-full max-w-[500px] aspect-video rounded-lg overflow-hidden mb-6 flex items-center justify-center bg-[#3B1F44]">
          {themeMedia && themeMediaType?.startsWith('video') ? (
            <video src={themeMedia} controls className="rounded w-full h-full object-cover" />
          ) : themeMedia && themeMediaType?.startsWith('image') ? (
            <img src={themeMedia} alt="Theme Preview" className="rounded w-full h-full object-cover" />
          ) : (
            <span className="text-[#9B8AA0]">No media uploaded</span>
          )}
        </div>
        {/* Download button for video */}
        {themeMedia && themeMediaType?.startsWith('video') && (
          <button
            onClick={handleDownload}
            className="mb-4 bg-pink-500 text-white px-4 py-2 rounded font-semibold hover:bg-pink-400 active:bg-pink-600 transition-colors duration-200"
          >
            Download Video
          </button>
        )}

        {/* Show all details from response.json if category matches */}
        {categoryMatch ? (
          <div className="w-full max-w-[500px] bg-[#5A3B6B] rounded-lg p-6 mt-4 text-white text-sm flex flex-col gap-2">
            <div><span className="font-bold">Location:</span> {responseData.location_name}</div>
            <div><span className="font-bold">Description:</span> {responseData.description}</div>
            <div><span className="font-bold">Category ID:</span> {responseData.category_id}</div>
            <div><span className="font-bold">Nights:</span> {responseData.nights}</div>
            {/* Add more fields from response.json as needed */}
          </div>
        ) : (
          <div className="text-pink-300 mt-4">No matching event category found.</div>
        )}
      </div>
    </main>
  );
}