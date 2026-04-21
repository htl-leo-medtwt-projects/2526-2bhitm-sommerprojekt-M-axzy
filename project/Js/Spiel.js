
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

/* =========================
   GAME STATE
========================= */

let coins = 1000;
let shopLevel = 0;
let selectedItem = null;

let inventoryData = {};

/* =========================
   SHOP DATA (from JSON)
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
        { name: "cheese", price: 100, sell: 160, unlock: 1000, img: "../Img/Shop/Stage1/cheese.png" },
        { name: "milk", price: 90, sell: 140, unlock: 1000, img: "../Img/Shop/Stage1/milk.png" },
        { name: "cleanmist", price: 120, sell: 0, unlock: 1000, img: "../Img/Shop/Stage1/cleanmist.png" },
        { name: "bioboost", price: 140, sell: 0, unlock: 1000, img: "../Img/Shop/Stage1/bioboost.png" },
        { name: "decayx", price: 160, sell: 0, unlock: 1000, img: "../Img/Shop/Stage1/decayx.png" },
        { name: "odorblock", price: 110, sell: 0, unlock: 1000, img: "../Img/Shop/Stage1/odorblock.png" }
    ],

    stage2: [
        { name: "bread_advanced", price: 200, sell: 300, unlock: 3000, img: "../Img/Shop/Stage2/bread_advanced.png" },
        { name: "meat", price: 220, sell: 320, unlock: 3000, img: "../Img/Shop/Stage2/meat.png" },
        { name: "jogurt", price: 180, sell: 260, unlock: 3000, img: "../Img/Shop/Stage2/jogurt.png" },
        { name: "soup", price: 190, sell: 270, unlock: 3000, img: "../Img/Shop/Stage2/soup.png" },
        { name: "chronobio", price: 250, sell: 0, unlock: 3000, img: "../Img/Shop/Stage2/chronobio.png" },
        { name: "moldshift", price: 240, sell: 0, unlock: 3000, img: "../Img/Shop/Stage2/moldshift.png" }
    ],

    stage3: [
        { name: "meat_mutated", price: 400, sell: 600, unlock: 5000, img: "../Img/Shop/Stage3/meat_mutated.png" },
        { name: "cheese_mutated", price: 420, sell: 650, unlock: 5000, img: "../Img/Shop/Stage3/cheese_mutated.png" },
        { name: "plaguenova", price: 500, sell: 800, unlock: 5000, img: "../Img/Shop/Stage3/plaguenova.png" },
        { name: "biocollapse", price: 550, sell: 850, unlock: 5000, img: "../Img/Shop/Stage3/biocollapse.png" },
        { name: "purezone", price: 450, sell: 700, unlock: 5000, img: "../Img/Shop/Stage3/purezone.png" },
        { name: "zerosmell", price: 480, sell: 750, unlock: 5000, img: "../Img/Shop/Stage3/zerosmell.png" }
    ]
};

/* =========================
   INIT GAME
========================= */

function initGame() {

    loadStartItems();
    renderInventory();
    renderShop();
    updateCoins();
    checkShopUnlocks();
}

/* =========================
   START ITEMS → INVENTORY
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
   SHOP UNLOCK LOGIC
========================= */

function checkShopUnlocks() {

    if (coins >= 5000) {
        shopLevel = 3;
    }
    else if (coins >= 3000) {
        shopLevel = 2;
    }
    else if (coins >= 1000) {
        shopLevel = 1;
    }
    else {
        shopLevel = 0;
    }

    if (shopLevel >= 1) {
        smellbar.style.display = "block";
    }

    renderShop();
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

        let items = shopData[stages[i]];

        let container = document.createElement("div");
        container.style.display = "grid";
        container.style.gridTemplateColumns = "repeat(3, 1fr)";
        container.style.gap = "10px";

        for (let j = 0; j < items.length; j++) {

            let item = items[j];

            if (item.unlock != null) {

                if (shopLevel < (item.unlock / 1000)) {
                    continue;
                }
            }

            let div = document.createElement("div");

            div.innerHTML = `
                <img src="${item.img}" style="width:50px;">
                <p>${item.price}</p>
            `;

            div.onclick = function () {
                buyItem(item);
            };

            container.appendChild(div);
        }

        box.appendChild(container);
    }
}

/* =========================
   BUY ITEM
========================= */

function buyItem(item) {

    if (coins >= item.price) {

        coins = coins - item.price;

        selectedItem = item;

        updateCoins();

        checkShopUnlocks();
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
        inventoryData[item.name].count = inventoryData[item.name].count + 1;
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
        count.style.fontSize = "12px";

        slot.appendChild(img);
        slot.appendChild(count);

        slot.onclick = function () {
            selectedItem = item.data;
        };

        inventory.appendChild(slot);
    }
}

/* =========================
   GRID SYSTEM
========================= */

if (grid) {

    for (let i = 0; i < 72; i++) {

        let cell = document.createElement("div");
        cell.classList.add("grid-field");

        cell.onclick = function () {

            let img = cell.querySelector("img");

            // PLACE
            if (img == null) {

                if (selectedItem != null) {

                    let name = selectedItem.name;

                    if (inventoryData[name]) {

                        if (inventoryData[name].count > 0) {
                            inventoryData[name].count = inventoryData[name].count - 1;
                        }
                    }

                    renderInventory();

                    let plant = document.createElement("img");
                    plant.src = selectedItem.img;

                    plant.dataset.sell = selectedItem.sell;
                    plant.dataset.name = selectedItem.name;

                    cell.appendChild(plant);

                    let item = selectedItem;
                    selectedItem = null;

                    setTimeout(function () {
                        plant.dataset.ready = "true";
                    }, item.growTime);
                }
            }

            // HARVEST
            if (img != null) {

                if (img.dataset.ready == "true") {

                    coins = coins + Number(img.dataset.sell);

                    updateCoins();

                    let name = img.dataset.name;

                    if (inventoryData[name]) {
                        inventoryData[name].count = inventoryData[name].count + 1;
                    }

                    cell.innerHTML = "";

                    renderInventory();
                }
            }
        };

        grid.appendChild(cell);
    }
}

/* =========================
   UI EVENTS (UNCHANGED)
========================= */

if (sellTab) {

    sellTab.onclick = function () {

        shopContainer.style.display = "none";
        spielflaeche.style.display = "none";

        if (shopLevel >= 1) {
            smellbar.style.display = "block";
        }

        inventory.style.display = "none";
        sellScreen.style.display = "block";
    };
}

if (neinBtn) {

    neinBtn.onclick = function () {

        sellScreen.style.display = "none";
        shopContainer.style.display = "flex";
        spielflaeche.style.display = "block";

        if (shopLevel >= 1) {
            smellbar.style.display = "block";
        }

        inventory.style.display = "flex";
    };
}

if (jaBtn) {

    jaBtn.onclick = function () {
        sellScreen.style.display = "none";
        soldScreen.style.display = "block";
    };
}

if (zrkBtn) {

    zrkBtn.onclick = function () {

        soldScreen.style.display = "none";
        shopContainer.style.display = "flex";
        spielflaeche.style.display = "block";

        if (shopLevel >= 1) {
            smellbar.style.display = "block";
        }

        inventory.style.display = "flex";
    };
}

/* =========================
   START GAME
========================= */

initGame();