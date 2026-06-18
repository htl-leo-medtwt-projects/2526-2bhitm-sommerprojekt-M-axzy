/* =========================
   ELEMENTS
========================= */

let grid = document.getElementById('grid-overlay');
let shopContainer = document.getElementById('shop-container');
let sellTab = document.querySelector('.shop-tabs img[alt="Verkaufen"]');
let sellScreen = document.getElementById('sell-screen');
let soldScreen = document.getElementById('sold-screen');
let neinBtn = document.getElementById('neinKaufen');
let jaBtn = document.getElementById('jaKaufen');
let zrkBtn = document.getElementById('zrk');
let spielflaeche = document.getElementById('spielflaeche');
let inventory = document.getElementById('inventory');
let coinDisplay = document.getElementById('coin-count');
let coinsContainer = document.getElementById('coins-container');
let locks = document.querySelectorAll(".asset-lock");

/* =========================
   GAME STATE
========================= */

let coins = 1000;
let selectedItem = null;

let unlockedStages = [false, false, false];

let seedInventory = {};
let harvestInventory = {};

/* =========================
   SHOP DATA 
========================= */

let shopData = {
    start: [
        { name: "bread", price: 0, sell: 80, growTime: 60000, img: "../Img/Shop/Start/bread.png" },
        { name: "strawberry", price: 0, sell: 60, growTime: 60000, img: "../Img/Shop/Start/strawberry.png" },
        { name: "chicken", price: 0, sell: 110, growTime: 60000, img: "../Img/Shop/Start/chicken.png" },
        { name: "carrot", price: 0, sell: 50, growTime: 60000, img: "../Img/Shop/Start/carrot.png" },
        { name: "potato", price: 0, sell: 55, growTime: 60000, img: "../Img/Shop/Start/potato.png" },
        { name: "wheat", price: 0, sell: 40, growTime: 60000, img: "../Img/Shop/Start/wheat.png" }
    ],

    stage1: [
        { name: "cheese", price: 100, sell: 160, img: "../Img/Shop/Stage1/cheese.png" },
        { name: "milk", price: 90, sell: 140, img: "../Img/Shop/Stage1/milk.png" },
        { name: "cleanmist", price: 120, sell: 0, img: "../Img/Shop/Stage1/cleanmist.png" },
        { name: "bioboost", price: 140, sell: 0, img: "../Img/Shop/Stage1/bioboost.png" },
        { name: "decayx", price: 160, sell: 0, img: "../Img/Shop/Stage1/decayx.png" }
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
   SPRAY SYSTEM (ADDED)
========================= */

function applySpray(item) {

    let plants = document.querySelectorAll(".grid-field img");

    plants.forEach(p => {

        let mold = Number(p.dataset.mold || 0);

        if (item.name === "cleanmist") p.dataset.mold = 0;

        if (item.name === "bioboost") p.dataset.mold = Math.min(100, mold + 25);

        if (item.name === "decayx") p.dataset.mold = Math.min(100, mold + 50);

        if (item.name === "chronobio") p.dataset.speed = "slow";

        if (item.name === "moldshift") p.dataset.mold = 100;

        if (item.name === "plaguenova") p.dataset.mold = Math.min(100, mold + 50);

        if (item.name === "biocollapse") p.dataset.mold = 100;

        if (item.name === "purezone") p.dataset.mold = 0;

        if (item.name === "zerosmell") p.dataset.mold = 0;
    });
}

/* =========================
   INIT
========================= */

function initGame() {
    loadStartItems();
    renderInventory();
    renderShop();
    updateCoins();
}

/* =========================
   SHOP UNLOCK
========================= */

for (let i = 0; i < locks.length; i++) {

    locks[i].onclick = function () {

        let prices = [1000, 3000, 5000];

        if (!unlockedStages[i] && coins >= prices[i]) {

            coins -= prices[i];
            unlockedStages[i] = true;

            locks[i].style.display = "none";

            updateCoins();
            renderShop();
        } else {
            alert("Nicht genug Coins!");
        }
    };
}

/* =========================
   START ITEMS
========================= */

function loadStartItems() {
    for (let item of shopData.start) {
        seedInventory[item.name] = { count: 1, data: item };
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

    let placeholders = document.querySelectorAll(".item-placeholder");
    let stages = ["stage1", "stage2", "stage3"];

    for (let i = 0; i < placeholders.length; i++) {

        let box = placeholders[i];
        box.innerHTML = "";

        if (!unlockedStages[i]) {
            box.innerHTML = "🔒";
            continue;
        }

        for (let item of shopData[stages[i]]) {

            let div = document.createElement("div");
            div.innerHTML = `<img src="${item.img}" style="width:50px;"><p>${item.price}</p>`;

            div.onclick = () => buyItem(item);
            box.appendChild(div);
        }
    }
}

/* =========================
   BUY
========================= */

function buyItem(item) {
    if (coins >= item.price) {
        coins -= item.price;
        addSeed(item);
        updateCoins();
    }
}

/* =========================
   INVENTORY
========================= */

function addSeed(item) {
    if (!seedInventory[item.name]) {
        seedInventory[item.name] = { count: 0, data: item };
    }
    seedInventory[item.name].count++;
    renderInventory();
}

function addHarvest(item) {
    if (!harvestInventory[item.name]) {
        harvestInventory[item.name] = { count: 0, data: item };
    }
    harvestInventory[item.name].count++;
    renderInventory();
}

/* =========================
   CLEAN
========================= */

function cleanInventory() {

    for (let key in seedInventory) {
        if (seedInventory[key].count <= 0) delete seedInventory[key];
    }

    for (let key in harvestInventory) {
        if (harvestInventory[key].count <= 0) delete harvestInventory[key];
    }
}

/* =========================
   INVENTORY RENDER
========================= */

function renderInventory() {

    cleanInventory();

    inventory.innerHTML = "";

    let seedItems = Object.values(seedInventory);
    let harvestItems = Object.values(harvestInventory);

    for (let i = 0; i < 6; i++) {

        let slot = document.createElement("div");
        slot.classList.add("slot");

        let item = seedItems[i];

        if (item && item.count > 0) {

            let img = document.createElement("img");
            img.src = item.data.img;
            img.style.width = "40px";

            slot.onclick = () => selectedItem = item.data;

            slot.appendChild(img);
        }

        inventory.appendChild(slot);
    }

    let gap = document.createElement("div");
    gap.style.width = "25px";
    inventory.appendChild(gap);

    for (let i = 0; i < 6; i++) {

        let slot = document.createElement("div");
        slot.classList.add("slot");

        let item = harvestItems[i];

        if (item && item.count > 0) {

            let img = document.createElement("img");
            img.src = item.data.img;
            img.style.width = "40px";

            slot.appendChild(img);
        }

        inventory.appendChild(slot);
    }
}

/* =========================
   PHASE SYSTEM
========================= */

function startPlantPhases(cell, plant) {

    setTimeout(() => {

        cell.classList.add("warning");

        setTimeout(() => {

            cell.classList.remove("warning");

            if (unlockedStages[0]) {
                startMoldSystem(cell, plant);
            }

        }, 2000);

    }, 13000);
}

/* =========================
   MOLD SYSTEM
========================= */

function startMoldSystem(cell, plant) {

    if (plant.dataset.moldStarted) return;
    plant.dataset.moldStarted = "true";

    plant.dataset.mold = 0;

    let cloud = document.createElement("div");
    cloud.classList.add("mold-cloud");
    cloud.style.opacity = 0.05;
    cell.appendChild(cloud);

    let moldInterval = setInterval(() => {

        if (!cell.contains(plant)) {
            clearInterval(moldInterval);
            return;
        }

        let mold = Number(plant.dataset.mold);
        mold += 5;
        if (mold > 100) mold = 100;

        plant.dataset.mold = mold;

        cloud.style.opacity = 0.05 + (mold / 100) * 0.95;

        if (mold >= 100) clearInterval(moldInterval);

    }, 1000);
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

            /* 🧪 SPRAY CHECK (ADDED) */
            if (!img && selectedItem) {

                if (
                    selectedItem.name.includes("mist") ||
                    selectedItem.name.includes("boost") ||
                    selectedItem.name.includes("decay") ||
                    selectedItem.name.includes("chronobio") ||
                    selectedItem.name.includes("mold") ||
                    selectedItem.name.includes("plague") ||
                    selectedItem.name.includes("zone")
                ) {
                    applySpray(selectedItem);
                    selectedItem = null;
                    return;
                }

                /* 🌱 PLANT */
                if (seedInventory[selectedItem.name]?.count > 0) {
                    seedInventory[selectedItem.name].count--;
                }

                renderInventory();

                let plant = document.createElement("img");
                plant.src = selectedItem.img;
                plant.style.opacity = 0;

                let current = 0;
                let steps = 600;

                let grow = setInterval(() => {

                    current++;
                    plant.style.opacity = current / steps;

                    if (current >= steps) {
                        clearInterval(grow);

                        plant.dataset.ready = "true";
                        cell.classList.add("ready");

                        startPlantPhases(cell, plant);
                    }

                }, 100);

                plant.dataset.sell = selectedItem.sell;
                plant.dataset.name = selectedItem.name;
                plant.dataset.mold = 0;

                cell.appendChild(plant);

                selectedItem = null;
            }

            if (img && img.dataset.ready === "true") {

                addHarvest({
                    name: img.dataset.name,
                    img: img.src,
                    sell: Number(img.dataset.sell)
                });

                cell.innerHTML = "";
                cell.classList.remove("ready");
            }
        };

        grid.appendChild(cell);
    }
}

/* =========================
   UI EVENTS
========================= */

if (sellTab) {
    sellTab.onclick = () => {
        sellScreen.style.display = "block";
        soldScreen.style.display = "none";
    };
}

if (neinBtn) {
    neinBtn.onclick = () => sellScreen.style.display = "none";
}

if (jaBtn) {
    jaBtn.onclick = () => {

        let total = 0;

        for (let key in harvestInventory) {
            let item = harvestInventory[key];
            total += (item?.count || 0) * (item?.data.sell || 0);
        }

        coins += total;
        updateCoins();

        harvestInventory = {};

        renderInventory();

        sellScreen.style.display = "none";
        soldScreen.style.display = "block";
    };
}

if (zrkBtn) {
    zrkBtn.onclick = () => soldScreen.style.display = "none";
}

/* =========================
   START
========================= */

initGame();