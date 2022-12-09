import React, { useState, useEffect, useRef } from "react";
import AuthService from "../services/_auth";

export default function Login() {
  const [creeds, setCreeds] = useState({
    username: "",
    password: "",
  });
  const { loginUser } = AuthService();
  const [loading, setLoading] = useState(false);
  const onValueChange = (val: any) => {
    // console.log(val);
    setCreeds({ ...creeds, ...val });
    console.log(val);
    // console.log(register);
  };
  const onLogin = async () => {
    console.log(creeds);
    setLoading(true);
    loginUser(creeds);
    setLoading(false);
  };
  return (
    <>
      <div className="row register-background ">
        <div className="col-sm-7 register-text p-5">
          <div className="text">
            <h1 className="title-primary">LOGIN NOW!</h1>
            <h4 className="subtitle-primary"></h4>
          </div>
        </div>
        <div className="col-sm-5 bg-white flex-center p-3">
          <div className="mx-auto my-auto form register-form">
            <div className=" p-2 mt-5 d-flex">
              <div className="logo  mx-auto">
                <img src="/assets/svg/Logo.svg" alt="LOGO" />
              </div>
            </div>
            {/* <div className="mx-auto">
                            <p id="error" className="error">*This is an error message*</p>
                        </div> */}
            {/* <div className="slides">
                            <div className="slide1"> */}
            <form>
              <div
                className="p-5"
                style={{
                  minHeight: "30rem !important",
                  maxHeight: "30rem!important",
                }}
              >
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username/ Email
                  </label>
                  <input
                    type="text"
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                    className="form-control"
                    name="username"
                    id="username"
                    aria-describedby="namelHelp"
                    placeholder="Username*"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password{" "}
                  </label>
                  <input
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    aria-describedby="passwordHelp"
                    placeholder="Password *"
                    required
                  />
                  <div className="flex-end my-2  ">
                    <a
                      className="text-sm"
                      style={{ color: "red" }}
                      href="/forgot-password"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mb-3 ">
                  {" "}
                  <button
                    type="button"
                    className="btn btn-primary btn-wide "
                    disabled={loading}
                    onClick={onLogin}
                  >
                    {loading ? "Loggin..." : "Login"}
                  </button>
                </div>

                <div className="mx-auto mt-4">
                  <h5 className="subtitle-primary text-center  ">
                    Don't have an account ?{" "}
                    <a href="/register">Register now!</a>
                  </h5>
                </div>
              </div>
            </form>

            {/* </div>
                        </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
