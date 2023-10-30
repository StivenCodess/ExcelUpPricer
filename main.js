const { app, BrowserWindow, ipcMain, ipcRenderer, dialog } = require("electron");
const XLSX = require("xlsx");

const increasePrice = (dataExcel, percentage) => {
	let price = null;
	let priceModified = null;

	dataExcel.forEach((element) => {
		price = element["Precio Venta"];
		priceModified = price + price * (percentage / 100);
		element["Precio Venta"] = priceModified.toFixed(0);
		element["Codigo"] = `${element["Codigo"]}`;
	});
	return dataExcel;
};

const decreasePrice = (dataExcel, percentage) => {
	let price = null;
	let priceModified = null;

	dataExcel.forEach((element) => {
		price = element["Precio Venta"];
		priceModified = price - price * (percentage / 100);
		element["Precio Venta"] = priceModified.toFixed(0);
		element["Codigo"] = `${element["Codigo"]}`;
	});
	return dataExcel;
};

const createWindow = () => {
	const win = new BrowserWindow({
		width: 630,
		height: 580,
		resizable: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	win.setMenu(null);
	win.loadFile("index.html");
	//win.webContents.openDevTools();

	// win.webContents.on("did-finish-load", () => {
	// 	console.log("did-finish-load");
	// 	win.webContents.send("uploaded-server", "Hello!");
	// });

	ipcMain.on("uploaded", async (e, data, percentage, action) => {
		const workbook = XLSX.readFile(data);
		const worksheetName = workbook.SheetNames[0];
		const worksheet = workbook.Sheets[worksheetName];

		const dataExcel = XLSX.utils.sheet_to_json(worksheet);
		let newDataExcel = null;

		if (action === "increase") newDataExcel = increasePrice(dataExcel, percentage);
		else newDataExcel = decreasePrice(dataExcel, percentage);

		const newWorkbook = XLSX.utils.book_new();
		const newWorksheet = XLSX.utils.json_to_sheet(newDataExcel);
		XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, "Hoja 1");

		const result = await dialog.showSaveDialog({
			title: "Save file as",
			filters: [
				{
					name: "Spreadsheets",
					extensions: ["xls"],
				},
			],
		});

		try {
			XLSX.writeFile(newWorkbook, result.filePath, {
				WTF: true,
				bookType: "biff8",
			});
		} catch (error) {
			console.log(error);
		}
	});
};

app.whenReady().then(() => {
	createWindow();
});
