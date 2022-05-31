const checkPassword = (event) => {
  if (event.length < 5) return;
  const encrypt = CryptoJS.AES.encrypt(event, "grinch").toString();
  const urlParts = window.location.href.split("/");
  const baseURL = urlParts.slice(0, urlParts.length - 1).join("/");
  window.location.href = baseURL + `/pages/letter.html?password=${encrypt}`;
} 