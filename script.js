const notes_container = document.querySelector('.notes-container');
const create_btn = document.querySelector('.btn');
let notes = document.querySelectorAll('.input-box');

// Function to show saved notes
function showNotes() {
    if (localStorage.getItem("notes")) {
        notes_container.innerHTML = localStorage.getItem("notes");
    }
}
showNotes();  // Load notes when the page is opened

// Function to update local storage when notes are changed
function updateStorage() {
    localStorage.setItem("notes", notes_container.innerHTML);
}

// Event listener to create new note
create_btn.addEventListener('click', () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");

    // Add class to newly created note
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");

    // Set the image source and class for styling
    img.src = "/images/delete.png";
    img.className = "delete-btn";  // Optional: Add class to style delete button if needed

    // Append the image to the inputBox (note) and the note to the container
    inputBox.appendChild(img);
    notes_container.appendChild(inputBox);

    // Call updateStorage whenever a new note is created
    updateStorage();
});

// Event listener to handle note deletion and update
notes_container.addEventListener('click', function (e) {
    if (e.target.tagName === 'IMG') {
        // Delete the parent element (note) when delete button is clicked
        e.target.parentElement.remove();
        updateStorage();  // Update storage when a note is deleted
    } else if (e.target.tagName === "P") {
        notes = document.querySelectorAll(".input-box");
        notes.forEach(nt => {
            nt.onkeyup = function () {
                updateStorage();  // Update storage when a note is modified
            };
        });
    }
});

// Prevent "Enter" from creating a new paragraph in contenteditable element
document.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        document.execCommand('insertLineBreak');
        event.preventDefault();
    }
});
