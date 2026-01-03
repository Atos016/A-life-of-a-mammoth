// Mamute Mod for Sandboxels

elements.mamute = {
    color: ["#6b4f2a", "#7a5a35", "#5e4525"],
    behavior: behaviors.LIFE,
    category: "life",
    state: "solid",
    density: 3200,
    tempHigh: 35,
    stateHigh: "carne_de_mamute",
    tick: function(pixel) {

        // Morrer no calor
        if (pixel.temp > 35 && Math.random() < 0.05) {
            pixel.element = "carne_de_mamute";
            return;
        }

        // Comer grama
        for (let i = 0; i < adjacentCoords.length; i++) {
            let x = pixel.x + adjacentCoords[i][0];
            let y = pixel.y + adjacentCoords[i][1];
            if (outOfBounds(x,y)) continue;
            let other = pixelMap[x][y];
            if (other && other.element === "grass") {
                other.element = "air";
            }
        }

        // Reprodução no frio
        if (pixel.temp < 0 && Math.random() < 0.0005) {
            let dir = adjacentCoords[Math.floor(Math.random() * adjacentCoords.length)];
            let x = pixel.x + dir[0];
            let y = pixel.y + dir[1];
            if (isEmpty(x,y)) {
                createPixel("mamute", x, y);
            }
        }
    }
};

elements.carne_de_mamute = {
    color: "#8b3a3a",
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    density: 2000,
    tempHigh: 60,
    stateHigh: "carne_de_mamute_assada"
};

elements.carne_de_mamute_assada = {
    color: "#5c2a1a",
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    density: 1900,
    tempHigh: 200,
    stateHigh: "ash"
};
