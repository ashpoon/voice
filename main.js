let data;
let headers = [];

const searchButtonDom = document.querySelector(".voice-search-input");
const searchOptionsDom = document.querySelector(".voice-search-options");
const searchResultsDom = document.querySelector(".voice-search-results tbody");
const summaryDom = document.querySelector(".voice-search-summary");

const searchOptionTemplate = Handlebars.compile(document.getElementById("search-option-template").innerHTML);
const searchResultTemplate = Handlebars.compile(document.getElementById("search-result-template").innerHTML);

const searchOptionPrefix = "$"

function initInputs() {
	// searchButtonDom.addEventListener("input", search);
	searchOptionsDom.addEventListener("change", search);
}

function getCheckedOptions() {
	const checked = document.querySelectorAll('input[type="checkbox"]:checked');
	return Array.prototype.map.call(checked, function (e) {
		return e.value;
	});
}

function search(input) {
	const searchInput = searchButtonDom.value;
	// let matched = data.filter(function (row) {
	// 	return row.Name.toLowerCase().includes(searchInput.toLowerCase());
	// });

	const checkedOptions = getCheckedOptions();
	if (checkedOptions.length) {
		matched = matched.filter(function (row) {
			return checkedOptions.every(function (checkedOption) {
				return row[searchOptionPrefix + checkedOption] === true;
			});
		});
	}

	// displaySummary("Matched " + matched.length + " " + maybePlural("actor", matched.length) + ":");
	// displaySearchResults(matched);
}
