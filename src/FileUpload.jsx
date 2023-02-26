import React, { useState, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [custodian, setCustodian] = useState("");
  const [progress, setProgress] = useState(0);

  const handleDrop = (e) => {
    e.preventDefault();
    const newFiles = [...files, ...e.dataTransfer.files];
    setFiles(newFiles);
  };

  const handleFileInput = (e) => {
    const newFiles = [...files, ...e.target.files];
    setFiles(newFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProgress(0);
    setFiles([]);
    setCustodian("");
  };

  useEffect(() => {
    let intervalId;
    if (progress < 100) {
      intervalId = setInterval(() => {
        setProgress((prevProgress) => prevProgress + 10);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [progress]);

  return (
    <div
      className="file-upload"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="dropzone">
        <h5>Drag and drop files here or click to select files</h5>
        <input type="file" onChange={handleFileInput} multiple />
      </div>
      {files.length > 0 && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="custodian">Custodian:</label>
            <input
              type="text"
              id="custodian"
              className="form-control"
              value={custodian}
              onChange={(e) => setCustodian(e.target.value)}
              required
            />
          </div>
          {files.map((file, index) => (
            <div key={index} className="mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <i className="far fa-file mr-2"></i>
                  {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </div>
                <div>{progress < 100 && <ProgressBar now={progress} />}</div>
              </div>
            </div>
          ))}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default FileUpload;
