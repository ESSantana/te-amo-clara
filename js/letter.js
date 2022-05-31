if (!window.location.href.includes("?password")) {
  const urlParts = window.location.href.split("/");
  const baseURL = urlParts.slice(0, urlParts.length - 2).join("/");
  // window.location.href = baseURL + "/index.html";
}

var encryptedPassword = window.location.href
  .split("?")[1]
  .split("=")[1]
  .split("&")[0];

console.log(encryptedPassword);
if (encryptedPassword.length !== 44) {
  const urlParts = window.location.href.split("/");
  const baseURL = urlParts.slice(0, urlParts.length - 2).join("/");
  // window.location.href = baseURL + "/index.html";
}

fetch("https://vyqcqyrsad.execute-api.sa-east-1.amazonaws.com/dev/auth", {
  body: JSON.stringify({
    encryptedPassword
  }),
  method: "POST",
  headers: {
    'Access-Control-Allow-Origin': '*',
  }
}).then(res => console.log(res.json()));
