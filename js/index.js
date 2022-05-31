const checkPassword = (event) => {
  if (event !== "teste") return;
  const encrypt = CryptoJS.AES.encrypt(event, "grinch").toString();
  console.log(encrypt)
  const urlParts = window.location.href.split("/");
  const baseURL = urlParts.slice(0, urlParts.length - 1).join("/");
  window.location.href = baseURL + `/html/letter.html?password=${encrypt}`;
} 