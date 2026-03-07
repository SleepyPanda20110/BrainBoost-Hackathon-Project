var questionList = [];
var answerList = [];
var flashcardIndex = 0; 

var nameList = [];
var subjectList = [];
var dateList = [];

function setText(id,text) {
    document.getElementById(id).value = text;
    console.log("setted this: " + text);
}

function getText(id){
    console.log("getted this: " + document.getElementById(id).value);
    return document.getElementById(id).value;
}

function load(){
    document.querySelector('.flashcard').classList.remove('flipped');
    
    flashcardIndex = 0;
    questionList = JSON.parse(localStorage.getItem("questions")) || [];
    answerList = JSON.parse(localStorage.getItem("answers")) || [];
    if (questionList.length > 0){
        setText("flashcardTextArea", questionList[flashcardIndex] + "?");
    } else {
        setText("flashcardTextArea", "No flashcards available");
    }
}

function enterFlashcard(){
    // Load existing flashcards from localStorage
    questionList = JSON.parse(localStorage.getItem("questions")) || [];
    answerList = JSON.parse(localStorage.getItem("answers")) || [];
    
    var question = getText("questionInput");
    var answer = getText("answerInput");
    if ((question != "") && (answer != "")){
        questionList.push(question);
        answerList.push(answer);
        localStorage.setItem("questions", JSON.stringify(questionList));
        localStorage.setItem("answers", JSON.stringify(answerList));

        console.log(questionList);
        console.log(answerList);

        setText("questionInput", "");
        setText("answerInput", "");

    } else {
        alert("Please fill all of the text inputs");
    }
}

function flashcardDisplay(){
    flashcardIndex = 0;
    setText("flashcardTextArea", (localStorage.getItem("questionList")));
    console.log(questionList[flashcardIndex] + "?");
    console.log(flashcardIndex);
    console.log(questionList);
    console.log(answerList);
}

function leftPress() {
    document.querySelector('.flashcard').classList.remove('flipped');

    if (questionList.length > 0){
        if (flashcardIndex > 0){
            flashcardIndex--;
        }
        setText("flashcardTextArea", questionList[flashcardIndex] + "?");
    }
}

function rightPress(){
    if (questionList.length > 0){
        document.querySelector('.flashcard').classList.remove('flipped');

        if (flashcardIndex < (questionList.length - 1)){
            flashcardIndex++;
        }
        setText("flashcardTextArea", questionList[flashcardIndex] + "?");
    }
}

function deleteCard(){
    if (questionList.length > 0){
        questionList.splice(flashcardIndex, 1);
        answerList.splice(flashcardIndex, 1);
        localStorage.setItem("questions", JSON.stringify(questionList));
        localStorage.setItem("answers", JSON.stringify(answerList));
        
        if (questionList.length === 0){
            setText("flashcardTextArea", "No flashcards available");
            flashcardIndex = 0;
        } else {
            if (flashcardIndex >= questionList.length){
                flashcardIndex = questionList.length - 1;
            }
            setText("flashcardTextArea", questionList[flashcardIndex] + "?");
        }
    }
}

function flipCard(){
    if (questionList.length > 0){
        document.querySelector('.flashcard').classList.toggle('flipped');

        if (getText("flashcardTextArea") === questionList[flashcardIndex] + "?"){
           setText("flashcardTextArea", answerList[flashcardIndex]);
        }
        else if (getText("flashcardTextArea") === answerList[flashcardIndex]){
            setText("flashcardTextArea", (questionList[flashcardIndex] + "?"));
        }
    }
}

function enterAssignment(){
    var name = getText("nameInput");
    var subject = getText("subjectInput");
    var date = getText("dateInput");
    var temp1 = "Assignments: ";
    var temp2 = "Classes: ";
    var temp3 = "Due Date: ";

    if ((name != "") && (subject != "") && (date != "")){
        nameList.push(name);
        subjectList.push(subject);
        dateList.push(date);

        console.log(nameList)
        console.log(subjectList)
        console.log(dateList)

        //localStorage.setItem("names", JSON.stringify(nameList));
        //localStorage.setItem("subjects", JSON.stringify(subjectList));
        //localStorage.setItem("dates", JSON.stringify(dateList));

        setText("nameInput", "");
        setText("subjectInput", "");
        setText("dateInput", "");

        
    } else {
        alert("Please fill all of the text inputs");
    }

    for (var i = 0; i < nameList.length; i++){
        temp1 = temp1 + "  -  " + nameList[i];
        //nameList = JSON.parse(localStorage.getItem("names"));
    }
    for (var j = 0; j < subjectList.length; j++){
        temp2 = temp2 + "  -  " + subjectList[j];
        //subjectList = JSON.parse(localStorage.getItem("subjects"));
    }
    for (var k = 0; k < dateList.length; k++){
        temp3 = temp3 + "  -  " + dateList[k];
        //dateList = JSON.parse(localStorage.getItem("dates"));
    }

    document.getElementsByClassName("column")[0].innerHTML = temp1;
    document.getElementsByClassName("column1")[0].innerHTML = temp2;
    document.getElementsByClassName("column2")[0].innerHTML = temp3;

    console.log(temp1)
    console.log(temp2)
    console.log(temp3)
}