const {
  app,
  BrowserWindow,
  ipcMain,
  ipcRenderer,
  dialog,
} = require("electron");
const XLSX = require("xlsx");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.setMenu(null);
  win.loadFile("index.html");
  // win.webContents.openDevTools();

  // win.webContents.on("did-finish-load", () => {
  // 	console.log("did-finish-load");
  // 	win.webContents.send("uploaded-server", "Hello!");
  // });

  ipcMain.on("uploaded", async (e, data) => {
    const workbook = XLSX.readFile(data);
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];

    const dataExcel = XLSX.utils.sheet_to_json(worksheet);

    dataExcel.forEach((element) => {
      element["Precio venta"] = element["Precio venta"].replace("$", "") * 2;
    });

    const newWorkbook = XLSX.utils.book_new();
    const newWorksheet = XLSX.utils.json_to_sheet(dataExcel);
    XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, "Hoja 1");

    const result = await dialog.showSaveDialog({
      title: "Save file as",
      filters: [
        {
          name: "Spreadsheets",
          extensions: ["xlsx", "xls", "xlsb"],
        },
      ],
    });
    console.log(result);

    const statusWrite = XLSX.writeFile(newWorkbook, result.filePath, {
      compression: true,
    });
  });
};

app.whenReady().then(() => {
  createWindow();
});
