
import SubmitJSON from "submitjson";

// Share functionality
async function shareContent() {
  const shareData = {
    title: "Langmate - Practice Languages with Native Speakers",
    text: "Check out Langmate! Practice languages through structured video sessions with native speakers.",
    url: window.location.href,
  };

  try {
    // Try Web Share API first (mobile-friendly)
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);

      // Show temporary feedback
      const button =
        event.target.closest(".share-button") ||
        event.target.closest(".share-button-primary");
      const originalText = button.innerHTML;
      button.innerHTML = "<span>✅ Copied to clipboard!</span>";

      setTimeout(() => {
        button.innerHTML = originalText;
      }, 2000);
    }
  } catch (error) {
    console.log("Share failed:", error);
  }
}

// Add event listener after DOM loads
document.addEventListener("DOMContentLoaded", () => {

  document
    .querySelector(".share-button")
    ?.addEventListener("click", shareContent);

  // 🌱 Grab your endpoint's submission URL
  // const url = `https://api.submitjson.com/v1/submit/vJX28qdg5`;

  // Debug: Let's see what import.meta.env contains

  const apiKey = import.meta.env.PUBLIC_SUBMIT_JSON_API_KEY;

  const sj = new SubmitJSON({ apiKey: apiKey, endpoint: "vJX28qdg5" });

  document
    .getElementById("contactForm")
    .addEventListener("submit", async function (e) {
      e.preventDefault();
      try {
        const formData = new FormData(this);
        await sj.submit(formData);
        // Hide signup section and show success section
        document.getElementById("signup-section").style.display = "none";
        document.getElementById("success-section").style.display = "block";
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    });
});
