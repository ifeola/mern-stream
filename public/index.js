// ===== Menu Toggle =====
const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".header-menu");

toggle.addEventListener("click", () => {
	menu.classList.toggle("open");
});

// ===== Product Fetching =====

async function getProducts(filters = {}) {
	const queryParams = new URLSearchParams(filters);
	const res = await fetch(`/api/Books?${queryParams}`);
	return await res.json();
}

// ===== Product Rendering =====

function renderProducts(products) {
	const albumsContainer = document.getElementById("products-container");
	const cards = products
		.map((album) => {
			return `
      <div class="product-card">
        <img src="${album.image}" alt="${album.title}">
        <h2>${album.title}</h2>
        <h3>${album.artist}</h3>
        <p>$${album.price}</p>
        <button class="add-btn">Add to Cart</button>
        <p class="genre-label">${album.genre}</p>
      </div>
    `;
		})
		.join("");

	albumsContainer.innerHTML = cards;
}

// ===== Initial Load =====

/**
 * Fetches and displays all products on initial page load.
 */
async function init() {
	const products = await getProducts();
	renderProducts(products);
	populateGenreSelect();
	console.log("Hi");
}

init();

// ===== Genre Dropdown =====

/**
 * Populates the genre dropdown with available genres from the API.
 */
async function populateGenreSelect() {
	const res = await fetch("/api/books/genres");
	const genres = await res.json();
	const select = document.getElementById("genre-select");

	genres.forEach((genre) => {
		const option = document.createElement("option");
		option.value = genre;
		option.textContent = genre;
		select.appendChild(option);
	});
}

/* async function populateGenreSelect() {
	const select = document.getElementById("genre-select");
	const errorMessage = document.getElementById("error-message");

	try {
		// CORRECTED: The URL now matches the endpoint defined in Express
		const response = await fetch("http://localhost:3000/api/books/genres");

		// STEP 1: Check if the response was successful (status 200-299)
		if (!response.ok) {
			// If not OK, throw an error to be caught by the catch block
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		// STEP 2: Parse the JSON body
		const genres = await response.json();

		// STEP 3: Clear the initial "Loading..." message
		select.innerHTML = "";

		// Add a default "All" option
		const defaultOption = document.createElement("option");
		defaultOption.value = ""; // An empty value is standard for "All" or "Select"
		defaultOption.textContent = "All Genres";
		select.appendChild(defaultOption);

		// STEP 4: Populate the dropdown with genres from the API
		genres.forEach((genre) => {
			const option = document.createElement("option");
			option.value = genre;async function populateGenreSelect() {
	const select = document.getElementById("genre-select");
	const errorMessage = document.getElementById("error-message");

	try {
		// CORRECTED: The URL now matches the endpoint defined in Express
		const response = await fetch("http://localhost:3000/api/books/genres");

		// STEP 1: Check if the response was successful (status 200-299)
		if (!response.ok) {
			// If not OK, throw an error to be caught by the catch block
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		// STEP 2: Parse the JSON body
		const genres = await response.json();

		// STEP 3: Clear the initial "Loading..." message
		select.innerHTML = "";

		// Add a default "All" option
		const defaultOption = document.createElement("option");
		defaultOption.value = ""; // An empty value is standard for "All" or "Select"
		defaultOption.textContent = "All Genres";
		select.appendChild(defaultOption);

		// STEP 4: Populate the dropdown with genres from the API
		genres.forEach((genre) => {
			const option = document.createElement("option");
			option.value = genre;
			option.textContent = genre;
			select.appendChild(option);
		});
	} catch (error) {
		// STEP 5: Handle any errors that occurred during fetch or parsing
		console.error("Failed to populate genres:", error);

		// Provide user-friendly feedback on the page
		select.innerHTML = '<option value="">Failed to load</option>';
		errorMessage.textContent =
			"Could not load genres. Please try refreshing the page.";
	}
}
			option.textContent = genre;
			select.appendChild(option);
		});
	} catch (error) {
		// STEP 5: Handle any errors that occurred during fetch or parsing
		console.error("Failed to populate genres:", error);

		// Provide user-friendly feedback on the page
		select.innerHTML = '<option value="">Failed to load</option>';
		errorMessage.textContent =
			"Could not load genres. Please try refreshing the page.";
	}
} */

// ===== Filter Handling =====

/**
 * Fetches and renders products based on the current search input.
 */
async function applySearchFilter() {
	const search = document.getElementById("search-input").value.trim();
	const filters = {};
	if (search) filters.search = search;

	const products = await getProducts(filters);
	renderProducts(products);
}

// ===== Event Listeners =====

document.getElementById("search-input").addEventListener("input", (e) => {
	e.preventDefault();
	applySearchFilter();
});

// prevent 'enter' from submitting
document.getElementById("search-input").addEventListener("submit", (e) => {
	e.preventDefault();
});

document.querySelector("form").addEventListener("submit", (e) => {
	e.preventDefault();
	applySearchFilter(); // your function to run the search
});

document
	.getElementById("genre-select")
	.addEventListener("change", async (e) => {
		const genre = e.target.value;
		const products = await getProducts(genre ? { genre } : {});
		renderProducts(products);
	});
