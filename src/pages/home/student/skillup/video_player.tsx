import React, { useRef, useEffect, useState, useCallback } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import studentSkillUpApi from "../../../../services/_student_skillup_api";
import { toast } from "react-toastify";
import Loader from "../../../../common/loader";
import Lottie from "react-lottie";
import * as animationData from "../../../../assets/lottie/youtube.json";
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
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };
  return (
    <>
      {!player && <Loader />}
      {player && (
        <div className="player">
          <div className="flex-start">
            <div className="flex-center" style={{ width: "30px" }}>
              <Lottie
                height={20}
                style={{ marginTop: "5px" }}
                width={20}
                options={defaultOptions}
              />
            </div>
            <p className="heading text-gray  mx-2 my-2">
              Now Playing{" "}
              <span className="text-primary mx-2"> {player.title}</span>
            </p>
          </div>

          <ReactPlayer
            ref={ref}
            style={{
              borderRadius: "10px",
              overflow: "hidden",
              maxWidth: "80rem",
            }}
            config={{ file: { attributes: { controlsList: "nodownload" } } }}
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
