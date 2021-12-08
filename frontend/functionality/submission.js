//level 1
let level1 = document.querySelector("#level1")
let imageLevel1 = document.querySelector("#imageLevel1")
let hint1o1 = document.querySelector("#hint1o1")
let hint1o2 = document.querySelector("#hint1o2")
let hint1o3 = document.querySelector("#hint1o3")
let audio1o1 = document.querySelector("#audio1o1")
let audio1o2 = document.querySelector("#audio1o2")
let audio1o3 = document.querySelector("#audio1o3")
let answer1o1 = document.querySelector("#answer1o1")
let answer1o2 = document.querySelector("#answer1o2")
let answer1o3 = document.querySelector("#answer1o3")

//level 2
let level2 = document.querySelector("#level2")
let questionLevel2 = document.querySelector("#questionLevel2")
let audioQuestionLevel2 = document.querySelector("#audioQuestionLevel2")
let hint2o1 = document.querySelector("#hint2o1")
let hint2o2 = document.querySelector("#hint2o2")
let hint2o3 = document.querySelector("#hint2o3")
let audio2o1 = document.querySelector("#audio2o1")
let audio2o2 = document.querySelector("#audio2o2")
let audio2o3 = document.querySelector("#audio2o3")
let answer2o1 = document.querySelector("#answer2o1")
let answer2o2 = document.querySelector("#answer2o2")
let answer2o3 = document.querySelector("#answer2o3")

//buttons
let level1Button = document.querySelector("#level1-button")
let level2Button = document.querySelector("#level2-button")

//forms

let form1 = document.getElementById("form1")
let form2 = document.getElementById("form2")

let currentLevel = 1

const levelChange = (level) => {
    level1.classList.toggle("hidden")
    level2.classList.toggle("hidden")

    currentLevel = level
    if(currentLevel == 2) {
        level2Button.classList.remove("bg-red-400")
        level2Button.classList.add("bg-red-500")

        level1Button.classList.remove("bg-red-500")
        level1Button.classList.add("bg-red-400")
    } else {
        level1Button.classList.remove("bg-red-400")
        level1Button.classList.add("bg-red-500")

        level2Button.classList.remove("bg-red-500")
        level2Button.classList.add("bg-red-400")
    }
}

function handleSubmit(e) {
    e.preventDefault()
    console.log('submit pressed')
    
    
    let formData
    if (currentLevel == 1) {
        formData = new FormData(form1)
        formData.append("level", 1)
        fetch("http://ugdev.cs.smu.ca:3021/new-question", {
            method: "POST",
            body: formData
        }).then(response => {
            let data = response.json()
            console.log("data ", data)

            imageLevel1.value = ""
            hint1o1.value = ""
            hint1o2.value = ""
            hint1o3.value = ""
            audio1o1.value = ""
            audio1o2.value = ""
            audio1o3.value = ""
            answer1o1.value = ""
            answer1o2.value = ""
            answer1o3.value = ""
        }).catch(err => {
            console.log('error: ', err)
        })
    } else {
        formData = new FormData(form2)
        formData.append("level", 2)
        fetch("http://ugdev.cs.smu.ca:3021/new-question", {
            method: "POST",
            body: formData
        }).then(response => {
            let data = response.json()
            console.log("data ", data)

            questionLevel2.value = ""
            audioQuestionLevel2.value = ""
            hint2o1.value = ""
            hint2o2.value = ""
            hint2o3.value = ""
            audio2o1.value = ""
            audio2o2.value = ""
            audio2o3.value = ""
            answer2o1.value = "" 
            answer2o2.value = "" 
            answer2o3.value = ""
        }).catch(err => {
            console.log('error: ', err)
        })
        
    }
}

form1.addEventListener("submit", handleSubmit)
form2.addEventListener("submit", handleSubmit)


//adding a name to the form input tag allows multer to see it in the body
//now must attach link to audio to mongodb
//level is not being passed in form submission yet
//need to send audio back to user



// function onSubmit() {
//     console.log('Submitting')
//     console.log('hint: ' + hint1o1.value)
//     if (currentLevel == 1) {
//         let response = fetch("http://ugdev.cs.smu.ca:3021/new-question", {
//             method: "POST",
//             body: JSON.stringify({
//                 level: currentLevel,
//                 question: "",
//                 responses: {
//                     option1: {
//                         hint: hint1o1.value,
//                         answer: answer1o1.value,
//                         audioLink: audio1o1.value
//                     },
//                     option2: {
//                         hint: hint1o2.value,
//                         answer: answer1o2.value,
//                         audioLink: audio1o2.value
//                     },
//                     option3: {
//                         hint: hint1o3.value,
//                         answer: answer1o3.value,
//                         audioLink: audio1o3.value
//                     }
//                 },
//                 audioLinkQuestion: "",
//                 imageLink: imageLevel1.value
//             }),
//             headers: new Headers({
//                 "Content-Type": "application/json"
//             })
//         }).then(response => {
//             let data = response.json()
//             console.log("data ", data)

//             imageLevel1.value = ""
//             hint1o1.value = ""
//             hint1o2.value = ""
//             hint1o3.value = ""
//             audio1o1.value = ""
//             audio1o2.value = ""
//             audio1o3.value = ""
//             answer1o1.value = ""
//             answer1o2.value = ""
//             answer1o3.value = ""
//         }).catch(err => {
//             console.log('error: ', err)
//         })
        

//     } else {
//         let response = fetch("http://ugdev.cs.smu.ca:3021/new-question", {
//             method: "POST",
//             body: JSON.stringify({
//                 level: currentLevel,
//                 question: questionLevel2.value,
//                 responses: {
//                     option1: {
//                         hint: hint2o1.value,
//                         answer: answer2o1.value,
//                         audioLink: audio2o1.value
//                     },
//                     option2: {
//                         hint: hint2o2.value,
//                         answer: answer2o2.value,
//                         audioLink: audio2o2.value
//                     },
//                     option3: {
//                         hint: hint2o3.value,
//                         answer: answer2o3.value,
//                         audioLink: audio2o3.value
//                     }
//                 },
//                 audioLinkQuestion: audioQuestionLevel2.value,
//                 imageLink: ""
//             }),
//             headers: new Headers({
//                 "Content-Type": "application/json"
//             })
//         }).then(response => {
//             let data = response.json()
//             console.log("data ", data)

//             questionLevel2.value = ""
//             audioQuestionLevel2.value = ""
//             hint1o1.value = ""
//             hint1o2.value = ""
//             hint1o3.value = ""
//             audio1o1.value = ""
//             audio1o2.value = ""
//             audio1o3.value = ""
//             answer1o1.value = "" 
//             answer1o2.value = "" 
//             answer1o3.value = ""
//         }).catch(err => {
//             console.log('error: ', err)
//         })
        
//     }
// }