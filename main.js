import "./css/bootstrap.min.css";
import "./js/bootstrap.bundle.min";

const container = document.querySelector(".dynamic_data");

console.log(container);

const URL = "https://jsonplaceholder.typicode.com/users"

fetch(URL)
	.then((res) => {
		if (!res.ok) {
			container.textContent = "No user found with this data";
			return;
		}
		return res.json();
	})
	.then((json) => {
		handleData(json);
	})
	.catch((err) => {
		console.error("Error fetching data:", err);
		container.textContent = "Failed to fetch user data";
	});


function handleData(json) {
	console.log(json);
	json.forEach((user) => {
		const userCard = `
			<div class="col">
				<article class="card">
					<div class="card-body">
						<p>${user.name}</p>
						<p>${user.email}</p>
					</div>
				</article>
			</div>
		`;
		container.innerHTML += userCard;
	});
}