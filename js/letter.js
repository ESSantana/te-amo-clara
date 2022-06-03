function sendToHomePage() {
  const baseURL = window.location.href.replace(/\/pages\/.+\.html.+/gi, "");
  console.log(baseURL);
  window.location.href = baseURL + "/index.html";
}

async function fillHTML() {
  const encryptedPassword = checkQueryParameter();
  const token = await getToken(encryptedPassword);
  const { cloudFrontLink, textComplement } = await getTargetResources(token);
  
  const paragraphes = document.getElementsByClassName("paragraph");
  for (let i = 0; i < paragraphes.length; i++) {
    paragraphes[i].innerHTML = textComplement[`paragraph${i + 1}`];
  }

  const centerDiv = document.getElementsByClassName("center")[0];
  centerDiv.style.display = "flex";
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

  if (encryptedPassword === undefined) {
    sendToHomePage();
  }

  return encryptedPassword;
}

async function getToken(encryptedPassword) {
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
  const { token } = await response.json();
  return token;
}

async function getTargetResources(token) {
  const response = await fetch(
    "https://vyqcqyrsad.execute-api.sa-east-1.amazonaws.com/dev/cloudfront",
    {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "euteamoclara.com.br",
        origin: "euteamoclara.com.br",
        mode: "cors",
        Authorization: token,
      },
    }
  );

  const parsedResponse = await response.json();
  return {
    ...parsedResponse,
  };
}
