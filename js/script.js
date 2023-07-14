// DOM Elements

const cardsContainer = document.querySelector("#cards");

let allData = [];

const card = `<div></div>`

function getData () {
    allData?.map((elm, index) => {
        const card = document.createElement("div");
        card.className = "card";
        card.setAttribute("list-pos", index);
        card.addEventListener("mousedown", (e)=>{
            if (e.target.className === "card"){
                dragDropCards()
            }
        })
        const userAdd = document.createElement("div");
        userAdd.className = "userAdd";
        const userId = document.createElement("span");
        userId.className = "userId";
        userId.innerText = elm.id;
        const addRow = document.createElement("button");
        addRow.className = "addRow";
        addRow.addEventListener("click", ()=>{
            addNewItem(inputsAdd)
        })
        const addRowIcon = document.createElement("i");
        addRowIcon.className = "fa-solid fa-circle-plus";
        const cardItemPlace = document.createElement("div");
        cardItemPlace.className = 'cardItemPlace';
        addRow.appendChild(addRowIcon);
        userAdd.appendChild(userId);
        userAdd.appendChild(addRow);
        card.appendChild(userAdd);
        elm?.data?.map(item => {
            let dataKeys = Object.keys(item)[0];
            let dataValue = Object.values(item)[0];
            const cardRow = document.createElement("div");
            cardRow.className = "cardRow";
            cardRow.addEventListener("mousedown", (e)=>{
                if (e.target.className === "cardRow"){
                    dragDropCardItems();
                }
            })
            const textTitle = document.createElement("div");
            textTitle.className = "textTitle"
            const title = document.createElement("span");
            title.className = "title"
            title.innerText = dataKeys;
            const dot = document.createElement("span");
            dot.innerText = "-"
            const text = document.createElement("span");
            text.className = "text"
            text.innerText = `${dataValue}`;
            const input = document.createElement("input");
            input.className = 'edit';
            input.value = `${dataValue}`;
            input.name = `${dataKeys}`;
            textTitle.appendChild(title);
            textTitle.appendChild(dot)
            textTitle.appendChild(text);
            textTitle.appendChild(input);
            cardRow.appendChild(textTitle);
            const editDelete = document.createElement("div");
            editDelete.className = "editDelete";
            editDelete.value = elm.id;
            const save = document.createElement("i");
            save.className = "fa-regular fa-floppy-disk";
            save.classList.add("close");
            save.addEventListener("click", ()=>{
                saveEditedItem(elm.id, save, edit, input, text, title, del, cardBtnsEdit ,cardBtnsDelete)
            })
            const edit = document.createElement("i");
            edit.className = "fa-solid fa-pen";
            edit.value = elm.id;
            edit.addEventListener("click", ()=>{
                editCardItem(save, edit, input, text, del, cardBtnsEdit ,cardBtnsDelete)
            })
            const del = document.createElement("i");
            del.className = "fa-solid fa-circle-minus";
            del.addEventListener("click", ()=>{
                removeCardItem(elm.id, title.innerText.toLowerCase(), input.value);
            })
            editDelete.appendChild(save);
            editDelete.appendChild(edit);
            editDelete.appendChild(del);
            cardRow.appendChild(editDelete);
            cardItemPlace.appendChild(cardRow);
        })
        const cardBtns = document.createElement("div");
        cardBtns.className = "cardBtns";
        const cardBtnsSave = document.createElement("button");
        cardBtnsSave.className = ("cardBtnsSave");
        cardBtnsSave.classList.add("close");
        cardBtnsSave.addEventListener("click", ()=>{
            saveEditedAllItems(elm.id, card)
        })
        const cardBtnsSaveIcon = document.createElement("i");
        cardBtnsSaveIcon.className = "fa-regular fa-floppy-disk";
        cardBtnsSave.appendChild(cardBtnsSaveIcon);
        cardBtns.appendChild(cardBtnsSave);
        const cardBtnsEdit = document.createElement("button");
        cardBtnsEdit.classList.add("cardBtnsEdit");
        cardBtnsEdit.addEventListener("click", ()=>{
            editAllItems(elm.id, card)
        })
        const cardBtnsEditIcon = document.createElement("i");
        cardBtnsEditIcon.className = "fa-regular fa-pen-to-square";
        cardBtnsEdit.appendChild(cardBtnsEditIcon)
        cardBtns.appendChild(cardBtnsEdit)
        const cardBtnsDelete = document.createElement("button");
        cardBtnsDelete.classList.add("cardBtnsDel");
        cardBtnsDelete.addEventListener("click", ()=>{
            removeItem(elm.id);
        })
        const cardBtnsDeleteIcon = document.createElement("i");
        cardBtnsDeleteIcon.className = "fa-regular fa-trash-can"
        cardBtnsDelete.appendChild(cardBtnsDeleteIcon);
        cardBtns.appendChild(cardBtnsDelete);
        const inputsAdd = document.createElement("div");
        inputsAdd.className = "inputsAdd";
        const inputKey = document.createElement("input");
        inputKey.setAttribute("type", "text");
        inputKey.className = "inputKey";
        inputKey.placeholder = "Title...";
        inputsAdd.appendChild(inputKey);
        const inputText = document.createElement("input");
        inputText.setAttribute("type", "text");
        inputText.className = "inputText";
        inputText.placeholder = "Text...";
        inputsAdd.appendChild(inputText);
        const saveInputAdd = document.createElement("i");
        saveInputAdd.className = "fa-regular fa-floppy-disk";
        saveInputAdd.addEventListener("click", ()=>{
            saveNewitem(elm.id, inputKey, inputText, inputsAdd)
        })
        inputsAdd.appendChild(saveInputAdd);
        card.appendChild(cardItemPlace);
        card.appendChild(inputsAdd);
        card.appendChild(cardBtns);
        cardsContainer.appendChild(card)
    })
}

function refresh () {
    cardsContainer.innerHTML = "";
    allData = JSON.parse(localStorage.getItem("user"));
    if (allData === null){
        allData = []
    }
    getData();
}

refresh();

//Clear data functionality

const clear = document.querySelector("#clear");

function clearData () {
    localStorage.clear();
    refresh();
}

clear.addEventListener("click", clearData);

// Open modal
const modal = document.querySelector("#modal");
const form = document.querySelector("#form");
const openModal = document.querySelector("#openModal");
openModal.addEventListener("click", () => {
    modal.classList.add("open")
});

//Close modal
const closeModal = document.querySelector(".closeModal");
closeModal.addEventListener("click", ()=>{
    modal.classList.remove("open")
});


// Add New Cards

//RegEx
const firstNameRegEx = /^[a-zA-Z]+$/;
const lastNameRegEx = /^[a-zA-Z]+$/;
const numberRegEx = /^\d+$/;
const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regExArray = [firstNameRegEx, lastNameRegEx, numberRegEx, emailRegEx];

//All Inputs

const inputs = document.querySelectorAll("#form input");
const err = document.querySelector(".err")

function handleSubmit (event) {
    let users = null;
    if (allData.length < 1){
        users = 0;
    }else{
        let arr = []
        for (let i = 0; i < allData.length; i++){
            arr.push(allData[i].id)
        }
        let sort = arr.sort((a, b) => a.localeCompare(b, undefined, {numeric: true}))
        let userIdSpl = sort[sort.length - 1].split("");
        users = +userIdSpl[userIdSpl.length - 1] + 1;
    }
    event.preventDefault();
    const formData = {
        id: null,
        data: []
    }
    let canLoaded = false;

    for (let i = 0; i < inputs.length; i++){
        if (regExArray[i].test(inputs[i].value) && inputs[i].value.trim()){
            let dataKey = inputs[i].name;
            formData.id = `user${users}`;
            formData.data.push(
                {
                    [dataKey]: `${inputs[i].value}`
                }
            )
            if (i === inputs.length - 1){
                canLoaded = true;
            }
            inputs.forEach(item => {
                item.style.borderColor = "var(--clr-green)";
            });
            err.innerText = ""
        }else{
            inputs.forEach(item => {
                item.style.borderColor = "var(--clr-red)"
            })
            err.innerText = "Please fill in all fields correctly";
            canLoaded = false;
            break;
        }
    }
    if (canLoaded){
        allData.push(formData);
        const jsonData = JSON.stringify(allData);
        localStorage.setItem("user", jsonData);
        refresh();
        modal.classList.remove("open");
    }
    inputs.forEach(item => {
        item.value = null;
    })
}

form.addEventListener("submit", (event) => handleSubmit(event));

// Remove Item functionality

function removeItem (id){
    allData = allData.filter(item => item.id !== id);
    localStorage.setItem("user", JSON.stringify(allData))
    refresh();
}

// Edit all item functionality

function editAllItems (id, card){
    const inputArray = [...card.querySelectorAll(".edit")];
    const textArray = [...card.querySelectorAll(".text")];
    const editBtn = card.querySelector(".cardBtnsEdit");
    const saveBtn = card.querySelector(".cardBtnsSave");
    const delBtn = card.querySelector(".cardBtnsDel");
    const rowEditDelete = [...card.querySelectorAll(".editDelete")];
    inputArray.forEach(item => item.classList.add("open"));
    textArray.forEach(item => item.classList.add("close"));
    editBtn.classList.add("close");
    saveBtn.classList.remove("close");
    delBtn.classList.add("close");
    rowEditDelete.forEach(item => item.classList.add("close"));
}

function saveEditedAllItems (id, card){
    const inputArray = [...card.querySelectorAll(".edit")];
    const textArray = [...card.querySelectorAll(".text")];
    const editBtn = card.querySelector(".cardBtnsEdit");
    const saveBtn = card.querySelector(".cardBtnsSave");
    const delBtn = card.querySelector(".cardBtnsDel");
    const rowEditDelete = [...card.querySelectorAll(".editDelete")];
    const formData = {
        id: null,
        data: []
    };
    let canLoaded = false;
    for (let i = 0; i < inputArray.length; i++){
        if (inputArray[i].name === "email"){
            canLoaded = emailRegEx.test(inputArray[i]?.value)
            if (canLoaded === false){
                break;
            }
        }else if (inputArray[i].name === "tel"){
            canLoaded = numberRegEx.test(inputArray[i].value);
            if (canLoaded === false){
                break;
            }
        }else if (inputArray[i].value.trim()){
            canLoaded = true;
        }else{
            canLoaded = false;
            break;
        }
        if (i === regExArray.length - 1){
            canLoaded = true;
        }
        inputArray.forEach(item => {
            item.style.borderColor = "transparent";
        });
    }
    if (canLoaded){
        formData.id = id;
        inputArray.forEach(item => {
            let dataKey = item.name
            formData.data.push(
                {
                    [dataKey]: item.value
                }
            )
        })
        const findItem = allData.indexOf(allData.find(item => item.id === id));
        allData[findItem] = formData;
        const jsonData = JSON.stringify(allData);
        localStorage.setItem("user", jsonData);
        textArray.forEach(item => item.classList.remove("close"));
        inputArray.forEach(item => item.classList.remove("open"));
        editBtn.classList.remove("close");
        saveBtn.classList.add("close");
        delBtn.classList.remove("close");
        rowEditDelete.forEach(item => item.classList.remove("close"));
        refresh();
    }else{
        inputArray?.forEach(item => {
            item.style.borderColor = "var(--clr-red)"
        })
    }
}

//RemoveCardItem functionality

function removeCardItem (id, title, input){
    const removedItem = JSON.parse(localStorage.getItem("user")).find(item => item.id === id);
    const findItem = allData.indexOf(allData.find(item => item.id === id))
    const newData = {
        id: id,
        data: removedItem.data.filter(item => {
            return item[`${title}`] !== input
        })
    };
    allData[findItem] = newData;
    const jsonData = JSON.stringify(allData);
    localStorage.setItem("user", jsonData);
    refresh();
}

// Edit card item functionality

function editCardItem (save, edit, input, text, del, cardBtnsEdit ,cardBtnsDelete){
    edit.classList.add("close");
    del.classList.add("close");
    cardBtnsEdit.classList.add("close");
    cardBtnsDelete.classList.add("close");
    input.classList.add("open");
    text.classList.add("close");
    save.classList.remove("close")
}

function saveEditedItem (id, save, edit, input, text, title, del, cardBtnsEdit ,cardBtnsDelete){
    const textContent = text.textContent.split("- ")[1];
    const item = title.innerText.toLowerCase();
    let getData = JSON.parse(localStorage.getItem("user")).find(item => item.id === id);
    let canLoaded = false;
    if (item === "email"){
        if (emailRegEx.test(input.value)  && input.value.trim()){
            canLoaded = true;
        }
    }else if (item === "tel"){
        if (numberRegEx.test(input.value) && input.value.trim()){
            canLoaded = true
        }
    }else if(!input.value.trim()){
        input.style.borderColor = "var(--clr-red)"
    }else{
        canLoaded = true;
    }
    if (canLoaded){
        for (let i = 0; i <getData.data.length; i++){
            if (getData.data[i][`${title.textContent.toLowerCase()}`] === textContent){
                getData.data[i][`${title.textContent.toLowerCase()}`] = input.value;
            }
        }
        const findItem = allData.indexOf(allData.find(item => item.id === id))
        allData[findItem] = getData;
        localStorage.setItem("user", JSON.stringify(allData));
        edit.classList.remove("close");
        del.classList.remove("close");
        cardBtnsEdit.classList.remove("close");
        cardBtnsDelete.classList.remove("close");
        input.classList.remove("open");
        text.classList.remove("close");
        save.classList.add("close")
        refresh();
    }else{
        input.style.borderColor = "var(--clr-red)"
    }
}

// Add new item functionality
function addNewItem (inputsAdd){
    inputsAdd.classList.add("open")
}
function saveNewitem (id, inputKey, inputText, inputsAdd){
    let getData = JSON.parse(localStorage.getItem("user")).find(item => item.id === id);
    const findItem = allData.indexOf(allData.find(item => item.id === id))
    if (inputKey.value.trim() && inputText.value.trim()){
        inputKey.value = inputKey.value.toLowerCase();
        getData.data.push(
            {
                [`${inputKey.value}`]: inputText.value
            }
        )
        allData[findItem] = getData;
        const jsonData = JSON.stringify(allData);
        localStorage.setItem("user", jsonData);
        inputsAdd.classList.remove("open");
        refresh()
    }else{
        if (!inputKey.value.trim() && !inputText.value.trim()){
            inputKey.style.border = "1px solid var(--clr-red)";
            inputText.style.border = "1px solid var(--clr-red)";
        }else if (!inputText.value.trim()){
            inputText.style.border = "1px solid var(--clr-red)";
        }else if (!inputKey.value.trim()){
            inputKey.style.border = "1px solid var(--clr-red)";
        }
    }
}

// Drag and drop items

// Drag and drop items

function dragDropCardItems() {
    const cardItem = document.querySelectorAll(".cardItemPlace");
    const cardRow = document.querySelectorAll(".cardRow");
    cardRow.forEach(draggable => {
        draggable.draggable = true;
        draggable.addEventListener("dragstart", ()=>{
            draggable.classList.add("dragging")
        })
        draggable.addEventListener("dragend", ()=>{
            draggable.classList.remove("dragging");
            let newData = []
            const allCards = [...document.querySelectorAll(".card")];
            allCards.forEach(item => {
                const id = item.querySelector(".userId").textContent;
                const allKeys = [...item.querySelectorAll(".title")];
                const allTexts = [...item.querySelectorAll(".text")];
                let dataArr = [];
                for (let i = 0; i <allKeys.length; i++){
                    dataArr.push(
                        {
                            [allKeys[i].textContent.toLowerCase()] : allTexts[i].textContent
                        }
                    )
                }
                newData.push({
                    id: id,
                    data: dataArr
                });
            })
            localStorage.setItem("user", JSON.stringify(newData))
        })
    })
    cardItem.forEach(item => {
        item.addEventListener("dragover", (e)=>{
            e.preventDefault();
            const afterElement = getDragAfterElement(item, e.clientY);
            const draggable = document.querySelector(".dragging");
            if (afterElement == null){
                item.appendChild(draggable)
            }else{
                item.insertBefore(draggable, afterElement)
            }
        })
    })

    function getDragAfterElement(cardItem, y){
        const draggableElements = [...cardItem.querySelectorAll(".cardRow:not(.dragging)")];

        return draggableElements.reduce((closest, child)=>{
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset){
                return {offset: offset, element: child}
            }else{
                return closest
            }
        }, {offset: Number.NEGATIVE_INFINITY}).element
    }
}

// Drag and drop cards
function dragDropCards () {

    let cards = document.querySelectorAll(".card"), current_pos, drop_pos
    for (card of cards){
        card.draggable = true;
        card.addEventListener("dragstart", function(){
            current_pos = this.getAttribute("list-pos");
        })
        card.addEventListener("dragover", (e)=>{
            e.preventDefault()
        })
        card.addEventListener("drop", function(e){
            e.preventDefault();
            drop_pos = this.getAttribute("list-pos");
            allData.splice(drop_pos, 0, allData.splice(current_pos, 1)[0])
            localStorage.setItem("user", JSON.stringify(allData));
            refresh()
        })
    }
}


function foo(a,b){
    return a+b
}

window.addEventListener("unload", () => {

})