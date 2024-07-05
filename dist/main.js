"use strict";
const generate = document.getElementById("generate");
const cards = document.getElementById("cards");
let page = 1;
async function generateGallery() {
    const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=100`);
    const data = await response.json();
    const randomOrder = data.sort(() => 0.5 - Math.random());
    page++;
    console.log(page);
    const images = randomOrder.map((image) => {
        const img = document.createElement("img");
        img.src = image.download_url;
        img.className = "w-full aspect-square";
        img.alt = "Couldn't display😭";
        return img.outerHTML;
    });
    cards.innerHTML = images.join("");
}
generate?.addEventListener("click", generateGallery);
