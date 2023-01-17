import { useEffect, useState } from "react";
import ReactImagePickerEditor, {
  ImagePickerConf,
} from "react-image-picker-editor";
import "react-image-picker-editor/dist/index.css";
import protectedApiService from "../../../../services/_protected_api";
import { toast } from "react-toastify";
import commonApiService from "../../../../services/_common_api";
import globalDataStore from "../../../../store/_globalData";
export default function AddNews() {
  const init = {
    news_name: "",
    course_id: "",
  };
  const [creeds, setCreeds] = useState(init);
  const { allCourses, setAllCourses } = globalDataStore();
  const { postAddNews } = protectedApiService();
  const { getAllCourses } = commonApiService();
  const onValueChange = (val: any) => {
    console.log(val);
    setCreeds({ ...creeds, ...val });
  };
  const onSubmit = async () => {
    const res: any = await postAddNews(creeds);
    if (res) {
      toast.success("Created");
      setCreeds(init);
    } else {
      toast.error("Creation failed!");
    }
  };
  const getData = async () => {
    const res: any = await getAllCourses();
    setAllCourses(res);
  };
  useEffect(() => {
    if (!allCourses) {
      getData();
    }
  }, []);
  return (
    <>
      <div className=" mt-3">
        <h5>Marketing Details</h5>
        <div className="card shadow mt-3 p-4">
          <div className="row mx-3">
            <div className="col-sm-6 ">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  News Title
                </label>
                <textarea
                  className="form-control"
                  name="news_name"
                  id="news_name"
                  value={creeds.news_name}
                  aria-describedby="namelHelp"
                  placeholder="News"
                  rows={5}
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
                <label htmlFor="course" className="form-label">
                  Course*
                </label>
                <select
                  className="form-select"
                  name="course_id"
                  id="course_id"
                  defaultValue={creeds.course_id || "default"}
                  required
                  onChange={(e) =>
                    onValueChange({
                      [e.target.name]: e.target.value,
                    })
                  }
                >
                  <option value="default" disabled selected hidden>
                    Select Course
                  </option>
                  {allCourses &&
                    allCourses.map((course: any, index: number) => {
                      return (
                        <>
                          <option value={course.course_id} key={index}>
                            {course.course_name}
                          </option>
                        </>
                      );
                    })}
                </select>
              </div>
            </div>
          </div>
          <div className="flex-start p-3 mx-3">
            <button onClick={onSubmit} className="btn btn-primary">
              Add News
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
