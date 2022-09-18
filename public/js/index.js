
const weatherForm = document.querySelector("form");

weatherForm.addEventListener("submit", (e)=>{
	e.preventDefault();
	const search = document.querySelector("#address");
	const location = search.value;
	const message1 = document.querySelector(".message-1");
	const message2 = document.querySelector(".message-2");
	const url = "http://localhost:3000/weather?address="+location;
	message1.textContent = "Loading..";
	message2.textContent = "";

	fetch(url).then((response)=>{
		response.json().then((data)=>{
			if(data.error){
				message1.textContent = data.error;
			}else{
				console.log(data);
				message1.textContent = data.location;
				message2.textContent = data.forecast;
			}
		});
	})
})