document.getElementById("check")?.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      let url = tabs[0].url;
  
      fetch("https://hidden-lake-53605-5b1c8db9e79b.herokuapp.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url }),
      })
        .then((response) => response.json())
        .then((data) => {
          let resultText = data.prediction === "Phishing" ? "Risky" : "Safe";
          let resultElement = document.getElementById("result");
          let iconElement = document.getElementById("icon");
          let bodyElement = document.body;
  
          
          resultElement.textContent = resultText;
          resultElement.className = resultText === "Risky" ? "phishing" : "safe";
  
          
          if (resultText === "Risky") {
            iconElement.src = "warning.png"; 
            iconElement.style.display = "block"; 
            bodyElement.style.border = "3px solid red"; 
          } else {
            iconElement.src = "shield.png"; 
            iconElement.style.display = "block"; 
            bodyElement.style.border = "3px solid rgb(9, 244, 56)"; 
          }
        })
        .catch((error) => console.error("Error:", error));
    });
  });
  
  document.getElementById("info")?.addEventListener("click", function () {
    window.location.href = "info.html";
  });
  
  if (window.location.pathname.endsWith("info.html")) {
    document.getElementById("back")?.addEventListener("click", function () {
      window.location.href = "popup.html";
    });
  }