import { useState } from "react";
import { Editor } from "primereact/editor";
import { useLocation } from "react-router-dom";
import protectedApiService from "../../../services/_protected_api";
import { toast } from "react-toastify";
export default function SendMessage({}) {
  const location = useLocation();
  const students = location.state;

  const [creeds, setCreeds] = useState("");
  const [messages, setMessages] = useState<any>();
  const onValueChange = (val: any) => {
    // console.log(val);
    setCreeds(val);
    console.log(val);
    // console.log(register);
  };
  const { postAddMessage, getStudentMessages } = protectedApiService();
  const onSubmit = () => {
    students.map(async (s: any) => {
      const res: any = await postAddMessage({
        user_id: s.user_id,
        message: creeds,
      });
    });
    toast.success("Message sent successfully");
  };

  const getMessages = async (student: any) => {
    const res: any = await getStudentMessages(student.user_id);
    setMessages(res);
  };
  return (
    <>
      <div className="p-3">
        <h4>Message</h4>
        <div className="card shadow p-4">
          <div className="content">
            <h4 className="text-capitalize">
              To{" "}
              <span className="mx-2">
                {students.map((s: any, index: any, { length }: any) => (
                  <>
                    {s.name} {index + 1 === length ? "" : ", "}
                  </>
                ))}
              </span>
            </h4>
            <div
              style={{ height: "190px" }}
              dangerouslySetInnerHTML={{ __html: creeds }}
              className="p-2 editor"
            ></div>
          </div>
          <Editor
            style={{ height: "180px" }}
            value={creeds}
            onTextChange={(e: any) => onValueChange(e.htmlValue)}
          />
          <div className="flex-start mt-3">
            <button className="btn btn-primary" onClick={onSubmit}>
              {" "}
              Send Message
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
