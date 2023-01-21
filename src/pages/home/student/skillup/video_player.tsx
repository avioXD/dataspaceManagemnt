import React, { useRef, useEffect, useState, useCallback } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import studentSkillUpApi from "../../../../services/_student_skillup_api";
import { toast } from "react-toastify";

export default function ModuleVideoPlayer({
  playable,
  playNext,
  onRefresh,
}: any) {
  const { updateModulePlayer, getSingleVideo } = studentSkillUpApi();
  const [player, setPlayer] = useState<any>(null);
  const [state, setState] = useState<any>({
    total_duration: 0,
    completed_duration: 0,
    volume: 0,
    seekTo: 0,
    module_id: playable.module_id,
  });
  useEffect(() => {
    setPlayer(playable);
    setState({ ...state, module_id: playable.module_id });
  }, [playable]);

  const ref: any = React.createRef();

  const onSeek = (e: any) => {
    console.log(e);
    setState({
      ...state,
      total_duration: ref.current.getDuration(),
      completed_duration: e,
      seekTo: e,
    });
    updatePlayDuration();
  };
  const updatePlayDuration = async () => {
    console.log();
    const res: any = await updateModulePlayer(state);
    if (res == "1") {
      // toast.success("Updated");
      onRefresh();
      playable.video_completed = ref.current.getCurrentTime();
    }
  };

  const onReady = () => {
    // ref.current.seekTo(playable.video_completed);
    if (ref) {
      setState({
        ...state,
        total_duration: ref.current.getDuration(),
        completed_duration: ref.current.getCurrentTime(),
        seekTo: playable.video_completed,
      });
      updatePlayDuration();
    }
  };
  const onNext = () => {
    updatePlayDuration();
    playNext();
  };
  return (
    <>
      {player && (
        <div className="player   mx-auto">
          <h6 className="heading">{player.title}</h6>
          <ReactPlayer
            ref={ref}
            style={{
              margin: "auto",
              borderRadius: "10px",
              overflow: "hidden",
              maxWidth: "70rem",
            }}
            url={`https://dataspaceacademymanagement.in/skillup/public/video/${player?.video}`}
            width="100%"
            height="100%"
            controls={true}
            onPlay={onReady}
            onSeek={onSeek}
            onDuration={(e: any) => {
              console.log(e);
            }}
            onEnded={onNext}
          />
        </div>
      )}
    </>
  );
}
