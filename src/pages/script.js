// @ts-nocheck
// function submitForm(e) {
//     e.preventDefault();
//     const form = e.target;
//     const formData = new FormData(form);

//     // Show loading state
//     const button = form.querySelector(".submit-button");
//     const responseDiv = document.getElementById("form-response");

//     if (!button || !responseDiv) return;

//     const originalText = button.textContent;
//     button.textContent = "Sending...";
//     button.disabled = true;

//     fetch("/", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: new URLSearchParams(formData).toString(),
//     })
//         .then(() => {
//             // Hide the signup section and show success section
//             document.getElementById(
//                 "signup-section",
//             ).style.display = "none";
//             document.getElementById(
//                 "success-section",
//             ).style.display = "block";

//             // Clear any error messages
//             responseDiv.innerHTML = "";

//             document
//                 .querySelector(".share-button-primary")
//                 ?.addEventListener("click", shareContent);
//         })
//         .catch((error) => {
//             responseDiv.innerHTML =
//                 "<p class='error-message'>Oops! Something went wrong. Try again later.</p>";
//         })
//         .finally(() => {
//             button.textContent = originalText;
//             button.disabled = false;
//         });
// }

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
  // document
  //     .querySelector(".signup-form")
  //     ?.addEventListener("submit", submitForm);

  document
    .querySelector(".share-button")
    ?.addEventListener("click", shareContent);

  // 🌱 Grab your endpoint's submission URL
  const url = `https://api.submitjson.com/v1/submit/vJX28qdg5`;

  // Debug: Let's see what import.meta.env contains

  const apiKey = import.meta.env.PUBLIC_SUBMIT_JSON_API_KEY;

  document
    .getElementById("contactForm")
    .addEventListener("submit", async function (e) {
      e.preventDefault();
      try {
        const email = document.getElementById("email-id").value;
        console.log("email", email);
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "X-API-Key": apiKey,
          },
          body: JSON.stringify({
            data: {
              email,
            },
          }),
        });

        const submission = await response.json();
        console.log("📦 Submission response:", submission);

        // {
        //     "createdAt": "2025-06-24T23:22:58.306Z",
        //     "data": {
        //         "email": "seraphim.codes@gmail.com"
        //     },
        //     "emailNotification": false,
        //     "emailTo": "seraphim.codes@gmail.com",
        //     "emailStatus": null,
        //     "emailSubject": "langmate {cc4b2f80}",
        //     "emailReplyTo": null,
        //     "emailFromName": "Submit JSON",
        //     "emailBranding": true,
        //     "endpointId": "a0b9cbd9-92a6-42bf-86c8-1d9f55be6f89",
        //     "endpointName": "langmate",
        //     "endpointSlug": "vJX28qdg5",
        //     "projectId": "e5f466b9-b6cf-4ade-9ad2-a27f6cb30d1c",
        //     "securityCaptcha": null,
        //     "securityCors": false,
        //     "securityHoneypot": false,
        //     "seenAt": null,
        //     "submissionFormat": "pretty",
        //     "submissionId": "cc4b2f80-b82d-42de-943c-a58ac4e8e95f",
        //     "submissionSound": "none",
        //     "userId": "e2b42cc9-89c1-4b31-875f-d30cc39cef35",
        //     "uniqueKey": null,
        //     "slackChannel": null,
        //     "slackStatus": null,
        //     "discordChannel": null,
        //     "discordStatus": null,
        //     "zapierStatus": null,
        //     "webhookStatus": null,
        //     "telegramStatus": null,
        //     "telegramName": null
        // }

        console.log("📦 Submission response:", submission);

        // Hide signup section and show success section
        document.getElementById("signup-section").style.display = "none";
        document.getElementById("success-section").style.display = "block";
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    });
});
