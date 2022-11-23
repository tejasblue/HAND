prediction_1=""

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:100
});

camera=document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image"src="'+data_uri+'"/>';
    })
}

console.log('ml5 version:',ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/mFQ2f5LFa/model.json',modelLoaded);
function modelLoaded(){
    console.log('Model Loaded!');
}



function speak(){
    var synth=window.speechSynthesis;
    speak_data= toSpeak;
    var utterThis=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}


function check(){
    img=document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}



function gotResult(error, result){
    if (error) {
        console.error(error);
    } else{
        console.log(result);
        document.getElementById("update_emoji").innerHTML=result[0].label;
        prediction_1=result[0].label;
        toSpeak="";

        if(prediction_1=="This is looking amazing")
        {
            toSpeak="This is looking amazing";
            document.getElementById("update_emoji").innerHTML="&#128076;";
        }
        else if(prediction_1=="All the best")
        {
            toSpeak="All the best";
            document.getElementById("update_emoji").innerHTML="&#128077;";
        }
        else if(prediction_1=="That was a marvelous victory")
        {
            toSpeak="That was a marvelous victory";
            document.getElementById("update_emoji").innerHTML="&#9996;";
        }

        speak();
    
}}