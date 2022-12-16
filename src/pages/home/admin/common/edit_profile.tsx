import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import protectedApiService from "../../../../services/_protected_api";

export default function EditProfileDetails() {
  const location = useLocation();
  const profile = location.state;
  const [creeds, setCreeds] = useState<any>(profile);
  const onValueChange = (val: any) => {
    // console.log(val);
    setCreeds({ ...creeds, ...val });
    console.log(val);
    // console.log(register);
  };
  const { getUserDetails } = protectedApiService();
  useEffect(() => {
    getDetails();
  }, []);
  const getDetails = async () => {
    const res: any = await getUserDetails(profile?.user_id);
    console.log(res);
    setCreeds(res);
  };

  const role: any = ["", "super admin", "admin", "faculty", "sales", "student"];
  return (
    <>
      {creeds && (
        <>
          <div className="container view-student">
            <div className="main-body">
              <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex flex-column align-items-center text-center">
                        <img
                          className="profile_pic"
                          src={
                            (creeds.profile_pic_path &&
                              creeds.profile_pic_path) ||
                            "https://bootdey.com/img/Content/avatar/avatar7.png"
                          }
                          alt="Admin"
                          width="150"
                        />
                        <div className="mt-3">
                          <h4>{creeds.name}</h4>
                          <p className="text-gray mb-1 text-capitalize">
                            {creeds.designation}
                          </p>
                          <p className="text-muted font-size-sm">
                            {creeds.address}
                          </p>
                          <button className="btn btn-outline-primary">
                            Message
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Full Name</h6>
                        </div>
                        <div className="col-sm-9 text-gray text-capitalize">
                          <input
                            type="name"
                            className="form-control"
                            name="name"
                            id="name"
                            value={creeds.name}
                            aria-describedby="namelHelp"
                            placeholder="John Doe"
                            //   onBlur={(e) => onBlur({ [e.target.name]: e.target.value })}
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
                        <div className="col-sm-3">
                          <h6 className="mb-0">Email</h6>
                        </div>
                        <div className="col-sm-9 text-gray">
                          <input
                            type="text"
                            className="form-control"
                            name="email"
                            id="email"
                            value={creeds.email}
                            aria-describedby="namelHelp"
                            placeholder="example@gmail.com"
                            //   onBlur={(e) => onBlur({ [e.target.name]: e.target.value })}
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
                        <div className="col-sm-3">
                          <h6 className="mb-0">Phone</h6>
                        </div>
                        <div className="col-sm-9 text-gray">
                          <input
                            type="number"
                            className="form-control"
                            name="contact_number"
                            id="contact_number"
                            value={creeds.contact_no}
                            aria-describedby="namelHelp"
                            placeholder="0000 0000 00"
                            //   onBlur={(e) => onBlur({ [e.target.name]: e.target.value })}
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
                        <div className="col-sm-3">
                          <h6 className="mb-0">Designation</h6>
                        </div>
                        <div className="col-sm-9 text-gray">
                          <input
                            type="text"
                            className="form-control"
                            name="designation"
                            id="designation"
                            value={creeds.designation}
                            aria-describedby="namelHelp"
                            placeholder="Admin"
                            //   onBlur={(e) => onBlur({ [e.target.name]: e.target.value })}
                            onChange={(e) =>
                              onValueChange({
                                [e.target.name]: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Address</h6>
                        </div>
                        <div className="col-sm-9 text-gray">
                          <input
                            type="text"
                            className="form-control"
                            name="address"
                            id="address"
                            value={creeds.address}
                            aria-describedby="namelHelp"
                            placeholder="14H Road, example "
                            //   onBlur={(e) => onBlur({ [e.target.name]: e.target.value })}
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
                        <div className="col-sm-12">
                          <Link to="/Home/Edit Profile" state={creeds}>
                            <button className="btn btn-info">Submit</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
