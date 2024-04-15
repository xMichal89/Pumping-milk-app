const ulList = document.querySelector(".list-box ul");
const hour = document.querySelectorAll(".hour");
const minut = document.querySelectorAll(".minut");
const typeAction = document.querySelectorAll(".type-action");
const volume = document.querySelectorAll(".volume");
const comment = document.querySelectorAll(".comment");
const date = document.querySelectorAll(".date");
const deleteAll = document.querySelector(".delete-all");
// const editBtns = document.querySelectorAll(".edit");
// const deleteBtns = document.querySelectorAll(".delete");

const addHours = document.querySelector(".add-hours");
const addMinute = document.querySelector(".add-minute");
const addAction = document.querySelector(".add-action");
const addVolume = document.querySelector(".add-volume");
const addComment = document.querySelector(".add-comment");
const addError = document.querySelector(".add-error");
const addBtn = document.querySelector(".add");

const hoursCount = document.querySelector(".hours-count");
const minutesCount = document.querySelector(".minutes-count");
const secondsCount = document.querySelector(".seconds-count");
const h3 = document.querySelector("#pump-time");
const start = document.querySelector(".start");
const reset = document.querySelector(".reset");

const popup = document.querySelector(".popup");
const popupHours = document.querySelector(".popup-hours");
const popupMinute = document.querySelector(".popup-minute");
const popupAction = document.querySelector(".popup-action");
const popupVolume = document.querySelector(".popup-volume");
const popupComment = document.querySelector(".popup-comment");

const cancelBtn = document.querySelector(".cancel");
const saveBtn = document.querySelector(".save");
let timeOutId;
let liEdit;
let hourEdit;
let minutEdit;
let typeEdit;
let volumeEdit;
let commentEdit;
let currentTime = new Date();
const day = currentTime.getDate();
const month = currentTime.getMonth() + 1;
const year = currentTime.getFullYear();
const sek = currentTime.getSeconds();

const deletePosition = (e) => {
	e.target.closest("li").remove();
};

const checkDelete = (e) => {
	if (confirm("Czy napewno chcesz usunąć pozycję?")) {
		deletePosition(e);
	}
};

const deleteAllPosition = () => {
	if (confirm("Czy napewno chcesz usunąć wszystkie pozycje?")) {
		ulList.innerHTML = "";
		ulList.textContent = "";
	}
};

const editPosition = (e) => {
	popup.classList.add("active");
	liEdit = e.target.closest("li");
	hourEdit = liEdit.firstElementChild.children[0].children[0].textContent;
	minutEdit = liEdit.firstElementChild.children[0].children[1].textContent;
	typeEdit = liEdit.firstElementChild.children[0].children[2].textContent;
	volumeEdit = liEdit.firstElementChild.children[0].children[3].textContent;
	commentEdit = liEdit.firstElementChild.children[0].children[4].textContent;

	popupHours.value = hourEdit;
	popupMinute.value = minutEdit;
	popupAction.value = typeEdit;
	popupVolume.value = volumeEdit;
	popupComment.value = commentEdit;

	if (popupHours.value == "00") {
		popupHours.value = 0;
	}
	if (popupMinute.value == "00") {
		popupMinute.value = 0;
	}

	if (volumeEdit.includes("ml")) {
		popupVolume.value = volumeEdit.slice(0, -2);
	}
};

const ckeckClick = (e) => {
	if (e.target.matches(".edit")) {
		editPosition(e);
	} else if (e.target.matches(".delete")) {
		checkDelete(e);
	}
};

const closePopup = () => {
	popup.classList.remove("active");
};

const savePopup = () => {
	liEdit.firstElementChild.children[0].children[0].textContent =
		popupHours.value;
	liEdit.firstElementChild.children[0].children[1].textContent =
		popupMinute.value;
	liEdit.firstElementChild.children[0].children[2].textContent =
		popupAction.value;
	liEdit.firstElementChild.children[0].children[3].textContent =
		popupVolume.value;
	liEdit.firstElementChild.children[0].children[4].textContent =
		popupComment.value;

	if (popupHours.value < 10) {
		liEdit.firstElementChild.children[0].children[0].textContent =
			"0" + popupHours.value;
	}
	if (popupMinute.value < 10) {
		liEdit.firstElementChild.children[0].children[1].textContent =
			"0" + popupMinute.value;
	}

	closePopup();
};

const resetCounter = () => {
	hoursCount.textContent = 2;
	minutesCount.textContent = 59;
	secondsCount.textContent = 59;
	h3.classList.remove("pump-time");
	h3.textContent = "Kolejne odciąganie za:";
	window.clearTimeout(timeOutId);
};

const startCounter = () => {
	secondsCount.textContent--;

	if (secondsCount.textContent <= 0 && minutesCount.textContent > 0) {
		secondsCount.textContent = 59;
		minutesCount.textContent--;
	}

	if (minutesCount.textContent <= 0 && hoursCount.textContent > 0) {
		minutesCount.textContent = 59;
		hoursCount.textContent--;
	}

	if (
		secondsCount.textContent == 0 &&
		minutesCount.textContent <= 0 &&
		hoursCount.textContent <= 0
	) {
		h3.classList.add("pump-time");
		h3.textContent = "ODCIĄGANIE!";
		secondsCount.textContent = 0;
		minutesCount.textContent = 0;
		hoursCount.textContent = 0;
	}

	timeOutId = window.setTimeout(startCounter, 1000);
};

// const setTime = () => {
// 	if (addAction.value == "O" || addAction.value == "KO") {
// 		h3.textContent = "Kolejne odciąganie za:";
// 		h3.classList.remove("pump-time");
// 		const newHour = parseInt(addHours.value) + 3;
// 		const sekund = 0;
// 		const userTime = new Date(
// 			`${month} ${day} ${year} ${newHour}:${addMinute.value}:${sekund}`
// 		);
// 		const thisTime = new Date();

// 		const result = userTime - thisTime;

// 		const hours = Math.floor(Math.abs(result / 1000 / 60 / 60) % 24);
// 		const minutes = Math.floor(Math.abs(result / 1000 / 60) % 60);
// 		const seconds = Math.floor(Math.abs(result / 1000) % 60);

// 		hoursCount.textContent = hours;
// 		minutesCount.textContent = minutes;
// 		secondsCount.textContent = seconds;
// 		if (result <= 0) {
// 			h3.textContent = "ODCIĄGANIE!";
// 			h3.classList.add("pump-time");

// 		}
// 	}
// };

const createPosition = () => {
	const newPosition = document.createElement("li");
	const infoPanel = document.createElement("div");
	infoPanel.classList.add("info");
	const toolsPanel = document.createElement("div");
	toolsPanel.classList.add("tools");

	const boxPosition = document.createElement("p");
	const boxDate = document.createElement("p");

	const hourSpan = document.createElement("span");
	hourSpan.classList.add("hour");
	hourSpan.textContent = addHours.value;
	if (addHours.value < 10) {
		hourSpan.textContent = "0" + addHours.value;
	}

	const minuteSpan = document.createElement("span");
	minuteSpan.classList.add("minut");
	minuteSpan.textContent = addMinute.value;
	if (addMinute.value < 10) {
		minuteSpan.textContent = "0" + addMinute.value;
	}

	const actionSpan = document.createElement("span");
	actionSpan.classList.add("type-action");
	actionSpan.textContent = addAction.value;

	const volumeSpan = document.createElement("span");
	volumeSpan.classList.add("volume");
	volumeSpan.textContent = addVolume.value;

	const commentSpan = document.createElement("span");
	commentSpan.classList.add("comment");
	commentSpan.textContent = addComment.value;

	const dott = ":";
	const slash = " | ";
	const space = " ";
	const indexVolume = "ml ";

	const dateSpan = document.createElement("span");
	dateSpan.classList.add("date");
	dateSpan.textContent = `${day}.${month}.${year}`;
	if (month < 10) {
		dateSpan.textContent = `${day}.0${month}.${year}`;
	}

	boxPosition.append(
		hourSpan,
		dott,
		minuteSpan,
		slash,
		actionSpan,
		space,
		volumeSpan,
		indexVolume,
		commentSpan
	);
	boxDate.append(dateSpan);

	infoPanel.append(boxPosition, boxDate);

	const editBtn = document.createElement("button");
	editBtn.classList.add("edit");
	editBtn.innerHTML = '<i class="fa-solid fa-pencil"></i>';

	const deleteBtn = document.createElement("button");
	deleteBtn.classList.add("delete");
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

	toolsPanel.append(editBtn, deleteBtn);

	newPosition.append(infoPanel, toolsPanel);
	ulList.append(newPosition);
	if (addAction.value === "O" || addAction.value === "KO") {
		newPosition.classList.add("pumping");
	}
};

const addPosition = () => {
	if (addHours.value != "" && addMinute.value != "" && addAction.value != "") {
		addError.style.visibility = "hidden";
		createPosition();
	} else {
		addError.style.visibility = "visible";
	}
};

ulList.addEventListener("click", ckeckClick);
addBtn.addEventListener("click", addPosition);
// addBtn.addEventListener("click", setTime);
cancelBtn.addEventListener("click", closePopup);
saveBtn.addEventListener("click", savePopup);
reset.addEventListener("click", resetCounter);
start.addEventListener("click", startCounter);
deleteAll.addEventListener("click", deleteAllPosition);
