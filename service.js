import TrackPlayer from 'react-native-track-player';
import {store} from './src/app.js';
module.exports = async function() {

  TrackPlayer.addEventListener('remote-play', () => {
    TrackPlayer.play()
  })

  TrackPlayer.addEventListener('remote-pause', () => {
    TrackPlayer.pause()
  });

  TrackPlayer.addEventListener('remote-next', async () => {
    await TrackPlayer.skipToNext()
    const state = store.getState();
    let currenttrack = await TrackPlayer.getCurrentTrack();
    let currentTrackData = await TrackPlayer.getTrack(currenttrack);
    if (currentTrackData?.id) {
      await TrackPlayer.updateMetadataForTrack(currentTrackData?.id, {
        title: currentTrackData?.title ?? '',
        artist: state?.currentAudiobookName ?? '',
      });
    }
  });

  TrackPlayer.addEventListener('remote-previous', async () => {
    await TrackPlayer.skipToPrevious()
    const state = store.getState();
    let currenttrack = await TrackPlayer.getCurrentTrack();
    let currentTrackData = await TrackPlayer.getTrack(currenttrack);
    if (currentTrackData?.id) {
      await TrackPlayer.updateMetadataForTrack(currentTrackData?.id, {
        title: currentTrackData?.title ?? '',
        artist: state?.currentAudiobookName ?? '',
      });
    }
  });

  TrackPlayer.addEventListener('remote-stop', () => {
    TrackPlayer.destroy()
  });
};