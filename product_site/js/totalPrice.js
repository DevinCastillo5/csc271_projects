/*
Name: Devin Castillo
Date: 11/1/2026
Description: This is a script that calculates the total monthly cost of a personal trainer
based on the number of hours per session and sessions per month
*/


const hoursInput = document.getElementById("hours-per-session");
const sessionsInput = document.getElementById("sessions-per-month");
const totalOutput = document.getElementById("monthly-total");
const summaryOutput = document.getElementById("calculation-summary");
const trainerName = document.getElementsByClassName("trainer-name")[0].textContent.trim();
const hourlyPrice = document.querySelector(".trainer-hourly-price");
const calculatorForm = document.getElementsByTagName("form")[0];
const hourlyRate = Number(hourlyPrice.dataset.hourlyRate);

// used ai to find a way to help me with formatting my prices
const priceFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

hourlyPrice.textContent = `${priceFormatter.format(hourlyRate)}/hour`;

function updateMonthlyTotal() {
    const hours = Number(hoursInput.value);
    const sessions = Number(sessionsInput.value);

    // checking if the inputs are valid
    if (!hours || !sessions || hours < 0 || sessions < 0) {
        totalOutput.textContent = "—";
        summaryOutput.textContent = "Enter a positive number of hours and sessions to see your estimate.";
        return;
    }

    // get the monthly cost after getting all the information
    const total = priceFormatter.format(hourlyRate * hours * sessions);
    totalOutput.textContent = total;
    summaryOutput.innerHTML =
        `<strong>${hours}</strong> hour(s) per session × ` +
        `<strong>${sessions}</strong> sessions per month × ` +
        `<strong>${priceFormatter.format(hourlyRate)}</strong>/hour with ` +
        `<em>${trainerName}</em> comes to ${total} per month.`;
}

calculatorForm.addEventListener("input", updateMonthlyTotal);
updateMonthlyTotal();