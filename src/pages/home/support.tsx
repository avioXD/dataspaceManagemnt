import { useState } from "react";

export default function StudentSupport() {
  const [suggestion] = useState<any[]>([
    "My class is not opening",
    "My class is not opening",
    "My class is not opening",
  ]);
  const [question, setQuestion] = useState<any>("");
  return (
    <>
      <div className="card p-4 shadow-sm">
        <h6 className="header mb-4">Support</h6>
        <div className="row mx-3">
          {suggestion &&
            suggestion.map((x: any) => (
              <>
                <div className="col-sm-6">
                  <div className="mb-3">
                    <div
                      className="suggestions"
                      onClick={(e) => {
                        setQuestion(x);
                      }}
                    >
                      {x}
                    </div>
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </>
  );
}
