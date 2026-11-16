/*
Name: Devin Castillo
Date: 11/15/2026
Description: This file has the scripts for trainer
recomendations and searching for trainers, including the functions for both
*/


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
const trainerSearchInput = document.querySelector("#trainer-search");
const trainerSearchStatus = document.querySelector("#trainer-search-status");
const trainerCards = document.querySelectorAll(".trainer-card");


function isValidBudget(rawBudget, budget) {
    if (rawBudget === "") {
        return false;
    }

    if (!Number.isFinite(budget)) {
        return false;
    }

    if (budget < 0) {
        return false;
    }
    return true;
}


function getAffordableTrainers(trainerList, budget) {
    const affordableTrainers = [];

    for (let i = 0; i < trainerList.length; i += 1) {
        if (trainerList[i].price <= budget) {
            affordableTrainers.push(trainerList[i]);
        }
    }

    return affordableTrainers;
}

function getRecommendation(trainerList, goal, budget, affordableTrainers) {
    if (trainerList.length === 0) {
        return null;
    }

    const matchingTrainer = trainerList.find(function (trainer) {
        return trainer.goal === goal;
    }) || trainerList[0];
    const hasGoalMatch = matchingTrainer.goal === goal;

    if (hasGoalMatch && matchingTrainer.price <= budget) {
        return {
            trainer: matchingTrainer,
            reason: `${matchingTrainer.specialty} specialty matches your goal and fits your budget.`
        };
    }

    if (affordableTrainers.length > 0) {
        const lowestPricedTrainer = affordableTrainers.reduce(function (lowest, trainer) {
            return trainer.price < lowest.price ? trainer : lowest;
        });
        return {
            trainer: lowestPricedTrainer,
            reason: `${matchingTrainer.name} specializes in your goal but is over budget, so this is the lowest-priced trainer you can afford.`
        };
    }

    return {
        trainer: matchingTrainer,
        reason: `No trainer is within your budget. ${matchingTrainer.name} is the closest specialty match at $${matchingTrainer.price}/hour.`
    };
}

function findAffordableTrainers(listElement, affordableTrainers) {
    listElement.replaceChildren();

    for (let i = 0; i < affordableTrainers.length; i += 1) {
        const trainer = affordableTrainers[i];
        const trainerItem = document.createElement("li");
        trainerItem.textContent = trainer.name + " - " + trainer.specialty + ", $" + trainer.price + "/hour";
        listElement.appendChild(trainerItem);
    }
}

function updateRecommendation() {
    const rawBudget = budgetInput.value;
    const budget = Number(rawBudget);

    if (!isValidBudget(rawBudget, budget)) {
        result.textContent = "Enter a valid hourly budget to see a recommendation.";
        reason.textContent = "";
        findAffordableTrainers(affordableList, []);
        updateTrainerCards("");
        return;
    }

    const affordableTrainers = getAffordableTrainers(trainers, budget);
    findAffordableTrainers(affordableList, affordableTrainers);

    const recommendation = getRecommendation(trainers, goalInput.value, budget, affordableTrainers);
    if (recommendation === null) {
        result.textContent = "No trainers are available.";
        reason.textContent = "";
        updateTrainerCards("");
        return;
    }

    result.textContent = `We recommend ${recommendation.trainer.name} (${recommendation.trainer.specialty})`;
    reason.textContent = `${recommendation.reason} Located in ${recommendation.trainer.location}; $${recommendation.trainer.price}/hour.`;
    updateTrainerCards(recommendation.trainer.name);
}

function updateTrainerCards(recommendedName) {
    for (let i = 0; i < trainerCards.length; i += 1) {
        const card = trainerCards[i];
        const trainerName = card.dataset.trainer;
        const statusText = card.querySelector(".trainer-card-status");

        if (trainerName === recommendedName) {
            card.classList.add("recommended-trainer");
            statusText.textContent = "Recommended match";
        } else {
            card.classList.remove("recommended-trainer");
            statusText.textContent = "";
        }
    }
}

function searchTrainers(trainerList, searchTerm) {
    const searchText = searchTerm.trim().toLowerCase();
    const matches = [];

    for (let index = 0; index < trainerList.length; index += 1) {
        const trainer = trainerList[index];
        const trainerInfo = `${trainer.name} ${trainer.specialty} ${trainer.location}`.toLowerCase();

        if (trainerInfo.includes(searchText)) {
            matches.push(trainer);
        }
    }

    return matches;
}

function updateTrainerSearch() {
    const matches = searchTrainers(trainers, trainerSearchInput.value);

    for (let cardIndex = 0; cardIndex < trainerCards.length; cardIndex += 1) {
        const card = trainerCards[cardIndex];
        let isMatch = false;

        for (let trainerIndex = 0; trainerIndex < matches.length; trainerIndex += 1) {
            if (matches[trainerIndex].name === card.dataset.trainer) {
                isMatch = true;
                break;
            }
        }

        card.hidden = !isMatch;
    }

    if (matches.length === 1) {
        trainerSearchStatus.textContent = "1 trainer found.";
    } else {
        trainerSearchStatus.textContent = matches.length + " trainers found.";
    }
}

goalInput.addEventListener("change", updateRecommendation);
budgetInput.addEventListener("input", updateRecommendation);
trainerSearchInput.addEventListener("input", updateTrainerSearch);
updateRecommendation();
updateTrainerSearch();
