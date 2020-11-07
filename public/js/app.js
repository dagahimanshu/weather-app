const weatherForm = document.querySelector("form");
const message1 = document.getElementById("message-1");
const message2 = document.getElementById("message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  message1.innerText = "loading...";
  message2.innerText = "";
  const address = e.target.location.value;
  fetch(`weather?address=${address}`).then((resp) => {
    resp.json().then((information) => {
      if (information.error) {
        message1.innerText = information.error;
        message2.innerText = "";
      } else {
        const { location, data } = information;
        message1.innerText = location;
        message2.innerText = data;
      }
    });
  });
});
