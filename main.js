let data;
let headers = [];

const searchButtonDom = document.querySelector(".voice-search-input");
const searchOptionsDom = document.querySelector(".voice-search-options");
const searchResultsDom = document.querySelector(".voice-search-results tbody");
const summaryDom = document.querySelector(".voice-search-summary");

const searchOptionTemplate = Handlebars.compile(document.getElementById("search-option-template").innerHTML);
const searchResultTemplate = Handlebars.compile(document.getElementById("search-result-template").innerHTML);

const searchOptionPrefix = "$"

loadData("data/voice-actors.csv");

function loadData(url) {
	Papa.parse(url, {
		download: true,
		header: true,
		dynamicTyping: true,
		skipEmptyLines: true,
		complete: function (results) {
			data = results.data;
			headers = results.meta.fields.filter(function identifySearchOption(field) {
				return field[0] === searchOptionPrefix;
			}).map(function stripSearchOptionPrefix(field) {
				return field.substr(1)
			});

			displaySearchOptions(headers);
			initInputs();
			search();
		}
	});
}

function initInputs() {
	searchButtonDom.addEventListener("input", search);
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
	let matched = data.filter(function (row) {
		return row.Name.toLowerCase().includes(searchInput.toLowerCase());
	});

	const checkedOptions = getCheckedOptions();
	if (checkedOptions.length) {
		matched = matched.filter(function (row) {
			return checkedOptions.every(function (checkedOption) {
				return row[searchOptionPrefix + checkedOption] === true;
			});
		});
	}

	displaySummary("Matched " + matched.length + " " + maybePlural("actor", matched.length) + ":");
	displaySearchResults(matched);
}

function maybePlural(singular, count) {
	return count === 1 ? singular : singular + "s";
}

function displaySearchOptions(keys) {
	const form = document.querySelector(".voice-search-options");
	form.innerHTML = keys.map(function (key) {
		return searchOptionTemplate({ key: key, label: prettifyOptionKey(key) });
	}).join("\n");
}

function displaySummary(text) {
	summaryDom.innerText = text;
}

function displaySearchResults(rows) {
	const templateModel = rows.map(function (row) {
		return {
			name: row.Name,
			sample: row.Sample,
			headers: headers.filter(function (header) {
				return row[searchOptionPrefix + header];
			}).sort().map(prettifyOptionKey).join(", ")
		};
	});

	searchResultsDom.innerHTML = templateModel.map(searchResultTemplate).join("\n");
}

function prettifyOptionKey(key) {
	return key.replace("_", " ");
}
