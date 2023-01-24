import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import protectedStudentApiService from "../../../services/_protected_student_api";
import { Button } from "primereact/button";
import protectedApiService from "../../../services/_protected_api";
import { toast } from "react-toastify";
import Loading from "../../../common/loader";

export default function ViewStudentProfile({ editable }: any) {
  const location = useLocation();
  const user = location.state;

  const navigate = useNavigate();
  const [creeds, setCreeds] = useState<any>(null);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [isStudent] = useState(() => user.role == "5" && true);
  const { getStudentDetails } = protectedStudentApiService();
  useEffect(() => {
    editable ? setDisabled(false) : setDisabled(true);
    if (!user.user_id) {
      navigate(-1);
    } else {
      getDetails();
    }
  }, []);
  const onValueChange = (val: any) => {
    setCreeds({ ...creeds, ...val });
    console.log({ ...creeds, ...val });
  };
  const getDetails = async () => {
    const res: any = await getStudentDetails(user.user_id);
    console.log({ ...res, ...user });
    setCreeds({ ...res, ...user });
  };
  const [loading, setLoading] = useState<any>(false);
  const { updateStudentDetails } = protectedApiService();
  const updateDetails = async () => {
    setLoading(true);
    console.log(creeds);
    try {
      const res: any = await updateStudentDetails(creeds);
      console.log(creeds);
      if (res.status == 1) {
        toast.success("Updated");
        setDisabled(true);
        setLoading(false);
      } else {
        toast.error("Update Error");
        setDisabled(true);
        setLoading(false);
      }
    } catch (e) {
      toast.error("Update Error");
      setDisabled(true);
      setLoading(false);
    }
  };
  const role: any = ["", "super admin", "admin", "faculty", "sales", "student"];
  return (
    <>
      {!creeds && <Loading />}
      {creeds && (
        <>
          <div className="t">
            <div className="card p-3">
              <div className="flex-between">
                <h6 className="heading mb-5">Profile Details</h6>
                {disabled ? (
                  <Button
                    label="Edit"
                    icon={"pi pi-user-edit"}
                    className="p-button-success"
                    onClick={() => {
                      setDisabled(false);
                    }}
                  />
                ) : (
                  <Button
                    label={`${loading ? "updating.." : "update"}`}
                    icon={"pi pi-save"}
                    loading={loading}
                    disabled={loading}
                    className="p-button-info"
                    onClick={() => {
                      updateDetails();
                    }}
                  />
                )}
              </div>

              <div className="row">
                <h6 className="heading">Basic Details: </h6>
                <div className="col-sm-6 mb-3">
                  <label htmlFor="name" className="form-label text-capitalize">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    placeholder="Name"
                    value={creeds["name"] || ""}
                    disabled={disabled}
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-sm-6 mb-3">
                  <label htmlFor="name" className="form-label text-capitalize">
                    text
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="username"
                    id="username"
                    placeholder="username"
                    value={creeds["username"] || ""}
                    disabled={disabled}
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-sm-6 mb-3">
                  <label htmlFor="name" className="form-label text-capitalize">
                    Contact No
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="contact_no"
                    id="contact_no"
                    placeholder="contact_no"
                    value={creeds["contact_no"] || ""}
                    maxLength={10}
                    disabled={disabled}
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-sm-6 mb-3">
                  <label htmlFor="name" className="form-label text-capitalize">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    id="address"
                    placeholder="address"
                    value={creeds["address"] || ""}
                    disabled={disabled}
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-sm-6 mb-3">
                  <label htmlFor="name" className="form-label text-capitalize">
                    State
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="state"
                    id="state"
                    placeholder="state"
                    value={creeds["state"] || ""}
                    disabled={disabled}
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-sm-6 mb-3">
                  <label htmlFor="name" className="form-label text-capitalize">
                    Country
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="country"
                    id="country"
                    placeholder="country"
                    value={creeds["country"] || ""}
                    disabled={disabled}
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <hr />
              <div className="row">
                <h6 className="heading">Qualifications: </h6>
                <div className="col-sm-6 mb-3">
                  <label htmlFor="name" className="form-label text-capitalize">
                    Profession
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="professional"
                    id="professional"
                    placeholder="professional"
                    value={creeds["professional"] || ""}
                    disabled={disabled}
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-sm-6 mb-3">
                  <label htmlFor="name" className="form-label text-capitalize">
                    College Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="student_college"
                    id="student_college"
                    placeholder="student college"
                    value={creeds["student_college"] || ""}
                    disabled={disabled}
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-sm-6 mb-3">
                  <label htmlFor="name" className="form-label text-capitalize">
                    Stream
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="student_stream"
                    id="student_stream"
                    placeholder="Student Stream"
                    value={creeds["student_stream"] || ""}
                    disabled={disabled}
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-sm-6 mb-3">
                  <label htmlFor="name" className="form-label text-capitalize">
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="company_name"
                    id="company_name"
                    placeholder="company name"
                    value={creeds["company_name"] || ""}
                    disabled={disabled}
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-sm-6 mb-3">
                  <label htmlFor="name" className="form-label text-capitalize">
                    Contact No
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="contact_no"
                    id="contact_no"
                    placeholder="contact_no"
                    value={creeds["contact_no"] || ""}
                    maxLength={10}
                    disabled={disabled}
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <hr />

              <div className="row">
                <h6 className="heading">Course Details: </h6>
                <div className="col-sm-6 mb-3">
                  <label htmlFor="name" className="form-label text-capitalize">
                    Course Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="course_name"
                    id="course_name"
                    placeholder="course name"
                    value={creeds["course_name"] || ""}
                    disabled={disabled || isStudent}
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-sm-6 mb-3">
                  <label htmlFor="name" className="form-label text-capitalize">
                    No of Assigned Teacher
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="assigned_teacher"
                    id="assigned_teacher"
                    placeholder="Assigned Teacher Count"
                    value={creeds["assigned_teacher"] || ""}
                    disabled={disabled || isStudent}
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-sm-6 mb-3">
                  <label htmlFor="name" className="form-label text-capitalize">
                    Course Completed Status
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="course_completed"
                    id="course_completed"
                    placeholder="course completed"
                    value={creeds["course_completed"] || ""}
                    disabled={disabled || isStudent}
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-sm-6 mb-3">
                  <label htmlFor="name" className="form-label text-capitalize">
                    Total Class
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="total"
                    id="total"
                    placeholder="total"
                    value={creeds["total"] || ""}
                    maxLength={10}
                    disabled={disabled || isStudent}
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-sm-6 mb-3">
                  <label htmlFor="name" className="form-label text-capitalize">
                    Present Class
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="present"
                    id="present"
                    placeholder="present"
                    value={creeds["present"] || ""}
                    maxLength={10}
                    disabled={disabled || isStudent}
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-sm-6 mb-3">
                  <label htmlFor="name" className="form-label text-capitalize">
                    Absent Class
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="absent"
                    id="absent"
                    placeholder="absent"
                    value={creeds["absent"] || ""}
                    maxLength={10}
                    disabled={disabled || isStudent}
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <hr />
              <div className="row">
                <h6 className="heading">Documents Proof: </h6>
                <div className="col-sm-6 mb-3">
                  <label htmlFor="name" className="form-label text-capitalize">
                    Aadhar No
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="aadhar_no"
                    id="aadhar_no"
                    placeholder="aadhar_no"
                    value={creeds["aadhar_no"] || ""}
                    disabled={disabled}
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-sm-6 mb-3">
                  <label htmlFor="name" className="form-label text-capitalize">
                    Aadhar Card Doc
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="aadhar_card"
                    id="aadhar_card"
                    placeholder="aadhar_card"
                    // value={creeds["aadhar_card"]}
                    maxLength={10}
                    disabled={disabled}
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-sm-6 mb-3">
                  <label htmlFor="name" className="form-label text-capitalize">
                    Voter ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="voter_no"
                    id="voter_no"
                    placeholder="voter_no"
                    value={creeds["voter_no"] || ""}
                    disabled={disabled}
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-sm-6 mb-3">
                  <label htmlFor="name" className="form-label text-capitalize">
                    Voter Id Doc
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="voter_card_doc"
                    id="voter_card_doc"
                    placeholder="voter_card_doc"
                    // value={creeds["aadhar_card"] || ""}
                    maxLength={10}
                    disabled={disabled}
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
