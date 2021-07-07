const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

const today = new Date();
let futureDate = new Date();

futureDate.setDate(today.getDate() + 10);

const year = futureDate.getFullYear();
const month = months[futureDate.getMonth()];
const hour = futureDate.getHours();
const minute = futureDate.getMinutes();
const date = futureDate.getDate();
const weekDay = weekdays[futureDate.getDay()];

giveaway.textContent = `giveaway ends on ${weekDay}, ${month} ${date} ${year}, ${hour}:${minute}${hour < 13 ? 'am' : 'pm'}`;

function getRemainingTime() {
  const t = futureDate.getTime() - new Date().getTime();

  const oneSecond = 1000;
  const oneMinute = oneSecond * 60;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;

  const days = Math.floor(t / oneDay);
  const hours = Math.floor((t % oneDay) / oneHour);
  const minutes = Math.floor((t % oneHour) / oneMinute);
  const seconds = Math.floor((t % oneMinute) / oneSecond);

  const values = [days, hours, minutes, seconds];

  items.forEach(function (item, index) {
    item.innerHTML = format(values[index]);
  });

  if (t < 0) {
    clearInterval(countDown);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired</h4>`;
  }
}

function format(item) {
  return item < 10 ? `0${item}` : item;
}

let countDown = setInterval(getRemainingTime, 1000);

getRemainingTime();
