const { ipcRenderer } = require("electron");

const inputFile = document.getElementById("file");

// ipcRenderer.on("uploaded-server", (event, arg) => {
// 	console.log("Message from server");
// });

inputFile.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  const data = await file.arrayBuffer();

  // const workbook = XLSX.read(data, { type: "array" });
  // const sheet = workbook.SheetNames[0];

  // const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

  ipcRenderer.send("uploaded", data);
});
