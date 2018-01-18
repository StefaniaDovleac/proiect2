const list = document.getElementById('list');
const formName = document.getElementById('formName');
const formTara = document.getElementById('formTara');
const formUrl = document.getElementById('formUrl');
const addButton = document.getElementById('addButton');
let updateButton = document.getElementById('updateButton');

// fetch the roads list
function getRoads() {
    fetch('http://localhost:3000/roads')
        .then(function (response) {
            
            response.json().then(function (roads) {
                appendRoadsToDOM(roads);
            });
        });
};

// post roads
function postRoad() {
   
    const postObject = {
        name: formName.value,
        img: formUrl.value,
        tara:formTara.value
    }
    fetch('http://localhost:3000/roads', {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(postObject)
    }).then(function () {
       
        getRoads();
        resetForm();
    });
}

// delete roads
function deleteRoad(id) {
    fetch(`http://localhost:3000/roads/${id}`, {
        method: 'DELETE',
    }).then(function () {
        getRoads();
    });
}


function updateRoad(id) {
    // creat put object
    const putObject = {
        name: formName.value,
        tara:formTara.value,
        img: formUrl.value
    }
    fetch(`http://localhost:3000/roads/${id}`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(putObject)
    }).then(function () {
        getRoads();

        
        addButton.disabled = false;
        // remove all event from update button
        clearUpdateButtonEvents();

        // Reset Form
        resetForm();
    });
}


function editRoad(road) {

    formName.value = road.name;
    formUrl.value = road.img;
    formTara.value=road.tara;
    
    // disable add button
    addButton.disabled = true;

    // clear all events update button events
    clearUpdateButtonEvents();

    // enable and add event on update button
    updateButton.disabled = false;
    updateButton.addEventListener('click', function () {
        updateRoad(road.id)
    });

}

function appendRoadsToDOM(roads) {
    
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
 
    for (let i = 0; i < roads.length; i++) {
     
        let img = document.createElement('img');
        img.src = roads[i].img;

        let name = document.createElement('span');

        name.innerText = "NUME:  "+roads[i].name+"";

        let tara = document.createElement('span');
        
        tara.innerText ="TARA:  "+ roads[i].tara;

        
        let editButton = document.createElement('button')
       
        editButton.addEventListener('click', function () {
            editRoad(roads[i])
        });
        editButton.innerText = 'Edit';
        let deleteButton = document.createElement('button')
        
        deleteButton.addEventListener('click', function () {
            deleteRoad(roads[i].id)
        });
        deleteButton.innerText = 'Delete';
        // create a container for img and name
        let container = document.createElement('div');
        // append elements to container
        container.appendChild(name);
       
        container.appendChild(img);
        container.appendChild(tara);
        
       
        container.appendChild(editButton);
        container.appendChild(deleteButton);

        // append container to DOM (list div)
        list.appendChild(container);
    }
}

// reset form
function resetForm() {
    formName.value = '';
    formTara.value='';
    formUrl.value = '';
    
}
//  remove Update Button to clear events more at https://stackoverflow.com/questions/9251837/how-to-remove-all-listeners-in-an-element
function clearUpdateButtonEvents() {
    let newUpdateButton = updateButton.cloneNode(true);
    updateButton.parentNode.replaceChild(newUpdateButton, updateButton);
    updateButton = document.getElementById('updateButton');
}
// add event listener on add button
addButton.addEventListener('click', postRoad);


getRoads();