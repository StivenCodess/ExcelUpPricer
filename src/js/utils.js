const inputFile = document.getElementById("file");
const filename = document.querySelector(".filename");

const increaseButton = document.getElementById("increase-price-button");
const decreaseButton = document.getElementById("decrease-price-button");

const inputPercentage = document.getElementById("custom-percentage");
const buttonsPercentages = document.querySelectorAll(".percentages-buttons button");

const infoIcon = document.getElementById("info-icon");

const statusMsg = document.getElementById("status-msg");

let selectedButton = null;
let percentage = null;

document.addEventListener("DOMContentLoaded", () => {
	window.api.status_message((e, msg) => {
		statusMsg.innerHTML = `Status: ${msg}`;
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
	const datafile = await inputFile.files[0].arrayBuffer();
	if (percentage && percentage > 0)
		window.api.update_excel(datafile, percentage, "increase");
});

decreaseButton.addEventListener("click", async () => {
	const datafile = await inputFile.files[0].arrayBuffer();
	if (percentage && percentage > 0)
		window.api.update_excel("uploaded", datafile, percentage, "decrease");
});

infoIcon.addEventListener("click", () => {
	window.location.href = "info.html";
});
