import './App.css';

function App() {
  return (
    <div className="App">
      <h1>File Downloader</h1>
      <p>Paste url of image,video,or pdf to download.</p>
      <input type="url" placeholder='Paste file url here'/>
      <button onClick={getValue}>Download</button>
    </div>
  );
}

function getValue() {
  let fileInput = document.querySelector("input");
  if(fileInput.value === ''){
    alert("Please enter a valid URL");
  }
  else{
  let downloadBtn = document.querySelector("button");
  downloadBtn.innerText = "Downloading file...";
  fetchFile(fileInput.value);
  }
}

function fetchFile(url) {
  // Fetching file & returning response as blob. blob creates an Object.
  fetch(url).then(res => res.blob()).then(file => {
  // URL.createObjURL creates a url of passed object.URL.createObjURL creates a string.
  let tempUrl = URL.createObjectURL(file);
  let aTag = document.createElement("a");
  aTag.href = tempUrl;

  aTag.download = url.replace(/^.*[\\\/]/,'');
  document.body.appendChild(aTag);
  // clicking a tag so the file download
  aTag.click();
  // removing a tag once file downloaded
  aTag.remove();
  URL.revokeObjectURL(tempUrl);
  let downloadBtn = document.querySelector("button");
  downloadBtn.innerText = "Download File";
  }).catch(() => {
  let downloadBtn = document.querySelector("button");
  downloadBtn.innerText = "Download File";  
  alert("Failed downloading file!");
  });
}



export default App;
