import { useState } from "react";
import ReactImagePickerEditor, {
  ImagePickerConf,
} from "react-image-picker-editor";
import "react-image-picker-editor/dist/index.css";
const config2: ImagePickerConf = {
  borderRadius: "8px",
  language: "en",
  width: "330px",
  height: "250px",
  objectFit: "contain",
  compressInitial: null,
};
export default function AddSales() {
  const init = {
    name: "",
    contact_no: "",
    designation: "",
    address: "",
    password: "",
    email: "",
    profile_pic: "",
  };
  const [creeds, setCreeds] = useState(init);
  const onValueChange = (val: any) => {
    // console.log(val);
    setCreeds({ ...creeds, ...val });
    console.log(val);
    console.log(creeds);
  };
  return (
    <>
      <div className=" mt-3">
        <h4>Sales Details</h4>
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
                <label htmlFor="name" className="form-label">
                  Password
                </label>
                <input
                  type="text"
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
            <div className="col-sm-6">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Profile Picture
                </label>
                <ReactImagePickerEditor
                  config={config2}
                  imageSrcProp={creeds.profile_pic}
                  imageChanged={(newDataUri: any) => {
                    onValueChange({ profile_pic: newDataUri });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex-start p-3 mx-3">
            <button className="btn btn-primary">Add Sales</button>
          </div>
        </div>
      </div>
    </>
  );
}
