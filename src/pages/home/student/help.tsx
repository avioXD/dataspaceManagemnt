import axios from "axios";
import { useState } from "react";

export default function Help() {
  const [inputvalue, setinputvalue] = useState("");
  const [response_data, setresponse_data] = useState([]);
  const [title, settitle] = useState("");

  const get_filtered_data = () => {
    const apiKey = "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";
    const prompt =
      "Generate a detailed full length article about " +
      inputvalue +
      " and example of " +
      inputvalue;

    //const prompt = inputvalue;

    settitle(inputvalue);

    const model = "text-davinci-003";
    const temperature = 0;
    const maxTokens = 4060;
    // Set up the request body with the given parameters
    const requestBody = {
      model: model,
      prompt: prompt,
      temperature: temperature,
      max_tokens: maxTokens,
    };
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + apiKey,
      },
    };
    axios
      .post(
        "https://api.openai.com/v1/completions",
        requestBody,
        requestOptions
      )
      .then((v) => {
        // console.log(v.data.choices);
        setresponse_data(v.data.choices);
      });
  };

  return (
    <>
      <div className="container">
        <div className="mb-3">
          <h6 className="text-center mb-3">Ask for article</h6>
          <div className="flex-center mt-2">
            <input
              type="text"
              className="form-control"
              name="project"
              id="project"
              placeholder="Submit text here"
              onChange={(e) => setinputvalue(e.target.value)}
            />
            <button
              onClick={() => {
                get_filtered_data();
              }}
              className="btn mx-2 btn-primary  "
            >
              Search
            </button>
          </div>
        </div>
        {response_data.map((rd: any, index) => {
          const dt = rd.text.replace(/\n/g, "<br />");
          return (
            <>
              <div style={{ height: "500px", overflowY: "scroll" }}>
                <h4>{title}</h4>
                <div dangerouslySetInnerHTML={{ __html: dt }} />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
