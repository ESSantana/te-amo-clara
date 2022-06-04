function sendToHomePage() {
  const baseURL = window.location.href.replace(/\/pages\/.+\.html.+/gi, "");
  console.log(baseURL);
  window.location.href = baseURL + "/index.html";
}

async function fillHTML() {
  const encryptedPassword = checkQueryParameter();
  const token = await getToken(encryptedPassword);
  const { cloudFrontLink, textComplement } = await getTargetResources(token);

  fillImages(cloudFrontLink);
  fillComposition(cloudFrontLink);
  fillText(textComplement);
  fillVideos(cloudFrontLink);
  startMusic(cloudFrontLink);

  const centerDiv = document.getElementsByClassName("center")[0];
  centerDiv.style.display = "flex";
}

function fillImages(cloudFrontLink) {
  const images = document.getElementsByClassName("photos");
  for (let i = 0; i < images.length; i++) {
    images[i].src = `https://${cloudFrontLink}/${[`photo-${i + 1}`]}.jpg`;
    images[i].setAttribute("alt", `photo-${i + 1}`);
  }
}

function fillText(textComplement) {
  const paragraphes = document.getElementsByClassName("paragraph");
  for (let i = 0; i < paragraphes.length; i++) {
    paragraphes[i].innerHTML = textComplement[`paragraph${i + 1}`];
  }
}

function fillVideos(cloudFrontLink) {
  const videos = document.getElementsByClassName("video");
  for (let i = 0; i < videos.length; i++) {
    const sourceNode = document.createElement("source");
    sourceNode.src = `https://${cloudFrontLink}/video-${i + 1}.mp4`;
    sourceNode.type = "video/mp4";
    videos[i].appendChild(sourceNode);
  }
}

function fillComposition(cloudFrontLink) {
  const composition = document.getElementById("composition");
  composition.src = `https://${cloudFrontLink}/composition-1.png`;
  composition.setAttribute("alt", "composition-1");
}

function startMusic(cloudFrontLink) {
  const music = document.getElementById("bg-music");
  const sourceNode = document.createElement("source");
  sourceNode.src = `https://${cloudFrontLink}/bg-music.mp3`;
  sourceNode.setAttribute("type", "audio/mpeg");
  music.appendChild(sourceNode);  
}

function checkQueryParameter() {
  if (!window.location.href.includes("?password")) {
    sendToHomePage();
  }

  var queryParams = window.location.href
    .split("?")[1]
    .split("&")
    .map((param) => {
      const keyValue = param.split("=");
      return {
        key: keyValue[0],
        value: keyValue[1],
      };
    });

  const encryptedPassword = queryParams.find((qParam) => qParam.key === "password").value;

  if (encryptedPassword === undefined) {
    sendToHomePage();
  }

  return encryptedPassword;
}

async function getToken(encryptedPassword) {
  const response = await fetch("https://vyqcqyrsad.execute-api.sa-east-1.amazonaws.com/dev/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "euteamoclara.com.br",
      origin: "euteamoclara.com.br",
      mode: "cors",
    },
    body: JSON.stringify({
      encryptedPassword,
    }),
  });
  const { token } = await response.json();
  return token;
}

async function getTargetResources(token) {
  const response = await fetch("https://vyqcqyrsad.execute-api.sa-east-1.amazonaws.com/dev/cloudfront", {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "euteamoclara.com.br",
      origin: "euteamoclara.com.br",
      mode: "cors",
      Authorization: token,
    },
  });

  const parsedResponse = await response.json();
  return {
    ...parsedResponse,
  };
}
