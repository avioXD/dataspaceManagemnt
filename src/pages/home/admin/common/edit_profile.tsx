import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import protectedApiService from "../../../../services/_protected_api";
import { toast } from "react-toastify";

export default function EditProfileDetails() {
  const location = useLocation();
  const profile = location.state;
  console.log(profile);
  const [creeds, setCreeds] = useState<any>(profile);
  const [courses, allcourses] = useState<any[]>([])
  const [selected_courses, setselected_courses] = useState<any[]>([]);
  const onValueChange = (val: any) => {
    // console.log(val);
    setCreeds({ ...creeds, ...val });
    console.log(val);
    // console.log(register);
  };
  const { updateUserDetails, get_student_all_courses, fac_update_details, stud_update_details } = protectedApiService();

useEffect(()=>{
  get_all_course();
},[])

  const get_all_course = async()=>{
    const as = await get_student_all_courses();
    allcourses(as);
  }

  const onMultipleSelect = (e:any)=>{
    let value:any = Array.from(
      e.target.selectedOptions,
      (option:any) => option.value
    );
    //console.log(value);
    setselected_courses(value);
  }

//   const onSingleSelect = (e:any)=>{
// console.log(e.target.value);
//   }

  const onSubmit = async () => {
    if(profile.role==5){
      const res:any = await stud_update_details(creeds);
    }else if(profile.role==3){
      creeds['course'] = selected_courses.join();
      const res: any = await fac_update_details(creeds);

    }else{
      const res: any = await updateUserDetails(creeds);
    }
    
  //  console.log(res);
    toast.success("Updated");
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
                          alt=".."
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
                          <Link
                            to="/Home/Students/Message"
                            state={new Array(1).fill(creeds)}
                          >
                            <button className="btn btn-outline-primary">
                              Message
                            </button>
                          </Link>
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
                            type="phone"
                            maxLength={10}
                            className="form-control"
                            name="contact_no"
                            id="contact_no"
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
                    {(()=>{
                      if(profile.role==5){
                        return(
                          <>


<div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Course Name</h6>
                        </div>
                        <div className="col-sm-9 text-gray">
                        <select
                    id="course"
                    name="course"
                    className="form-select  m-2"
                     
                   // defaultValue={creeds.course}
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }

                    // onChange={(e)=>{
                    //   onSingleSelect(e);
                    // }}
                    
                  >
                    <option value={0} disabled selected hidden>
                      Select Mode
                    </option>
                    {courses.map((course,index)=>{
                       return(
                        <>
                         <option value={course.course_id}  selected={course.course_id==profile.course_id}>{course.course_name}</option>
                        </>
                       )
                    })}
                   
                   
                  </select>
                        </div>
                      </div>

                          </>
                        )
                      }else if(profile.role==3){
                        return(
                          <>


<div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Course Name</h6>
                        </div>
                        <div className="col-sm-9 text-gray">
                        <select
                    id="course_id"
                    name="course_id"
                    className="form-select  m-2"
                    multiple
                     
                    defaultValue={creeds.course_id}
                    // onChange={(e) =>
                    //   onValueChange({
                    //     [e.target.name]: e.target.value,
                    //   })
                    // }

                    onChange={(e)=>{
                      onMultipleSelect(e);
                    }}
                    
                  >
                    <option value={0} disabled selected hidden>
                      Select Mode
                    </option>
                    {courses.map((course,index)=>{
                       return(
                        <>
                         <option value={course.course_id}>{course.course_name}</option>
                        </>
                       )
                    })}
                   
                   
                  </select>
                        </div>
                      </div>
                          </>
                        )
                      }
                    })()}
                      <hr />
                      <div className="row">
                        <div className="col-sm-12">
                          <button
                            onClick={() => onSubmit()}
                            className="btn btn-info"
                          >
                            Submit
                          </button>
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
