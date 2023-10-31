const homeIcon = document.getElementById("home-icon");
const version = document.getElementById("version");

window.api.getVersion((e, msg) => {
	version.innerHTML = ` Version: ${msg}`;
});

homeIcon.addEventListener("click", () => {
	window.location.href = "index.html";
});
