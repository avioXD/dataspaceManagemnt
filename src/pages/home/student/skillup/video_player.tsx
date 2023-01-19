import React, { useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import {
  Player,
  PlayerReference,
  ControlBar,
  ForwardControl,
  VolumeMenuButton,
  BigPlayButton,
  ReplayControl,
  LoadingSpinner,
  PlayToggle,
  PlaybackRateMenuButton,
  ProgressControl,
  FullscreenToggle,
  FullScreenToggleProps,
  PlayerState,
} from "video-react";

export default function ModuleVideoPlayer({ playable }: any) {
  const playerRef = useRef<PlayerReference>(null);
  useEffect(() => {
    if (playerRef) {
      const currentTime: any = playerRef.current;
      console.log(currentTime);
    }
  }, [playerRef]);
  return (
    <>
      {playable && (
        <div className="player   mx-auto">
          <Player
            aspectRatio="16:9"
            ref={playerRef}
            playsInline
            poster={playable?.img || "/assets/bg/register_bg.png"}
            src={`https://dataspaceacademymanagement.in/skillup/public/video/${playable?.video}`}
            fluid={true}
            startTime={playable?.video_completed}
          >
            <ControlBar autoHide={false}>
              <PlayToggle />
              <LoadingSpinner />
              <BigPlayButton position="center" />

              <ReplayControl seconds={10} />
              <ForwardControl seconds={10} />
              <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} />
              <ProgressControl />
              <VolumeMenuButton vertical />
            </ControlBar>
          </Player>
        </div>
      )}
    </>
  );
}
