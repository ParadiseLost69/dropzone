import "./App.css";
import React from "react";
function App() {
  const title = document.head.querySelector("title");
  title.textContent = "Application";

  const [files, setFiles] = React.useState([]);
  const [fileSize, setFileSize] = React.useState(0);

  function handleFileUpload(e) {
    const { files } = e.target;
    setFiles((prevFiles) => [...prevFiles, ...files]);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const { files } = e.dataTransfer;

    setFiles((prevFiles) => {
      return [...prevFiles, ...files];
    });
  }

  function handleSubmit() {
    let milliseconds = fileSize / 100;

    //For user display. MOCK LOADING
    let seconds = Math.round(milliseconds / 1000);
    console.log(
      `This should finish in ${seconds + 1} second${
        seconds + 1 === 1 ? "" : "s"
      }`
    );

    const loadingCountdown = setInterval(() => {
      console.log(seconds + " seconds remaining");
      seconds--;
      if (seconds <= -1) {
        console.log("Finito");
        clearInterval(loadingCountdown);
      }
    }, 1000);

    setFiles([]);
  }

  //changes the batch fileSize whenever the files change
  React.useEffect(() => {
    const size = files.reduce((prev, cur) => {
      return prev + cur.size;
    }, 0);
    setFileSize(size);
  }, [files]);

  return (
    <div className="App">
      <h1 className="title">Click the box or drag and drop a file</h1>
      <form onChange={(e) => console.log(e.target.files)} action="#">
        <div
          className="submit-box"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <h3 className="box-title">Drag and drop a file or click</h3>
          <input
            onChange={handleFileUpload}
            className="file-input"
            type="file"
            multiple
            name=""
            id=""
          />
        </div>
      </form>
      <div className="file-upload-area">
        {files.length > 0 && (
          <div className="file-area">
            <div className="input-area">
              <label htmlFor="custodian">Custodian</label>
              <input
                className="custodian"
                name="custodian"
                placeholder="John Smith"
              />
            </div>
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
            <button className="submit-button" onClick={handleSubmit}>
              submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
