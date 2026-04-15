async function analyzeWebsite() {
  const url = document.getElementById("urlInput").value;
  const results = document.getElementById("results");

  if (!url) {
    results.innerHTML = "Please enter a URL";
    return;
  }

  results.innerHTML = "Analyzing...";

  try {
    const response = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
    );

    const data = await response.json();
    const html = data.contents.toLowerCase();

    let tech = [];

    // 🔍 Detect technologies from HTML
    if (html.includes("wp-content")) {
      tech.push("WordPress");
    }

    if (html.includes("shopify")) {
      tech.push("Shopify");
    }

    if (html.includes("react")) {
      tech.push("React");
    }

    if (html.includes("google-analytics")) {
      tech.push("Google Analytics");
    }

    if (html.includes("gtag")) {
      tech.push("Google Tag Manager");
    }

    if (tech.length === 0) {
      tech.push("No clear technologies detected");
    }

    results.innerHTML = `
            <h3>Detected Technologies:</h3>
            <ul>
                ${tech.map((t) => `<li>${t}</li>`).join("")}
            </ul>
        `;
  } catch (error) {
    results.innerHTML = "Error analyzing website.";
    console.error(error);
  }
}
