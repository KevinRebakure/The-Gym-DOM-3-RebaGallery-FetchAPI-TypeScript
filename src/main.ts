const generate = document.getElementById("generate");
const cards = document.getElementById("cards");
const month = document.getElementById("month");
const day = document.getElementById("day");
const year = document.getElementById("year");
const exp = document.getElementById("exp");

const fullDate = new Date();
const date = fullDate.getDate().toString();
const prefix: { [key: string]: string } = {
  "1": "st",
  "2": "nd",
  "3": "rd",
  "21": "st",
  "22": "nd",
  "23": "rd",
  "31": "st",
};

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

year!.innerText = fullDate.getFullYear().toString();
month!.innerText = months[fullDate.getMonth()];
day!.innerText = date;

if (Object.keys(prefix).includes(date)) {
  exp!.innerText = prefix[date];
} else {
  exp!.innerText = "th";
}

let page = 1;
async function generateGallery() {
  // Request
  const response = await fetch(
    `https://picsum.photos/v2/list?page=${page}&limit=100`,
  );
  const data = await response.json();
  const randomOrder = data.sort(() => 0.5 - Math.random());
  page++;
  // console.log(page);

  // Populate the UI
  const images = randomOrder.map((image: any) => {
    const img = document.createElement("img");
    img.src = image.download_url;
    // img.className = "w-full aspect-square object-cover rounded-full";
    img.className = "w-full aspect-square object-cover rounded-2xl";
    // img.className = "w-full aspect-square object-cover";
    img.alt = "Couldn't display😭";
    return img.outerHTML;
  });

  cards!.innerHTML = images.join("");
}

generate?.addEventListener("click", generateGallery);
