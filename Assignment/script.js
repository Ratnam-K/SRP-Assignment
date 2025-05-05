// Helper functions for localStorage
function getStudents() {
    return JSON.parse(localStorage.getItem('students')) || [];
}

function setStudents(students) {
    localStorage.setItem('students', JSON.stringify(students));
}

// DOM Elements
const form = document.getElementById('student-form');
const tableBody = document.querySelector('#student-table tbody');
let editIndex = null; // Track index when editing

// Handle form submission
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form action

    // Get input values
    const name = document.getElementById('name').value.trim();
    const studentId = document.getElementById('studentId').value.trim();
    const email = document.getElementById('email').value.trim();
    const contact = document.getElementById('contact').value.trim();

    // Input validation
    if (!/^[a-zA-Z ]+$/.test(name)) return alert("Name must contain only letters.");
    if (!/^\d+$/.test(studentId)) return alert("Student ID must be numeric.");
    if (!/^\d+$/.test(contact)) return alert("Contact must be numeric.");
    if (!email.includes('@') || !email.includes('.')) return alert("Invalid email format.");

    const newStudent = { name, studentId, email, contact };
    let students = getStudents();

    // If editing, update existing student
    if (editIndex !== null) {
        students[editIndex] = newStudent;
        editIndex = null;
    } else {
        students.push(newStudent); // Add new student
    }

    setStudents(students); // Save to localStorage
    form.reset();          // Reset the form
    renderStudents();      // Refresh list
});

// Render all students in table
function renderStudents() {
    const students = getStudents();
    tableBody.innerHTML = '';

    students.forEach((student, index) => {
        const row = tableBody.insertRow();

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.studentId}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button class="edit" onclick="editStudent(${index})">Edit</button>
                <button class="delete" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
    });
}

// Load student data into form for editing
function editStudent(index) {
    const students = getStudents();
    const student = students[index];

    document.getElementById('name').value = student.name;
    document.getElementById('studentId').value = student.studentId;
    document.getElementById('email').value = student.email;
    document.getElementById('contact').value = student.contact;

    editIndex = index;
}

// Delete a student entry
function deleteStudent(index) {
    let students = getStudents();
    if (confirm("Are you sure you want to delete this record?")) {
        students.splice(index, 1);
        setStudents(students);
        renderStudents();
    }
}

// Initialize student list on page load
renderStudents();
