const inputFile = document.getElementById("file");
const filename = document.querySelector(".filename");

const increaseButton = document.getElementById("increase-price-button");
const decreaseButton = document.getElementById("decrease-price-button");

const inputPercentage = document.getElementById("custom-percentage");
const buttonsPercentages = document.querySelectorAll(".percentages-buttons button");

const infoIcon = document.getElementById("info-icon");
const version = document.getElementById("version");

let selectedButton = null;
let percentage = null;

window.api.getVersion((e, msg) => {
	version.innerHTML = ` Version: ${msg}`;
});

window.api.status_message((e, msg) => {
	window.api.toast({
		text: "Actualizacion disponible. ",
		duration: -1,
		close: true,
		gravity: "bottom",
		position: "right",
		style: {
			background: "linear-gradient(to right, #00b09b, #96c93d)",
		},
	});
});

buttonsPercentages.forEach((button) => {
	button.addEventListener("click", (e) => {
		if (selectedButton) selectedButton.classList.remove("selected");
		selectedButton = button;
		selectedButton.classList.add("selected");
		percentage = e.currentTarget.getAttribute("data-percentage");
	});
});

inputPercentage.addEventListener("input", (e) => {
	if (selectedButton && inputPercentage !== selectedButton)
		selectedButton.classList.remove("selected");

	selectedButton = inputPercentage;

	if (e.target.value) selectedButton.classList.add("selected");
	else selectedButton.classList.remove("selected");

	if (e.target.value >= 0 && e.target.value <= 100) percentage = e.target.value;
	else e.target.value = 0;
});

inputFile.addEventListener("change", (e) => {
	const file = e.target.files[0];
	filename.innerHTML = `📄 ${file.name}`;
});

increaseButton.addEventListener("click", async () => {
	let datafile = null;

	if (inputFile.files[0] !== undefined) {
		datafile = await inputFile.files[0].arrayBuffer();
	} else {
		window.api.toast({
			text: "Selecciona un archivo. ",
			duration: 3000,
			close: true,
			gravity: "bottom",
			position: "right",
			style: {
				background: "linear-gradient(to right, #FF5733, #FF0049)",
			},
		});
		return;
	}

	if (percentage && percentage > 0)
		window.api.update_excel(datafile, percentage, "increase");
	else
		window.api.toast({
			text: "Selecciona un porcentaje. ",
			duration: 3000,
			close: true,
			gravity: "bottom",
			position: "right",
			style: {
				background: "linear-gradient(to right, #FF5733, #FF0049)",
			},
		});
});

decreaseButton.addEventListener("click", async () => {
	let datafile = null;

	if (inputFile.files[0] !== undefined) {
		datafile = await inputFile.files[0].arrayBuffer();
	} else {
		window.api.toast({
			text: "Selecciona un archivo. ",
			duration: 3000,
			close: true,
			gravity: "bottom",
			position: "right",
			style: {
				background: "linear-gradient(to right, #FF5733, #FF0049)",
			},
		});
		return;
	}

	if (percentage && percentage > 0)
		window.api.update_excel(datafile, percentage, "increase");
	else
		window.api.toast({
			text: "Selecciona un porcentaje. ",
			duration: 3000,
			close: true,
			gravity: "bottom",
			position: "right",
			style: {
				background: "linear-gradient(to right, #FF5733, #FF0049)",
			},
		});
});

infoIcon.addEventListener("click", () => {
	window.location.href = "info.html";
});
