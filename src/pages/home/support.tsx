import { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import protectedStudentApiService from "../../services/_protected_student_api";
import { toast } from "react-toastify";
export default function StudentSupport() {
  const [suggestion] = useState<any[]>([
    "My class is not opening",
    "My class is not opening",
    "My class is not opening",
  ]);
  const init: any = {
    title: "",
    message: "",
  };
  const [creeds, setCreeds] = useState<any>(init);
  const { postSupportQuery } = protectedStudentApiService();
  const onValueChange = (val: any) => {
    setCreeds({ ...creeds, ...val });
  };
  const onSubmit = async () => {
    const res: any = await postSupportQuery(creeds);
    if (res == 1) {
    }
  };

  return (
    <>
      <div className="card p-4 shadow-sm">
        <h6 className="mb-4">Support</h6>
        <div className="mx-3">
          <p className="text-gray mb-3">Suggestion:</p>
          <div className="d-flex flex-nowarp ">
            {suggestion &&
              suggestion.map((x: any) => (
                <>
                  <div className="mr-2">
                    <div className="mb-3">
                      <div
                        className="suggestions"
                        onClick={(e) => {
                          onValueChange({ title: x });
                        }}
                      >
                        {x}
                      </div>
                    </div>
                  </div>
                </>
              ))}
          </div>
          <hr />
          <div className="my-3 ">
            <p className="text-gray mb-3">Submit your query:</p>
            <div className="col-sm-6">
              <div className="mb-3">
                <div className="flex-start">
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    id="title"
                    value={creeds.title}
                    placeholder="Enter title here"
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="mb-3">
                <FloatingLabel
                  controlId="floatingTextarea2"
                  label="How can we Help?"
                >
                  <Form.Control
                    as="textarea"
                    name="message"
                    placeholder="Leave a message here"
                    style={{ height: "100px" }}
                    value={creeds.message}
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </FloatingLabel>
              </div>
              <button onClick={onSubmit} className="btn mx-2 btn-primary  ">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
