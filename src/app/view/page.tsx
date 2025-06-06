'use client';

import { Player } from '@remotion/player';
import { InviteComposition } from '@/app/components/Remotion';
import { useInviteStore } from '@/store/useInviteStore';

export default function ViewPage() {

  const formData = useInviteStore(state => state.formData);

  if (!formData) return <div className="text-white">Loading...</div>;
  const themeMedia = formData.themeMedia;
  const themeMediaType = formData.themeMediaType;
  const eventName = formData.eventName;

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
        <h1 className="text-2xl text-white font-bold mb-4">{eventName}</h1>
        <div className="w-full max-w-[500px] aspect-video rounded-lg overflow-hidden mb-6">
          <Player
            component={InviteComposition}
            inputProps={{ themeMedia, themeMediaType }}
            durationInFrames={300}
            fps={30}
            compositionWidth={500}
            compositionHeight={281}
            controls
            autoPlay
            loop
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        {/* Download button for video */}
        {themeMedia && themeMediaType?.startsWith('video') && (
          <button
            onClick={handleDownload}
            className="mb-4 bg-pink-500 text-white px-4 py-2 rounded font-semibold"
          >
            Download Video
          </button>
        )}
        <div className="text-white text-lg mb-2">{formData.description}</div>
        <div className="text-[#9B8AA0] text-sm mb-2">{formData.location_name}</div>
      </div>
    </main>
  );
}