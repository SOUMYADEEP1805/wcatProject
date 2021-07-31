#!/usr/bin/env node
let fs = require("fs");

//input handling
let inputArr = process.argv.slice(2);

//options and contents
let options = [];
let fileArr = [];
for(let i=0;i<inputArr.length;i++){
    let fch = inputArr[i].charAt(0);
    if(fch == "-"){
        options.push(inputArr[i]);
    }else{
        fileArr.push(inputArr[i]);
    }

}


// existtance check
for(let i=0;i<fileArr.length;i++){
    let isfilepresent = fs.existsSync(fileArr[i]);
    if(isfilepresent == false){
        console.log(`${fileArr[i]} is not present`);
        return;
    }
}



//read
let content ="";
for(let i = 0;i<fileArr.length;i++){
    let ans = fs.existsSync(fileArr[i]);
    if(ans == false){
        console.log("File does not exist");
    }else{
        let filecontent  = fs.readFileSync(fileArr[i]);
        content += filecontent+"\n";
    }
}
// console.log(content);
// console.log("*******************************************")

let arrOfContent  = content.split("\n");
// console.log(arrOfContent);

// -s implement

let isSpresent  = options.includes("-s");
if(isSpresent == true){
    for(let i =1;i<arrOfContent.length;i++){
        if(arrOfContent[0]== ""){
            arrOfContent[0] = null;
        }
        if(arrOfContent[i] == "" && arrOfContent[i-1] == ""){
            arrOfContent[i] = null;
        }else if(arrOfContent[i] == "" && arrOfContent[i-1] == null){
            arrOfContent[i] = null;
        }
    }
    let tempContent  = [];
    for(let i = 0;i<arrOfContent.length;i++){
        if(arrOfContent[i] != null){
            tempContent.push(arrOfContent[i]);
        }
    }
    arrOfContent = tempContent;
    
}
// b n check
let isBothpresent = options.includes("-n") && options.includes("-b");
let idxOfN, idxOfB;

if(isBothpresent){
    for(let i = 0; i < options.length; i++){
        if(options[i] == "-n"){
            idxOfN = i;
        }
        if(options[i] == "-b"){
            idxOfB = i;
        }
    }
    if(idxOfN<idxOfB){
        let isNpresent  = options.includes("-n");
        if(isNpresent == true){
            for(let i = 0;i<arrOfContent.length;i++){
                arrOfContent[i] = `${i+1} ${arrOfContent[i]}`;
            }
        }
    }
    
    if(idxOfB<idxOfN) {
        let isBpresent  = options.includes("-b");
        if(isBpresent == true){
            let counter = 1;
            for(let i = 0;i<arrOfContent.length;i++){
                if(arrOfContent[i] != ""){
                    arrOfContent[i] = `${counter} ${arrOfContent[i]}`;
                    counter++;
                }
            }
        }
    }

}else{
    // if(idxOfN<idxOfB){
        let isNpresent  = options.includes("-n");
        if(isNpresent == true){
            for(let i = 0;i<arrOfContent.length;i++){
                arrOfContent[i] = `${i+1} ${arrOfContent[i]}`;
            }
        }
    // }
    
    // if(idxOfB<idxOfN) {
        let isBpresent  = options.includes("-b");
        if(isBpresent == true){
            let counter = 1;
            for(let i = 0;i<arrOfContent.length;i++){
                if(arrOfContent[i] != ""){
                    arrOfContent[i] = `${counter} ${arrOfContent[i]}`;
                    counter++;
                }
            }
        }
    // }
}




console.log(arrOfContent.join("\n"));




