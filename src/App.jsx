import "./App.css";

function App() {
  const title = document.head.querySelector("title");
  title.textContent = "Application";
  return (
    <div className="App">
      <h1 className="title">Dropzone</h1>

      <form onDragEnter={(e) => console.log(e)} className="form">
        <input className="form__upload" type="file" name="" id="" />
        <label id="label-file-upload" htmlFor="input-file-upload"></label>
        <button className="upload-button" type="">
          Upload file
        </button>
      </form>
    </div>
  );
}

export default App;
