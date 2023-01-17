import React, { useRef, useEffect, useState, useCallback } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import studentSkillUpApi from "../../../../services/_student_skillup_api";
import { toast } from "react-toastify";

export default function ModuleVideoPlayer({ playable, playNext }: any) {
  const { updateModulePlayer, getSingleVideo } = studentSkillUpApi();
  const [player, setPlayer] = useState<any>(null);
  useEffect(() => {
    getData();
  }, [playable]);
  const getData = useCallback(async () => {
    const res: any = await getSingleVideo(playable.module_id);
    setPlayer({ ...playable, ...res });
  }, [player]);
  const ref: any = React.createRef();
  const [state, setState] = useState<any>({
    total_duration: 0,
    completed_duration: playable.video_completed,
    volume: 0,
    seekTo: 0,
    module_id: playable.module_id,
  });

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
    const res: any = await updateModulePlayer(state);
    if (res) {
      // toast.success("Updated");
      playable.video_completed = ref.current.getCurrentTime();
      ref.current.seekTo(state.seekTo);
      getData();
    }
  };

  const onReady = () => {
    // ref.current.seekTo(playable.video_completed);
    setState({
      ...state,
      total_duration: ref.current.getDuration(),
      completed_duration: ref.current.getCurrentTime(),
      seekTo: playable.video_completed,
    });
    updatePlayDuration();
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
            url={`https://dataspaceacademymanagement.in/skillup/public/video/${player?.video}`}
            width="100%"
            height="100%"
            controls={true}
            onPlay={onReady}
            onSeek={onSeek}
            onDuration={(e) => {
              console.log(e);
            }}
            onEnded={onNext}
          />
        </div>
      )}
    </>
  );
}
