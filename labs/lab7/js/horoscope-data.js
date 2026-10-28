var sign = "Sagittarius"
var month = "December"
var day = 13
var lucky_num = 13.0
var description = "A Sagittarius is an adventurous, free-spirited, and brutally honest fire sign represented by the Archer who constantly seeks new knowledge, experiences, and personal growth."
var believe = false

var myMood = 4
var partner1_mood = 3.5
var partner2_mood = 4.5
var averageMood = (myMood + partner1_mood + partner2_mood) / 3

var signs = [ "Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"];
var descriptions = [
	"Today is a day for new beginnings. Embrace change and seize opportunities.",
	"Your determination will lead to success today. Stay focused on your goals.",
	"Communication is key today. Express yourself clearly and listen to others.",
	"Trust your intuition. It will guide you in making the right decisions.",
	"Your creativity shines today. Use it to inspire and lead others.",
	"Pay attention to the details. Your meticulous work will pay off.",
	"Balance is essential. Find harmony in all aspects of your life.",
	"Embrace transformation. Let go of what no longer serves you.",
	"Adventure awaits. Explore new horizons and expand your horizons.",
	"Hard work leads to success. Keep pushing toward your goals.",
	"Your unique perspective is an asset. Share your ideas with others.",
	"Trust your emotions. They will guide you in making the right choices."
]

var chosenDesc = descriptions[3]
var partner1_Desc = descriptions[6]
var partner2_Desc = descriptions[1]

const mySignHeading = document.querySelector('#sign');
mySignHeading.textContent = sign;
const birthdayHeading = document.querySelector('.birthday');
birthdayHeading.textContent += ` ${month} ${day}`;
const luckyNumberHeading = document.querySelector('.luckyNum');
luckyNumberHeading.textContent += ` ${lucky_num}`;

const allParagraphs = document.querySelectorAll('p');
allParagraphs[0].textContent = description;
allParagraphs[1].innerHTML += ` <strong>${believe}</strong>`;
allParagraphs[2].innerHTML = `Today's mood rating for ${sign}: ${myMood} out of 5. The average mood rating of ${sign}, Sagittarius, and Sagittarius is: ${averageMood}`

const mySign = document.querySelector('#our-signs');
mySign.textContent += `All members of my groups signs are: ${signs[11]}`;


const devinDesc = document.querySelector('#DevinDesc');
devinDesc.textContent = `Devin Horoscope: ${chosenDesc}`;
const partner1Desc = document.querySelector('[id="1_Desc"]');
partner1Desc.textContent = `Adrians Horoscope: ${partner1_Desc}`;
const partner2Desc = document.querySelector('[id="2_Desc"]');
partner2Desc.textContent = `Mustaan Horoscope: ${partner2_Desc}`;