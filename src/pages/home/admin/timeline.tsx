import { useLocation } from "react-router-dom";
import protectedApiService from "../../../services/_protected_api";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Timeline() {
  const location = useLocation();
  const student: any = location.state[0];

  const [creeds, setCreeds] = useState<any>({
    note: "",
    user_id: student.user_id,
  });
  const onValueChange = (val: any) => {
    // console.log(val);
    setCreeds({ ...val });
    console.log(val);
    // console.log(register);
  };
  const [notes, setNotes] = useState<any>(null);
  const { postAddNotes, getStudentNotes } = protectedApiService();
  const onSubmit = async () => {
    const res: any = await postAddNotes({
      ...creeds,
      user_id: student.user_id,
    });
    if (res) {
      toast.success("Notes Added");
      getTimeline();
    }
  };

  useEffect(() => {
    getTimeline();
  }, []);

  const getTimeline = async () => {
    const res: any = await getStudentNotes(student.user_id);
    setNotes(res);
  };

  return (
    <div className="p-3">
      <h4>Timeline</h4>
      <div className="card shadow p-4">
        <div className="content">
          <h4 className="text-capitalize">
            <span className="mx-2"> {student.name}</span>
          </h4>
          <div style={{ height: "40vh", overflow: "auto" }} className="p-2  ">
            {notes &&
              notes.map((x: any) => (
                <div className="timeline-text">
                  <span> {x.date}</span>
                  <p>{x.note}</p>
                </div>
              ))}
          </div>
        </div>
        <div className="my-3">
          <input
            type="text"
            className="form-control"
            name="note"
            id="note"
            value={creeds.note}
            placeholder="Write any note"
            onChange={(e) =>
              onValueChange({
                [e.target.name]: e.target.value,
              })
            }
            required
          />
        </div>
        <div className="flex-start mt-3">
          <button className="btn btn-primary" onClick={onSubmit}>
            {" "}
            Add Notes
          </button>
        </div>
      </div>
    </div>
  );
}
