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

/*function load(){
    // some pages don't use the card-flip UI
    const cardEl = document.querySelector('.flashcard');
    if (cardEl) cardEl.classList.remove('flipped');
    
    flashcardIndex = 0;
    questionList = JSON.parse(localStorage.getItem("questions")) || [];
    answerList = JSON.parse(localStorage.getItem("answers")) || [];
    if (questionList.length > 0){
        setText("flashcardTextArea", questionList[flashcardIndex] + "?");
    } else {
        setText("flashcardTextArea", "No flashcards available");
    }
}*/

function load(){
    flashcardIndex = 0;
    questionList = JSON.parse(localStorage.getItem("questions")) || [];
    answerList = JSON.parse(localStorage.getItem("answers")) || [];
    document.getElementById("flashcardInner").classList.remove("flipped");
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

/*function leftPress() {
    const cardEl = document.querySelector('.flashcard');
    if (cardEl) cardEl.classList.remove('flipped');

    if (questionList.length > 0){
        if (flashcardIndex > 0){
            flashcardIndex--;
        }
        setText("flashcardTextArea", questionList[flashcardIndex] + "?");
    }
}*/
function leftPress() {
    if (questionList.length > 0){
        if (flashcardIndex > 0) flashcardIndex--;
        document.getElementById("flashcardInner").classList.remove("flipped");
        setText("flashcardTextArea", questionList[flashcardIndex] + "?");
    }
}

/*function rightPress(){
    if (questionList.length > 0){
        const cardEl = document.querySelector('.flashcard');
        if (cardEl) cardEl.classList.remove('flipped');

        if (flashcardIndex < (questionList.length - 1)){
            flashcardIndex++;
        }
        setText("flashcardTextArea", questionList[flashcardIndex] + "?");
    }
}*/
function rightPress(){
    if (questionList.length > 0){
        if (flashcardIndex < questionList.length - 1) flashcardIndex++;
        document.getElementById("flashcardInner").classList.remove("flipped");
        setText("flashcardTextArea", questionList[flashcardIndex] + "?");
    }
}

/*function deleteCard(){
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
}*/
function deleteCard(){
    if (questionList.length > 0){
        questionList.splice(flashcardIndex, 1);
        answerList.splice(flashcardIndex, 1);
        localStorage.setItem("questions", JSON.stringify(questionList));
        localStorage.setItem("answers", JSON.stringify(answerList));
        document.getElementById("flashcardInner").classList.remove("flipped");
        if (questionList.length === 0){
            setText("flashcardTextArea", "No flashcards available");
            flashcardIndex = 0;
        } else {
            if (flashcardIndex >= questionList.length) flashcardIndex = questionList.length - 1;
            setText("flashcardTextArea", questionList[flashcardIndex] + "?");
        }
    }
}

/*function flipCard(){
    if (questionList.length > 0){
        const cardEl = document.querySelector('.flashcard');
        if (cardEl) cardEl.classList.toggle('flipped');

        if (getText("flashcardTextArea") === questionList[flashcardIndex] + "?"){
           setText("flashcardTextArea", answerList[flashcardIndex]);
        }
        else if (getText("flashcardTextArea") === answerList[flashcardIndex]){
            setText("flashcardTextArea", (questionList[flashcardIndex] + "?"));
        }
    }
}*/
function flipCard(){
    if (questionList.length > 0){
        var card = document.getElementById("flashcardInner");
        if (!card.classList.contains("flipped")){
            document.getElementById("flashcardAnswer").textContent = answerList[flashcardIndex];
            card.classList.add("flipped");
        } else {
            card.classList.remove("flipped");
        }
    }
}

function enterAssignment(){
    // Load existing assignments from localStorage
    nameList = JSON.parse(localStorage.getItem("assignmentNames")) || [];
    subjectList = JSON.parse(localStorage.getItem("assignmentSubjects")) || [];
    dateList = JSON.parse(localStorage.getItem("assignmentDates")) || [];

    var name = getText("nameInput");
    var subject = getText("subjectInput");
    var date = getText("dateInput");

    if ((name != "") && (subject != "") && (date != "")){
        nameList.push(name);
        subjectList.push(subject);
        dateList.push(date);

        localStorage.setItem("assignmentNames", JSON.stringify(nameList));
        localStorage.setItem("assignmentSubjects", JSON.stringify(subjectList));
        localStorage.setItem("assignmentDates", JSON.stringify(dateList));

        console.log(nameList);
        console.log(subjectList);
        console.log(dateList);

        setText("nameInput", "");
        setText("subjectInput", "");
        setText("dateInput", "");

        displayAssignments();
    } else {
        alert("Please fill all of the text inputs");
    }
}

function displayAssignments(){
    nameList = JSON.parse(localStorage.getItem("assignmentNames")) || [];
    subjectList = JSON.parse(localStorage.getItem("assignmentSubjects")) || [];
    dateList = JSON.parse(localStorage.getItem("assignmentDates")) || [];

    const assignmentsDiv = document.getElementById("column");
    const subjectsDiv = document.getElementById("column1");
    const datesDiv = document.getElementById("column2");

    if (assignmentsDiv && subjectsDiv && datesDiv) {
        assignmentsDiv.innerHTML = nameList.length > 0 ? nameList.map((name, index) => `<div class="py-1">• ${name} <button onclick="deleteAssignment(${index})" class="ml-2 bg-red-500 text-white px-2 py-1 rounded">Finish</button></div>`).join('') : '<div class="text-gray-500">No assignments yet</div>';
        subjectsDiv.innerHTML = subjectList.length > 0 ? subjectList.map(subject => `<div class="py-1">• ${subject}</div>`).join('') : '<div class="text-gray-500">No subjects yet</div>';
        datesDiv.innerHTML = dateList.length > 0 ? dateList.map(date => `<div class="py-1">• ${date}</div>`).join('') : '<div class="text-gray-500">No dates yet</div>';
    }
}

function deleteAssignment(index) {
    let nameList = JSON.parse(localStorage.getItem("assignmentNames")) || [];
    let subjectList = JSON.parse(localStorage.getItem("assignmentSubjects")) || [];
    let dateList = JSON.parse(localStorage.getItem("assignmentDates")) || [];

    if (index >= 0 && index < nameList.length) {
        nameList.splice(index, 1);
        subjectList.splice(index, 1);
        dateList.splice(index, 1);

        localStorage.setItem("assignmentNames", JSON.stringify(nameList));
        localStorage.setItem("assignmentSubjects", JSON.stringify(subjectList));
        localStorage.setItem("assignmentDates", JSON.stringify(dateList));

        displayAssignments();
    }
}