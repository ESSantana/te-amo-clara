if (!window.location.href.includes("password")) {
  const urlParts = window.location.href.split("/");
  const baseURL = urlParts.slice(0, urlParts.length - 2).join("/");
  window.location.href = baseURL + "/index.html";
}

var passwordEncrypted = window.location.href.split("?")[1].split("=")[1];
var password = CryptoJS.AES.decrypt(passwordEncrypted, "grinch").toString(CryptoJS.enc.Utf8);

if (password !== "teste") {
  const urlParts = window.location.href.split("/");
  const baseURL = urlParts.slice(0, urlParts.length - 2).join("/");
  window.location.href = baseURL + "/index.html";
}