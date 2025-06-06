import { AbsoluteFill, Video, Img } from 'remotion';

type InviteCompositionProps = {
  themeMedia?: string;
  themeMediaType?: string;
  eventName?: string;
};

export const InviteComposition = ({ themeMedia, themeMediaType, eventName }: InviteCompositionProps) => (
  <AbsoluteFill>
    {themeMedia && themeMediaType?.startsWith('video') ? (
      <Video src={themeMedia} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    ) : themeMedia && themeMediaType?.startsWith('image') ? (
      <Img src={themeMedia} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    ) : (
      <div style={{ width: '100%', height: '100%', background: '#222' }} />
    )}
    <div
      style={{
        position: 'absolute',
        top: 40,
        left: 0,
        width: '100%',
        textAlign: 'center',
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
        textShadow: '0 2px 8px #000',
      }}
    >
      {eventName}
    </div>
  </AbsoluteFill>
);