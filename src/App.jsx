import "./App.css";
import React from "react";

import ProgressBar from "./components/progressBar";

function App() {
  const title = document.head.querySelector("title");
  title.textContent = "Application";

  const [files, setFiles] = React.useState([]);
  const [fileSize, setFileSize] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [percent, setPercent] = React.useState(0);

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
    //sets an interval time that is relative to the total file size.
    const intervalTime = fileSize / 100000 + 10;

    setIsLoading(true);
    let loadedSize = 0;
    const totalSize = fileSize;

    const loadingInterval = setInterval(() => {
      if (loadedSize >= totalSize) {
        clearInterval(loadingInterval);
        setIsLoading(false);
        setFiles([]);
        setPercent(0);
        return;
      }

      //create a percentage based on what is loaded
      loadedSize += Math.floor(totalSize / 100); // Increase the loadedSize by an amount proportional to the total size.
      const newPercent = Math.floor((loadedSize / totalSize) * 100); // Calculate the new percentage of total size that has been loaded.

      setPercent(newPercent);
    }, intervalTime);
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
      <form action="#">
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

            {isLoading && <ProgressBar width={percent} />}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
