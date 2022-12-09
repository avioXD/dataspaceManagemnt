import { useState } from "react";
import { Editor } from "primereact/editor";
export default function SendMessage() {
  const [creeds, setCreeds] = useState("");
  const onValueChange = (val: any) => {
    // console.log(val);
    setCreeds(val);
    console.log(val);
    // console.log(register);
  };
  return (
    <>
      <div className="p-3">
        <h4>Message</h4>
        <div className="card shadow p-4">
          <div className="content">
            <h2>To Joydeep Mukherjee</h2>
            <div
              style={{ height: "190px" }}
              dangerouslySetInnerHTML={{ __html: creeds }}
              className=""
            ></div>
          </div>
          <Editor
            style={{ height: "180px" }}
            value={creeds}
            onTextChange={(e: any) => onValueChange(e.htmlValue)}
          />
          <div className="flex-start mt-3">
            <button className="btn btn-primary"> Send Message</button>
          </div>
        </div>
      </div>
    </>
  );
}
