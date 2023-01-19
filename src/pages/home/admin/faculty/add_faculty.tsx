import { useState, useEffect } from "react";
import protectedApiService from "../../../../services/_protected_api";
import { toast } from "react-toastify";

export default function AddFaculty() {
  const init = {
    name: "",
    contact_no: "",
    designation: "",
    address: "",
    password: "",
    email: "",
    mode: "1",
    course:""
  };
  const [creeds, setCreeds] = useState(init);
  const [courses, allcourses] = useState<any[]>([])
  const [selected_courses,setselected_courses] = useState<any[]>([]);
  const onValueChange = (val: any) => {
    // console.log(val);
    setCreeds({ ...creeds, ...val });
   // console.log(val);
    // console.log(register);
  };
  const { postAddFaculty,get_student_all_courses } = protectedApiService();

  useEffect(()=>{
    get_all_course();
  },[])


  const get_all_course = async()=>{
    const as = await get_student_all_courses();
    allcourses(as);
  }


  const onSubmit = async () => {
    creeds['course'] = selected_courses.join();
   const res: any = await postAddFaculty(creeds);
    if (res) {
      toast.success("Added");
    }
  };

const onMultipleSelect = (e:any)=>{
  let value = Array.from(
    e.target.selectedOptions,
    (option:any) => option.value
  );
  //console.log(value);
  setselected_courses(value);
}

  return (
    <>
      <div className=" mt-3">
        <p className="heading mx-2">Add Faculty Details</p>
        <div className="card shadow  p-4">
          <div className="row mx-3">
            <div className="col-sm-6 ">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
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
            <div className="col-sm-6">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Email
                </label>
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
            <div className="col-sm-6">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Contact Number
                </label>
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
            <div className="col-sm-6">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Designation
                </label>
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
            <div className="col-sm-6">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Full Address
                </label>
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

            <div className="col-sm-6">
              <div className="mb-3">
                <label htmlFor="experince" className="form-label">
                  Course Name
                </label>
                <div id="experince" className="flex-start flex-between ">
                  <select
                    id="course"
                    name="course"
                    className="form-select  m-2"
                     multiple
                   // defaultValue={creeds.course}
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
            </div>

            <div className="col-sm-6">
              <div className="mb-3">
                <label htmlFor="experince" className="form-label">
                  Mode
                </label>
                <div id="experince" className="flex-start flex-between ">
                  <select
                    id="mode"
                    name="mode"
                    className="form-select  m-2"
                    defaultValue={creeds.mode}
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                  >
                    <option value={0} disabled selected hidden>
                      Select Mode
                    </option>
                    <option value={1}>Online</option>
                    <option value={2}>Offline</option>
                    <option value={3}>Both</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  value={creeds.password}
                  aria-describedby="namelHelp"
                  placeholder="*************"
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
            <button onClick={onSubmit} className="btn btn-primary">
              Add Faculty
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
