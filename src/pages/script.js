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
            await navigator.clipboard.writeText(
                `${shareData.text} ${shareData.url}`,
            );

            // Show temporary feedback
            const button =
                event.target.closest(".share-button") ||
                event.target.closest(".share-button-primary");
            const originalText = button.innerHTML;
            button.innerHTML =
                "<span>✅ Copied to clipboard!</span>";

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
});