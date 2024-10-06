const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const form = document.getElementById("form");

function blobToDataURL(blob){
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = _e => resolve(reader.result);
      reader.onerror = _e => reject(reader.error);
      reader.onabort = _e => reject(new Error("Read aborted"));
      reader.readAsDataURL(blob);
    });
}

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
        img.src = "./assets/money.svg"
        img.addEventListener("load", () => {
            ctx.drawImage(img, 255 + i * 105, 820, 80, 80)
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
        img.src = "./assets/walking.svg"
        img.addEventListener("load", () => {
            ctx.drawImage(img, 245 + i * 105, 950, 90, 97)
        })
    }
}

function drawWatermark(color){
    ctx.fillStyle = color;

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

    const img = new Image();
    img.src = "./assets/logo.png"
    img.addEventListener("load", () => {
        ctx.drawImage(img, 830, 980, 82, 67)
    })
    
    document.fonts.ready.then(() => {
        ctx.fillStyle = "#03007e";
        ctx.lineWidth = 10;
        ctx.font = "36px \"Teko\"";
        ctx.fillText("@SLS_EAT", 925, 1030);
    })
}

async function drawQRCode(link, bdg){
    ctx.strokeStyle = bdg;
    ctx.linewidth = 30;
    const qrcode = new QRCodeStyling({"width":300,"height":300,"data":link,"margin":0,"qrOptions":{"typeNumber":"0","mode":"Byte","errorCorrectionLevel":"Q"},"imageOptions":{"hideBackgroundDots":true,"imageSize":0.4,"margin":0},"dotsOptions":{"type":"extra-rounded","color":"#6a1a4c"},"backgroundOptions":{"color":"#ffffff"},"image":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5Mi4zIDEzMi4zIj48cGF0aCBmaWxsPSIjMWE3M2U4IiBkPSJNNjAuMiAyLjJDNTUuOC44IDUxIDAgNDYuMSAwIDMyIDAgMTkuMyA2LjQgMTAuOCAxNi41bDIxLjggMTguM0w2MC4yIDIuMnoiLz48cGF0aCBmaWxsPSIjZWE0MzM1IiBkPSJNMTAuOCAxNi41QzQuMSAyNC41IDAgMzQuOSAwIDQ2LjFjMCA4LjcgMS43IDE1LjcgNC42IDIybDI4LTMzLjMtMjEuOC0xOC4zeiIvPjxwYXRoIGZpbGw9IiM0Mjg1ZjQiIGQ9Ik00Ni4yIDI4LjVjOS44IDAgMTcuNyA3LjkgMTcuNyAxNy43IDAgNC4zLTEuNiA4LjMtNC4yIDExLjQgMCAwIDEzLjktMTYuNiAyNy41LTMyLjctNS42LTEwLjgtMTUuMy0xOS0yNy0yMi43TDMyLjYgMzQuOGMzLjMtMy44IDguMS02LjMgMTMuNi02LjMiLz48cGF0aCBmaWxsPSIjZmJiYzA0IiBkPSJNNDYuMiA2My44Yy05LjggMC0xNy43LTcuOS0xNy43LTE3LjcgMC00LjMgMS41LTguMyA0LjEtMTEuM2wtMjggMzMuM2M0LjggMTAuNiAxMi44IDE5LjIgMjEgMjkuOWwzNC4xLTQwLjVjLTMuMyAzLjktOC4xIDYuMy0xMy41IDYuMyIvPjxwYXRoIGZpbGw9IiMzNGE4NTMiIGQ9Ik01OS4xIDEwOS4yYzE1LjQtMjQuMSAzMy4zLTM1IDMzLjMtNjMgMC03LjctMS45LTE0LjktNS4yLTIxLjNMMjUuNiA5OGMyLjYgMy40IDUuMyA3LjMgNy45IDExLjMgOS40IDE0LjUgNi44IDIzLjEgMTIuOCAyMy4xczMuNC04LjcgMTIuOC0yMy4yIi8+PC9zdmc+","dotsOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#6a1a4c","color2":"#6a1a4c","rotation":"0"}},"cornersSquareOptions":{"type":"extra-rounded","color":"#000000"},"cornersSquareOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#000000","color2":"#000000","rotation":"0"}},"cornersDotOptions":{"type":"","color":"#000000"},"cornersDotOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#000000","color2":"#000000","rotation":"0"}},"backgroundOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#ffffff","color2":"#ffffff","rotation":"0"}}});
    const blob = await qrcode.getRawData("svg");
    const dataurl = await blobToDataURL(blob);
    const img = new Image();
    img.src = dataurl;
    img.addEventListener("load", () => {
        ctx.drawImage(img, 805, 680, 220, 220);
        ctx.beginPath();
        ctx.roundRect(800, 675, 230, 230, 25);
        ctx.stroke();
    });
    // qrcode.download() // putting this makes the code work somehow?
}

function drawPhoto(photo, bdg, imgcoeff, imgy){
    const img = new Image();
    img.src = photo;
    img.addEventListener("load", () => {
        ctx.fillStyle = bdg;
        ctx.lineWidth = 15;
        let w = img.naturalWidth * imgcoeff;
        let h = img.naturalHeight * imgcoeff;
        console.log(w, h);
        ctx.drawImage(
            img, (1080 - w)/2, imgy, w, h,
        )
        ctx.beginPath();
        ctx.roundRect((1080 - w)/2 - 5, imgy, w + 10, h + 10, 25);
        ctx.stroke();
    })
}

async function drawTemplate(){
    let formdata = new FormData(form);
    let backgroundColor = formdata.get("bgc"),
        borderColor = formdata.get("bdc"),
        watermarkColor = formdata.get("wmc"),
        title = formdata.get("title"),
        cost = formdata.get("geld"),
        distance = formdata.get("s"),
        gmaplink = formdata.get("gmap"),
        photo = formdata.get("restimg"),
        imgcoeff = formdata.get("imgcoeff"),
        imgy = formdata.get("imgy") * 10;

    const dataurl = await blobToDataURL(photo);
    drawBackground(backgroundColor, borderColor)
    drawTitle(title)
    drawCost(cost)
    drawDistance(distance)
    drawWatermark(watermarkColor)
    console.log(photo)
    drawPhoto(dataurl, borderColor, imgcoeff, imgy)
    drawQRCode(gmaplink, borderColor)
}

document.fonts.ready.then(() => {
    drawBackground("#0e7b4c", "#03007e")
    drawTitle("模板")
    drawCost(5)
    drawDistance(5)
    drawWatermark("#c8a96b")
    drawQRCode("https://maps.app.goo.gl/uJG1bvnPGHKobPus8", "#03007e")
    drawPhoto("./assets/testing_image.png", "000000", 0.5, 250)
});

let inputs = document.getElementsByTagName("input");
for (let input of inputs){
    input.addEventListener("change", drawTemplate)
}