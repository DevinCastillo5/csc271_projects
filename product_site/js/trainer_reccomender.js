const trainers = [
    { name: "Jessica Wilson", goal: "strength", specialty: "Strength Training", location: "New York, NY", price: 50 },
    { name: "Michael Harris", goal: "hypertrophy", specialty: "Hypertrophy", location: "Columbus, OH", price: 40 },
    { name: "Jake Thompson", goal: "mobility", specialty: "Mobility", location: "Chicago, IL", price: 45 },
    { name: "William Davis", goal: "nutrition", specialty: "Nutrition", location: "Boston, MA", price: 60 }
];

const goalInput = document.querySelector("#fitness-goal");
const budgetInput = document.querySelector("#hourly-budget");
const result = document.querySelector("#recommendation-result");
const reason = document.querySelector("#recommendation-reason");
const affordableList = document.querySelector("#affordable-trainers");
const trainerCards = document.querySelectorAll(".trainer-card");

function updateRecommendation() {
    const goal = goalInput.value;
    const budget = Number(budgetInput.value);

    if (budgetInput.value === "" || !Number.isFinite(budget) || budget < 0) {
        result.textContent = "Enter a valid hourly budget to see a recommendation.";
        reason.textContent = "";
        affordableList.replaceChildren();
        updateTrainerCards("");
        return;
    }

    const matchingTrainer = trainers.find(function (trainer) {
        return trainer.goal === goal;
    }) || trainers[0];
    let bestAffordableTrainer = null;
    let trainerIndex = 0;

    // this while loop lists every trainer within budget and tracks the lowest-cost option,
    // it stops when the trainer data has been checked once from beginning to end
    affordableList.replaceChildren();
    while (trainerIndex < trainers.length) {
        const trainer = trainers[trainerIndex];
        if (trainer.price <= budget) {
            const trainerItem = document.createElement("li");
            trainerItem.textContent = `${trainer.name} - ${trainer.specialty}, $${trainer.price}/hour`;
            affordableList.appendChild(trainerItem);

            if (bestAffordableTrainer === null || trainer.price < bestAffordableTrainer.price) {
                bestAffordableTrainer = trainer;
            }
        }
        trainerIndex += 1;
    }

    let recommendedTrainer;
    let recommendationReason;

    if (goal === "strength" && budget >= trainers[0].price) {
        recommendedTrainer = trainers[0];
        recommendationReason = "Their strength-training specialty matches your goal and fits your budget.";
    } else if (goal === "hypertrophy" && budget >= trainers[1].price) {
        recommendedTrainer = trainers[1];
        recommendationReason = "Their hypertrophy specialty matches your muscle-building goal and fits your budget.";
    } else if (goal === "mobility" && budget >= trainers[2].price) {
        recommendedTrainer = trainers[2];
        recommendationReason = "Their mobility specialty matches your goal and fits your budget.";
    } else if (goal === "nutrition" && budget >= trainers[3].price) {
        recommendedTrainer = trainers[3];
        recommendationReason = "Their nutrition specialty matches your goal and fits your budget.";
    } else if (bestAffordableTrainer !== null) {
        recommendedTrainer = bestAffordableTrainer;
        recommendationReason = `${matchingTrainer.name} specializes in your goal but is over budget, so this is the lowest-priced trainer you can afford.`;
    } else {
        recommendedTrainer = matchingTrainer;
        recommendationReason = `No trainer is within your budget. ${matchingTrainer.name} is the closest specialty match at $${matchingTrainer.price}/hour.`;
    }

    result.textContent = `We recommend ${recommendedTrainer.name} (${recommendedTrainer.specialty})`;
    reason.textContent = `${recommendationReason} Located in ${recommendedTrainer.location}; $${recommendedTrainer.price}/hour.`;
    updateTrainerCards(recommendedTrainer.name);
}

function updateTrainerCards(recommendedName) {
    // the for loop visits each Nodelist item by index to apply the same recommendation highlight
    if (trainerCards.length > 0) {
        for (let index = 0; index < trainerCards.length; index += 1) {
            const card = trainerCards[index];
            const isRecommended = card.dataset.trainer === recommendedName;
            card.classList.toggle("recommended-trainer", isRecommended);
            card.querySelector(".trainer-card-status").textContent = isRecommended ? "Recommended match" : "";
        }
    }
}

goalInput.addEventListener("change", updateRecommendation);
budgetInput.addEventListener("input", updateRecommendation);
updateRecommendation();