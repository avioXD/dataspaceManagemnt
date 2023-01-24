import { Spinner } from "react-bootstrap";
import Lottie from "react-lottie";
import * as animationData from "../assets/lottie/Server Analysis.json";
export default function Loader2() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };
  return (
    <>
      <div
        className="flex-center"
        style={{
          minHeight: "40vh",
        }}
      >
        <Lottie height={200} width={200} options={defaultOptions} />
      </div>
    </>
  );
}
