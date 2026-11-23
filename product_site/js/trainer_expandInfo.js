/*
Name: Devin Castillo
Date: 11/22/2026
Description: Expands trainer profiles and provides feedback for the trainer selection form
*/

const trainerDetails = {
    "Jessica Wilson": {
        description: "Jessica helps clients build practical strength with training plans tailored to their experience and goals.",
        specialties: ["Strength Training", "Progressive overload", "Beginner-friendly programs"],
        reviews: [
            { username: "JasonDuvallll_6", review: "Jessica made strength training easy to understand and helped me stay consistent.", rating: 5 },
            { username: "_LuciaCaminos_", review: "Great coaching and clear guidance on improving my form.", rating: 4 }
        ]
    },
    "Michael Harris": {
        description: "Michael creates structured muscle-building programs and helps clients train with good technique.",
        specialties: ["Hypertrophy", "Resistance training", "Workout planning"],
        reviews: [
            { username: "Offical_SamSulek", review: "My workouts have a clear plan and I feel stronger every month.", rating: 5 },
            { username: "FlightReacts", review: "Helpful feedback and a solid plan for building muscle.", rating: 4 }
        ]
    },
    "Jake Thompson": {
        description: "Jake focuses on helping clients move comfortably and improve mobility for everyday activities and training.",
        specialties: ["Mobility", "Flexibility", "Movement fundamentals"],
        reviews: [
            { username: "ILoveTheGym596", review: "The mobility sessions helped me move better at the gym.", rating: 5 },
            { username: "Bulbasaur", review: "Patient coaching with stretches I can use in my daily routine.", rating: 4 }
        ]
    },
    "William Davis": {
        description: "William offers practical nutrition coaching to help clients build sustainable eating habits around their goals.",
        specialties: ["Nutrition", "Meal planning", "Healthy habits"],
        reviews: [
            { username: "Ryan_thelifter", review: "The advice was realistic and easy to fit into my schedule.", rating: 5 },
            { username: "AlexP700", review: "I learned how to plan balanced meals without overcomplicating things.", rating: 4 }
        ]
    }
};

function createTrainerDetails(trainerName, detailsContainer) {
    const details = trainerDetails[trainerName];
    if (!details) {
        return;
    }

    const aboutHeading = document.createElement("h4");
    aboutHeading.textContent = "About " + trainerName;

    const aboutText = document.createElement("p");
    aboutText.textContent = details.description;

    const specialtiesHeading = document.createElement("h4");
    specialtiesHeading.textContent = "Specialties";

    const specialtiesList = document.createElement("ul");
    for (let i = 0; i < details.specialties.length; i++) {
        const specialtyItem = document.createElement("li");
        specialtyItem.textContent = details.specialties[i];
        specialtiesList.appendChild(specialtyItem);
    }

    const reviewsHeading = document.createElement("h4");
    reviewsHeading.textContent = "Reviews";

    let totalRating = 0;
    for (let i = 0; i < details.reviews.length; i++) {
        totalRating = totalRating + details.reviews[i].rating;
    }

    const averageRating = totalRating / details.reviews.length;
    const averageRatingText = document.createElement("p");
    averageRatingText.textContent = "Average rating: " + averageRating.toFixed(1) + "/5";

    const reviewsList = document.createElement("ul");
    for (let i = 0; i < details.reviews.length; i++) {
        const review = details.reviews[i];
        const reviewItem = document.createElement("li");
        const stars = document.createElement("span");

        let filledStars = "";
        let emptyStars = "";
        for (let star = 0; star < review.rating; star++) {
            filledStars = filledStars + "★";
        }
        for (let star = review.rating; star < 5; star++) {
            emptyStars = emptyStars + "☆";
        }

        stars.textContent = filledStars + emptyStars;
        stars.setAttribute("role", "img");
        stars.setAttribute("aria-label", review.rating + " out of 5 stars");

        reviewItem.appendChild(document.createTextNode(review.username + " "));
        reviewItem.appendChild(stars);
        reviewItem.appendChild(document.createTextNode(": " + review.review));

        reviewsList.appendChild(reviewItem);
    }

    detailsContainer.appendChild(aboutHeading);
    detailsContainer.appendChild(aboutText);
    detailsContainer.appendChild(specialtiesHeading);
    detailsContainer.appendChild(specialtiesList);
    detailsContainer.appendChild(reviewsHeading);
    detailsContainer.appendChild(averageRatingText);
    detailsContainer.appendChild(reviewsList);
}

document.querySelectorAll(".trainer-info-toggle").forEach(function (button) {
    button.addEventListener("click", function () {
        const detailsContainer = document.getElementById(button.getAttribute("aria-controls"));
        const isExpanded = button.getAttribute("aria-expanded") === "true";

        if (isExpanded) {
            detailsContainer.hidden = true;
            button.setAttribute("aria-expanded", "false");
            button.textContent = "Read More";
            return;
        }

        const card = button.closest(".trainer-card");
        detailsContainer.replaceChildren();
        createTrainerDetails(card.dataset.trainer, detailsContainer);
        detailsContainer.hidden = false;
        button.setAttribute("aria-expanded", "true");
        button.textContent = "Show Less";
    });
});

const trainerForm = document.getElementById("trainer-selection-form");
const nameInput = document.getElementById("user_name");
const selectionGoalInput = document.getElementById("goal");
const trainerFormStatus = document.getElementById("trainer-form-status");

function validateTextInput(input, feedback, label) {
    const isValid = input.value.trim().length >= 2;
    input.setAttribute("aria-invalid", String(!isValid));
    feedback.textContent = isValid ? "" : `${label} must contain at least 2 characters and cannot be blank.`;
    return isValid;
}

function addTextInputFeedback(input, feedback, label) {
    input.addEventListener("focus", function () {
        feedback.textContent = `Enter at least 2 characters for ${label}.`;
    });

    input.addEventListener("blur", function () {
        validateTextInput(input, feedback, label);
    });
}

addTextInputFeedback(nameInput, document.getElementById("user-name-feedback"), "your name");
addTextInputFeedback(selectionGoalInput, document.getElementById("goal-feedback"), "your goal");

trainerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const isNameValid = validateTextInput(
        nameInput,
        document.getElementById("user-name-feedback"),
        "Your name"
    );
    const isGoalValid = validateTextInput(
        selectionGoalInput,
        document.getElementById("goal-feedback"),
        "Your goal"
    );
    const hasTrainer = trainerForm.querySelector('input[name="trainer"]:checked') !== null;

    if (!hasTrainer) {
        trainerFormStatus.textContent = "Please choose a trainer before submitting";
        return;
    }
    if (!isNameValid || !isGoalValid) {
        trainerFormStatus.textContent = "Please correct the highlighted fields before submitting";
        return;
    }

    trainerFormStatus.textContent = "Your responses were submitted successfully!";
});