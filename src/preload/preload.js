const { contextBridge, ipcRenderer } = require("electron");
const Toastify = require("toastify-js");

const API = {
	toast: (options) => Toastify(options).showToast(),
	update_excel: (datafile, percentage, action) =>
		ipcRenderer.send("uploaded", datafile, percentage, action),
};

contextBridge.exposeInMainWorld("api", API);
