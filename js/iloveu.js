function getMonkeyPhoto() {
  const cloudfront = localStorage.getItem("cloudfront");
  const img = document.getElementById("monkey-smile");
  img.src = `https://${cloudfront}/monkey-smile.jpg`;

  const centerDiv = document.getElementsByClassName("center")[0];
  centerDiv.style.display = "flex";
}
