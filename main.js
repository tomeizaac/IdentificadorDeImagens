Webcam.set({
    width: 520,
    height: 470,
    image_format: "png",
    png_quality: 90,
});

camera = document.getElementById("camera");
Webcam.attach(camera)

function takeSnapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="imagem" src="' + data_uri + '"/>'
    })
}

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/yjsMtItdm/model.json", modelLoaded)

function modelLoaded() {
    console.log("modelo carregado com sucesso.")
}

function check() {
    img = document.getElementById("imagem")
    classifier.classify(img, gotResult)
}

function gotResult(error, results) {
    if (error) {
        console.error(error)
    } else {
        console.log(results)
        document.getElementById("resultObjectName").innerHTML= results[0].label;
        document.getElementById("resultObjectAccuracy").innerHTML= (results[0].confidence *100).toFixed(0) + "%" ;
    }
}