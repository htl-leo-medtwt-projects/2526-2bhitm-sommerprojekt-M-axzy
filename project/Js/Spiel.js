/* =========================
   ELEMENTS
========================= */

const grid = document.getElementById('grid-overlay');
const shopContainer = document.getElementById('shop-container');
const sellTab = document.querySelector('.shop-tabs img[alt="Verkaufen"]');
const sellScreen = document.getElementById('sell-screen');
const soldScreen = document.getElementById('sold-screen');
const neinBtn = document.getElementById('neinKaufen');
const jaBtn = document.getElementById('jaKaufen');
const zrkBtn = document.getElementById('zrk');
const spielflaeche = document.getElementById('spielflaeche');
const smellbar = document.getElementById('smellbar');
const inventory = document.getElementById('inventory');
const coinDisplay = document.getElementById('coin-count');
const locks = document.querySelectorAll(".asset-lock");

/* =========================
   GAME STATE
========================= */

let coins = 1000;
let shopLevel = 0;
let selectedItem = null;

let inventoryData = {};

/* =========================
   SHOP DATA 
========================= */

const shopData = {
    start: [
        { name: "bread", price: 0, sell: 80, growTime: 5000, img: "../Img/Shop/Start/bread.png" },
        { name: "strawberry", price: 0, sell: 60, growTime: 5000, img: "../Img/Shop/Start/strawberry.png" },
        { name: "chicken", price: 0, sell: 110, growTime: 5000, img: "../Img/Shop/Start/chicken.png" },
        { name: "carrot", price: 0, sell: 50, growTime: 5000, img: "../Img/Shop/Start/carrot.png" },
        { name: "potato", price: 0, sell: 55, growTime: 5000, img: "../Img/Shop/Start/potato.png" },
        { name: "wheat", price: 0, sell: 40, growTime: 5000, img: "../Img/Shop/Start/wheat.png" }
    ],

    stage1: [
        { name: "cheese", price: 100, sell: 160, img: "../Img/Shop/Stage1/cheese.png" },
        { name: "milk", price: 90, sell: 140, img: "../Img/Shop/Stage1/milk.png" },
        { name: "cleanmist", price: 120, sell: 0, img: "../Img/Shop/Stage1/cleanmist.png" },
        { name: "bioboost", price: 140, sell: 0, img: "../Img/Shop/Stage1/bioboost.png" },
        { name: "decayx", price: 160, sell: 0, img: "../Img/Shop/Stage1/decayx.png" },
        { name: "odorblock", price: 110, sell: 0, img: "../Img/Shop/Stage1/odorblock.png" }
    ],

    stage2: [
        { name: "bread_advanced", price: 200, sell: 300, img: "../Img/Shop/Stage2/bread_advanced.png" },
        { name: "meat", price: 220, sell: 320, img: "../Img/Shop/Stage2/meat.png" },
        { name: "jogurt", price: 180, sell: 260, img: "../Img/Shop/Stage2/jogurt.png" },
        { name: "soup", price: 190, sell: 270, img: "../Img/Shop/Stage2/soup.png" },
        { name: "chronobio", price: 250, sell: 0, img: "../Img/Shop/Stage2/chronobio.png" },
        { name: "moldshift", price: 240, sell: 0, img: "../Img/Shop/Stage2/moldshift.png" }
    ],

    stage3: [
        { name: "meat_mutated", price: 400, sell: 600, img: "../Img/Shop/Stage3/meat_mutated.png" },
        { name: "cheese_mutated", price: 420, sell: 650, img: "../Img/Shop/Stage3/cheese_mutated.png" },
        { name: "plaguenova", price: 500, sell: 800, img: "../Img/Shop/Stage3/plaguenova.png" },
        { name: "biocollapse", price: 550, sell: 850, img: "../Img/Shop/Stage3/biocollapse.png" },
        { name: "purezone", price: 450, sell: 700, img: "../Img/Shop/Stage3/purezone.png" },
        { name: "zerosmell", price: 480, sell: 750, img: "../Img/Shop/Stage3/zerosmell.png" }
    ]
};

/* =========================
   INIT
========================= */

function initGame() {
    loadStartItems();
    renderInventory();
    renderShop();
    updateCoins();
    smellbar.style.display = "none";
}

/* =========================
   SHOP UNLOCK 
========================= */

for (let i = 0; i < locks.length; i++) {

    locks[i].onclick = function () {

        let stage = i + 1;

        if (stage == 1 && coins >= 1000) {
            coins -= 1000;
            shopLevel = 1;
        }

        else if (stage == 2 && coins >= 3000 && shopLevel >= 1) {
            coins -= 3000;
            shopLevel = 2;
        }

        else if (stage == 3 && coins >= 5000 && shopLevel >= 2) {
            coins -= 5000;
            shopLevel = 3;
        }

        updateCoins();
        renderShop();

        if (shopLevel >= 1) {
            smellbar.style.display = "block";
        }
    };
}

/* =========================
   START ITEMS
========================= */

function loadStartItems() {

    let items = shopData.start;

    for (let i = 0; i < items.length; i++) {
        let item = items[i];

        inventoryData[item.name] = {
            count: 1,
            data: item
        };
    }
}

/* =========================
   COINS
========================= */

function updateCoins() {
    coinDisplay.innerText = coins;
}

/* =========================
   SHOP RENDER
========================= */

function renderShop() {

    const placeholders = document.querySelectorAll(".item-placeholder");
    let stages = ["stage1", "stage2", "stage3"];

    for (let i = 0; i < placeholders.length; i++) {

        let box = placeholders[i];
        box.innerHTML = "";

        if (shopLevel < i + 1) {
            box.innerHTML = "🔒";
            continue;
        }

        let items = shopData[stages[i]];

        for (let j = 0; j < items.length; j++) {

            let item = items[j];

            let div = document.createElement("div");

            div.innerHTML = `
                <img src="${item.img}" style="width:50px;">
                <p>${item.price}</p>
            `;

            div.onclick = function () {
                buyItem(item);
            };

            box.appendChild(div);
        }
    }
}

/* =========================
   BUY FIX
========================= */

function buyItem(item) {

    if (coins >= item.price) {

        coins -= item.price;

        addToInventory(item); 

        updateCoins();
    }
}

/* =========================
   INVENTORY
========================= */

function addToInventory(item) {

    if (!inventoryData[item.name]) {
        inventoryData[item.name] = { count: 0, data: item };
    }

    if (inventoryData[item.name].count < 10) {
        inventoryData[item.name].count++;
    }

    renderInventory();
}

function renderInventory() {

    inventory.innerHTML = "";

    for (let key in inventoryData) {

        let item = inventoryData[key];

        if (item.count <= 0) continue;

        let slot = document.createElement("div");
        slot.classList.add("slot");
        slot.style.position = "relative";

        let img = document.createElement("img");
        img.src = item.data.img;
        img.style.width = "40px";

        let count = document.createElement("span");
        count.innerText = item.count;
        count.style.position = "absolute";
        count.style.bottom = "0";
        count.style.right = "2px";
        count.style.color = "white";

        slot.appendChild(img);
        slot.appendChild(count);

        slot.onclick = function () {
            selectedItem = item.data;
        };

        inventory.appendChild(slot);
    }
}

/* =========================
   GRID 
========================= */

if (grid) {

    for (let i = 0; i < 72; i++) {

        let cell = document.createElement("div");
        cell.classList.add("grid-field");

        cell.onclick = function () {

            let img = cell.querySelector("img");

            if (img == null) {

                if (selectedItem != null) {

                    let name = selectedItem.name;

                    if (inventoryData[name] && inventoryData[name].count > 0) {
                        inventoryData[name].count--;
                    }

                    renderInventory();

                    let plant = document.createElement("img");
                    plant.src = selectedItem.img;

                    plant.dataset.sell = selectedItem.sell;
                    plant.dataset.name = selectedItem.name;

                    cell.appendChild(plant);

                    let growTime = selectedItem.growTime || 5000;

                    setTimeout(function () {
                        plant.dataset.ready = "true";
                    }, growTime);

                    selectedItem = null;
                }
            }

            if (img != null && img.dataset.ready == "true") {

                coins += Number(img.dataset.sell);
                updateCoins();

                let name = img.dataset.name;

                if (inventoryData[name]) {
                    inventoryData[name].count++;
                }

                cell.innerHTML = "";
                renderInventory();
            }
        };

        grid.appendChild(cell);
    }
}

/* =========================
   UI EVENTS 
========================= */

if (sellTab) {
    sellTab.onclick = function () {
        shopContainer.style.display = 'none';
        spielflaeche.style.display = 'none';
        smellbar.style.display = 'none';
        inventory.style.display = 'none';
        sellScreen.style.display = 'block';
    };
}

if (neinBtn) {
    neinBtn.onclick = function () {
        sellScreen.style.display = 'none';
        shopContainer.style.display = 'flex';
        spielflaeche.style.display = 'block';
        smellbar.style.display = shopLevel >= 1 ? 'block' : 'none';
        inventory.style.display = 'flex';
    };
}

if (jaBtn) {
    jaBtn.onclick = function () {
        sellScreen.style.display = 'none';
        soldScreen.style.display = 'block';
    };
}

if (zrkBtn) {
    zrkBtn.onclick = function () {
        soldScreen.style.display = 'none';
        shopContainer.style.display = 'flex';
        spielflaeche.style.display = 'block';
        smellbar.style.display = shopLevel >= 1 ? 'block' : 'none';
        inventory.style.display = 'flex';
    };
}

/* =========================
   START
========================= */

initGame();