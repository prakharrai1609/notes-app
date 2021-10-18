const text = document.getElementById('addtext');
const title = document.getElementById('note-name');
const add = document.getElementById('addnote');
const clear = document.getElementById('clean');
const search = document.getElementById('search');
const searchbtn = document.getElementById('search-btn');
const newnote = document.getElementById('new-note');

// load the old notes from the local storage

showNotes();

// clearing the local storage

clear.addEventListener('click', () => {
    localStorage.clear();
    notesObj = [];
    showNotes();
})

// adding a new note

add.addEventListener('click', (addtext) => {
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('titles');

    if (notes != null) {
        notesObj = JSON.parse(notes);
        titleObj = JSON.parse(titles);
    } else {
        notesObj = [];
        titleObj = [];
    }

    notesObj.push(text.value);
    if (title.value == "")
        title.value = "Untitled"
    titleObj.push(title.value);

    localStorage.setItem('notes', JSON.stringify(notesObj));
    localStorage.setItem('titles', JSON.stringify(titleObj));

    text.value = '';
    title.value = '';

    showNotes();
    // console.log(notesObj);
});

// showing a note

function showNotes() {
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('titles');

    if (notes != null) {
        notesObj = JSON.parse(notes);
        titleObj = JSON.parse(titles);
    } else {
        notesObj = [];
        titleObj = [];
    }

    let html = '';
    notesObj.forEach(function (element, index) {
        html +=
            `
        <div class="card notecard mx-3 my-3" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">${titleObj[index]}</h5>
            <p class="card-text">${element}</p>
            <button class = "btn btn-primary" id="${index}" onclick="deleteNote(this.id)">Delete note</button>
            </div>
        </div>
        `
    });
    let elem = document.getElementById('new-note');
    if (notesObj.length != 0) {
        elem.innerHTML = html;
    } else {
        elem.innerHTML = "<p style='color:grey; font-family: courier;'>Nothing to show right now...</p>";
    }
};

// deleting a node

function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('titles');
    if (notes != null) {
        notesObj = JSON.parse(notes);
        titleObj = JSON.parse(titles);
    } else {
        notesObj = [];
        titleObj = [];
    }

    notesObj.splice(index, 1);
    titleObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    localStorage.setItem('titles', JSON.stringify(titleObj));
    showNotes();
};

// searching a note

search.addEventListener('input', function () {
    // console.log(search.value);
    let find = search.value.toLowerCase();
    let card = document.getElementsByClassName('notecard');
    Array.from(card).forEach((e) => {
        let cardContaingValue = e.getElementsByTagName('p')[0].innerText.toLocaleLowerCase();
        let titleContaingVlaue = e.getElementsByTagName('h5')[0].innerText.toLocaleLowerCase();
        // console.log(e);
        if (cardContaingValue.includes(find) || titleContaingVlaue.includes(find))
            e.style.display = 'block';
        else
            e.style.display = 'none';
    })
});
