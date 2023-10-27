const { app, BrowserWindow, ipcMain, ipcRenderer } = require("electron");
const XLSX = require("xlsx");

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	win.setMenu(null);
	win.loadFile("index.html");
	win.webContents.openDevTools();

	// win.webContents.on("did-finish-load", () => {
	// 	console.log("did-finish-load");
	// 	win.webContents.send("uploaded-server", "Hello!");
	// });

	ipcMain.on("uploaded", (e, data) => {
		console.log("Analizando Excel");

		const workbook = XLSX.readFile(data);
		const worksheetName = workbook.SheetNames[0];
		const worksheet = workbook.Sheets[worksheetName];

		const dataExcel = XLSX.utils.sheet_to_json(worksheet);
		console.log(dataExcel);
	});
};

app.whenReady().then(() => {
	createWindow();
});
