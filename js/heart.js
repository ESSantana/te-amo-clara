window.onload = () => {
  const a = document.getElementById("heart-box");
  for (let i = 0; i < 170; i++) {
    const divHeart = document.createElement("div");
    divHeart.setAttribute("class", "heart");
    a.appendChild(divHeart);
  }
};
