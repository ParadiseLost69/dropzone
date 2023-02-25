import "./App.css";
import React from "react";
function App() {
  const title = document.head.querySelector("title");
  title.textContent = "Application";

  const [files, setFiles] = React.useState([]);

  function handleFileUpload(e) {}

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const data = e.dataTransfer.files[0];
    console.log(e.dataTransfer.items);
    if (files.includes(data)) {
      return;
    }
    setFiles((prevFiles) => {
      return [...prevFiles, data];
    });

    console.log(files);
  }

  function handleSubmit() {
    setFiles([]);
  }

  return (
    <div className="App">
      <h1 className="title">Click the box or drag and drop a file</h1>
      <form onChange={(e) => console.log(e.target.files)} action="#">
        <div
          className="submit-box"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            style={{}}
            className="file-input"
            type="file"
            multiple
            name=""
            id=""
          />
        </div>
      </form>
      <div>
        {files.length > 0 && (
          <div>
            <label htmlFor="custodian" name="custodia">
              Custodian
            </label>
            <input className="custodian" />
            <div className="file-card--container">
              {files.map((file, ind) => {
                return (
                  <div className="file-card" key={ind}>
                    <p>{file.name}</p>
                    <p>{file.size} bytes</p>
                  </div>
                );
              })}
            </div>
            <button onClick={handleSubmit}>submit</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
