document.getElementById("contactForm").addEventListener("submit", function(event){
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Capture form data
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const mobile = document.getElementById("mobile").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Send the form data to the backend using Fetch API
    fetch("/api/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            mobile: mobile,
            email: email,
            message: message
        })
    })
    .then(response => response.json())
    .then(data => {
        // Display success message
        var successMessage = document.getElementById("successMessage");
        successMessage.textContent = "We have received your message and will respond to you as soon as possible.";
        successMessage.style.display = "block"; // Show the success message
        document.getElementById("contactForm").reset(); // Reset the form
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
