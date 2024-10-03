const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function drawBackground(bgc, bdc) {
    ctx.fillStyle = bgc;
    ctx.fillRect(0, 0, 1080, 1080);
    ctx.strokeStyle = bdc;
    ctx.lineWidth = 28;
    ctx.strokeRect(0, 0, 1080, 1080);
}

function drawTitle(title){
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 10;
    ctx.font = "bold 84px \"Noto Sans HK\"";
    
    let textwidth = ctx.measureText(title).width;
    console.log(textwidth)
    ctx.strokeText(title, 540 - textwidth/2, 160);
    ctx.fillText(title, 540 - textwidth/2, 160);
}

function drawCost(count){
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 6;
    ctx.font = "72px \"Noto Sans HK\"";
    
    ctx.strokeText("價錢", 50, 890);
    ctx.fillText("價錢", 50, 890);

    ctx.lineWidth = 3;
    ctx.fillRect(215, 850, 10, 10)
    ctx.strokeRect(215, 850, 10, 10)

    ctx.fillRect(215, 870, 10, 10)
    ctx.strokeRect(215, 870, 10, 10)

    for (let i = 0; i < count; i++) {
        const img = new Image();
        img.src = "./money.svg"
        img.addEventListener("load", () => {
            ctx.drawImage(img, 255 + i * 105, 820, 80, 80)
            console.log("drawn")
        })
    }
}

function drawDistance(count){
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 6;
    ctx.font = "72px \"Noto Sans HK\"";
    
    ctx.strokeText("距離", 50, 1030);
    ctx.fillText("距離", 50, 1030);

    ctx.lineWidth = 3;
    ctx.fillRect(215, 990, 10, 10)
    ctx.strokeRect(215, 990, 10, 10)

    ctx.fillRect(215, 1010, 10, 10)
    ctx.strokeRect(215, 1010, 10, 10)

    for (let i = 0; i < count; i++) {
        const img = new Image();
        img.src = "./walking.svg"
        img.addEventListener("load", () => {
            ctx.drawImage(img, 245 + i * 105, 950, 90, 97)
            console.log("drawn")
        })
    }
}

function drawWatermark(color){
    color = "#C8A96B"
    ctx.fillStyle = "#C8A96B";

    ctx.beginPath();
    ctx.moveTo(819, 998);
    ctx.lineTo(838, 972);
    ctx.lineTo(1029, 974);
    ctx.lineTo(1054, 990);
    ctx.lineTo(1054, 1039);
    ctx.lineTo(1019, 1057);
    ctx.lineTo(839, 1055);
    ctx.lineTo(821, 1039);
    ctx.lineTo(819, 998);
    ctx.fill();

    console.log("hi")
    const img = new Image();
    img.src = "./logo.png"
    img.addEventListener("load", () => {
        ctx.drawImage(img, 830, 980, 82, 67)
        console.log("drawn")
    })

    ctx.fillStyle = "#03007E";
    ctx.lineWidth = 10;
    ctx.font = "36px \"Teko\"";
    
    document.fonts.ready.then(() => {
        ctx.fillText("@SLS_EAT", 925, 1030);
    })
}

document.fonts.ready.then(() => {
    
    drawBackground("#0e7b4c", "000000")
    drawTitle("模板")
    drawCost(5)
    drawDistance(5)
    drawWatermark()
});