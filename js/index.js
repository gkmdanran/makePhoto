function drawAndShareImage(photoSize, bordeWidth, photoSrc, borderSrc, type) {
    var cover = document.getElementById('cover')
    var canvas = document.createElement("canvas");
    canvas.width = photoSize;
    canvas.height = photoSize;
    var context = canvas.getContext("2d");
    var photoImage = new Image();
    photoImage.src = photoSrc;
    photoImage.crossOrigin = 'Anonymous';
    photoImage.onload = function () {
        type == 'round' ? context.arc(photoSize / 2, photoSize / 2, photoSize / 2, 0, 2 * Math.PI) : context.rect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#fff";
        context.fill();
        context.clip()
        context.drawImage(photoImage, bordeWidth, bordeWidth, photoSize - 2 * bordeWidth, photoSize - 2 * bordeWidth);
        var borderImage = new Image();
        cover.style.display = 'flex'
        borderImage.src = borderSrc
        borderImage.crossOrigin = 'Anonymous';
        borderImage.onload = function () {
            context.drawImage(borderImage, 0, 0, photoSize, photoSize);
            var base64 = canvas.toDataURL("image/png");
            var img = document.getElementById('avatar');
            img.setAttribute('src', base64);
            cover.style.display = 'none'
        }
    }
}

var uploadBtn = document.getElementById('avatarSlect')
var newBtn = document.getElementById('newBtn')
var downloadBtn = document.getElementById('downloadBtn')
var changeType = document.getElementById('changeType')
var uploadBorder = document.getElementById('uploadBorder')
var left = document.getElementById('left')
var right = document.getElementById('right')
var changePadding = document.getElementById('changePadding')
var currentType = 'fang'
var size = 500
var padding = 0
var borderList = [
    "../imgs/flag1.png",
    "../imgs/flag2.png",
    "../imgs/flag3.png",
    "../imgs/flag4.png",
    "../imgs/flag5.png",
    "../imgs/flag6.png",
    "../imgs/flag7.png",
    "../imgs/flag8.png",
]
var currentPhoto = "./imgs/photo.png"
var currentIndex = 0
var currentBorder = borderList[0]
var uploadType = 'photo'


uploadBtn.addEventListener('change', function () {
    var obj = uploadBtn.files[0];
    var fr = new FileReader();
    console.log(obj)
    fr.readAsDataURL(obj);
    fr.onload = function () {
        uploadType == 'photo' ? currentPhoto = this.result : currentBorder = this.result
        drawAndShareImage(size, padding, currentPhoto, currentBorder, currentType)
    };
})

right.addEventListener('click', function () {
    avatarSlect.value = null
    if (currentIndex == borderList.length - 1) {
        currentIndex = 0
    }
    else {
        currentIndex++
    }
    currentBorder = borderList[currentIndex]
    drawAndShareImage(size, padding, currentPhoto, currentBorder, currentType)
})
left.addEventListener('click', function () {
    avatarSlect.value = null
    if (currentIndex == 0) {
        currentIndex = borderList.length - 1
    }
    else {
        currentIndex--
    }
    currentBorder = borderList[currentIndex]
    drawAndShareImage(size, padding, currentPhoto, currentBorder, currentType)
})
newBtn.addEventListener('click', function () {
    uploadType = 'photo'
    uploadBtn.click()
})
uploadBorder.addEventListener('click', function () {
    uploadType = 'border'
    uploadBtn.click()
})
downloadBtn.addEventListener('click', function () {
    var img = document.getElementById('avatar');
    var url = img.src;
    var a = document.createElement('a');
    var event = new MouseEvent('click')
    a.download = 'photo_bydanran'
    a.href = url;
    a.dispatchEvent(event)
    document.body.removeChild(a)
})
changeType.addEventListener('click', function () {
    var border = document.getElementById('avatar')
    if (currentType == 'round') {
        currentType = 'fang'
        border.style.borderRadius = '5px'
        drawAndShareImage(size, padding, currentPhoto, currentBorder, currentType)
    } else {
        currentType = 'round'
        border.style.borderRadius = '50%'
        drawAndShareImage(size, padding, currentPhoto, currentBorder, currentType)
    }
})

changePadding.addEventListener('change', function () {
    if (changePadding.value < 0 || changePadding.value > 200) {
        alert("请输入0-200的数");
        changePadding.value = padding
        return;
    }
    padding = changePadding.value
    drawAndShareImage(size, padding, currentPhoto, currentBorder, currentType)
})
drawAndShareImage(size, padding, currentPhoto, currentBorder, currentType)