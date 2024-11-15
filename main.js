//
// The api used for the data fetching is at https://rapidapi.com/psimavel/api/epic-games-store
//

import "./css/bootstrap.min.css";
import "./js/bootstrap.bundle.min";

const container = document.querySelector(".dynamic_data");
const spinner = document.querySelector(".spinner-container");
const alert = document.querySelector(".alert-warning");

console.log(container);

// Add event listener to the button
document.getElementById("searchButton").addEventListener("click", () => {
  // we get the input value and pass it in the param
  const query = document.getElementById("searchInput").value;
  fetchData(query);
});

const fetchData = async (query) => {
  const url = `https://epic-games-store.p.rapidapi.com/search/${query}/page/1/country/US/locale/en`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_RAPID_KEY,
      "x-rapidapi-host": "epic-games-store.p.rapidapi.com",
    },
  };

  // Show spinner
  spinner.classList.remove("d-none");
  alert.classList.add("d-none");
  container.innerHTML = "";
  
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
  
    // Check if the data structure is as expected
    if (data.Catalog && data.Catalog.searchStore && Array.isArray(data.Catalog.searchStore.elements)) {
      console.log(data.Catalog.searchStore.elements.length);
  
      // Hide spinner
      spinner.classList.add("d-none");
  
      if (data.Catalog.searchStore.elements.length === 0) {
        // Show "nothing found" message
        alert.classList.remove("d-none");
      } else {
        // Display data
        data.Catalog.searchStore.elements.forEach(item => {
          const price = item.price.totalPrice.originalPrice === 0 ? "Free" : `${item.price.totalPrice.originalPrice} ${item.price.totalPrice.currencyCode}`;
          container.innerHTML += `
            <div class="col">
              <article class="card">
                <div class="card-body">
                <p>${item.title}</p>
                  <p>${item.description}</p>
                  <p>${price}</p>
                </div>
              </article>
            </div>
          `;
        });
      }
    } else {
      throw new Error("Unexpected data structure");
    }
  } catch (error) {
    console.error(error);
  
    // Hide spinner and show error message
    spinner.classList.add("d-none");
    alert.classList.remove("d-none");
    alert.textContent = "An error occurred while fetching data.";
  }}
