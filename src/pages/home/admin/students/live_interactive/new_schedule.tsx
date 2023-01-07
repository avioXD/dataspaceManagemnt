import { useState } from "react";

export default function AddNewSchedule() {
  const init = {
    name: "",
    contact_no: "",
    location: "",
    address: "",
    days: "",
    email: "",
    class_details: "",
  };
  const [creeds, setCreeds] = useState(init);
  const onValueChange = (val: any) => {
    // console.log(val);
    setCreeds({ ...creeds, ...val });
    console.log(val);
    // console.log(register);
  };
  return (
    <>
      <div className=" mt-3">
        <div className="heading col-sm-4">New Class Schedule</div>
        <div className="card shadow p-4">
          <div className="row mx-3">
            <div className="col-sm-6 ">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Course
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option selected>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
            <div className="col-sm-6 ">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Faculty
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option selected>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Email
                </label>
                <div className="flex-between" style={{ maxWidth: "20rem" }}>
                  <input
                    type="number"
                    className="form-control mr-2"
                    name="date"
                    id="date"
                    value={creeds.email}
                    aria-describedby="dateHelp"
                    placeholder="DD"
                    //   onBlur={(e) => onBlur({ [e.target.name]: e.target.value })}
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                  <input
                    type="number"
                    className="form-control mr-2"
                    name="month"
                    id="month"
                    value={creeds.email}
                    aria-describedby="monthHelp"
                    placeholder="MM"
                    //   onBlur={(e) => onBlur({ [e.target.name]: e.target.value })}
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                  <input
                    type="number"
                    className="form-control mr-2"
                    name="year"
                    id="year"
                    value={creeds.email}
                    aria-describedby="dateHelp"
                    placeholder="YYYY"
                    //   onBlur={(e) => onBlur({ [e.target.name]: e.target.value })}
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Time
                </label>
                <div className="flex-between" style={{ maxWidth: "20rem" }}>
                  <input
                    type="number"
                    className="form-control mr-2"
                    name="hour"
                    id="hour"
                    value={creeds.email}
                    aria-describedby="hourHelp"
                    placeholder="HH"
                    //   onBlur={(e) => onBlur({ [e.target.name]: e.target.value })}
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                  <input
                    type="number"
                    className="form-control mr-2"
                    name="minute"
                    id="minute"
                    value={creeds.email}
                    aria-describedby="minuteHelp"
                    placeholder="MM"
                    //   onBlur={(e) => onBlur({ [e.target.name]: e.target.value })}
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                  <input
                    type="number"
                    className="form-control mr-2"
                    name="year"
                    id="year"
                    value={creeds.email}
                    aria-describedby="dateHelp"
                    placeholder="YYYY"
                    //   onBlur={(e) => onBlur({ [e.target.name]: e.target.value })}
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Select Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  id="location"
                  value={creeds.location}
                  aria-describedby="namelHelp"
                  placeholder="Bangalore "
                  //   onBlur={(e) => onBlur({ [e.target.name]: e.target.value })}
                  onChange={(e) =>
                    onValueChange({
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Days
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="days"
                  id="days"
                  value={creeds.days}
                  aria-describedby="namelHelp"
                  placeholder="Select Day"
                  //   onBlur={(e) => onBlur({ [e.target.name]: e.target.value })}
                  onChange={(e) =>
                    onValueChange({
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Class Details
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="class_details"
                  id="class_details"
                  value={creeds.class_details}
                  aria-describedby="namelHelp"
                  placeholder="Details"
                  //   onBlur={(e) => onBlur({ [e.target.name]: e.target.value })}
                  onChange={(e) =>
                    onValueChange({
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex-start p-3 mx-3">
            <button className="btn btn-primary"> Add Schedule</button>
          </div>
        </div>
      </div>
    </>
  );
}
