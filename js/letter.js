function sendToHomePage() {
  const baseURL = window.location.href.replace(/\/pages\/.+\.html.+/gi, "");
  console.log(baseURL);
  // window.location.href = baseURL + "/index.html";
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

  const encryptedPassword = queryParams.find(
    (qParam) => qParam.key === "password"
  ).value;

  if (encryptedPassword && encryptedPassword.length !== 43) {
    sendToHomePage();
  }

  return encryptedPassword;
}

async function getToken() {
  const encryptedPassword = checkQueryParameter();
  const response = await fetch(
    "https://vyqcqyrsad.execute-api.sa-east-1.amazonaws.com/dev/auth",
    {
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
    }
  );
  const { token, message } = await response.json();

  if (message && message === "Senha totalmente errada meu nobre") {
    sendToHomePage();
    return;
  }

  const centerDiv = document.getElementsByClassName("center")[0];
  centerDiv.style.display = "flex";
  console.log({ token });
}

async function playMusic() {
  let audioPlayer = document.createElement("audio");
  const body = document.getElementsByTagName("body")[0];
  audioPlayer.src = "assets/music/bg-music.mp3";
  audioPlayer.volume = 0.4;
  audioPlayer.loop = true;
  body.appendChild(audioPlayer);
  audioPlayer.load();
  audioPlayer.play();
}
