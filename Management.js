//Making Form Functional
const firstName = document.getElementById("fname");
const lastName = document.getElementById("lname");
const mark = document.getElementById("Mark");
const form = document.getElementById("dataForm");
const sorting = document.getElementById("sort");
const canva = document.getElementById("myChart");
const showGraph = document.getElementById("showGraph")

const students = JSON.parse(localStorage.getItem("students")) || [];
document.addEventListener("DOMContentLoaded", renderTable);

showGraph.addEventListener("click", () => {
  renderTable();
  renderChart();
}) 

function addStudent() {
  const student = {
    firstName: firstName.value,
    lastName: lastName.value,
    mark: mark.value,
  };

  if (
    student.firstName === "" ||
    student.lastName === "" ||
    student.mark === ""
  ) {
    return;
  }

  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));
  form.reset();
  renderTable();
  toggleFormVisibility();
}

function renderTable() {
  const tableElement = document.getElementById("tbl");
  tableElement.innerHTML = ""; // Clear existing rows

  students.forEach(student => {
    const trElement = document.createElement("tr");
    const fnameEle = document.createElement("td");
    const lnameEle = document.createElement("td");
    const markEle = document.createElement("td");
    const editDeleteEle = document.createElement("td");

    fnameEle.textContent = student.firstName;
    lnameEle.textContent = student.lastName;
    markEle.textContent = student.mark;
    editDeleteEle.innerHTML = `<button class="editBtn" onclick="onEdit(this)">Edit</button> 
      <button class="deleteBtn" onclick="onDelete(this)">Delete</button>`;

    trElement.appendChild(fnameEle);
    trElement.appendChild(lnameEle);
    trElement.appendChild(markEle);
    trElement.appendChild(editDeleteEle);

    tableElement.appendChild(trElement); // Append row to tbody
  });
  // renderChart();
}

// function generateColors(count) {
//   const colors = [];
//   for (let i = 0; i < count; i++) {
//     // Generate a random color for each bar
//     colors.push(`hsl(${Math.random() * 360}, 70%, 70%)`);
//   }
//   return colors;
// }

function renderChart() {
  const labels = students.map(student => `${student.firstName} ${student.lastName}`);
  const data = students.map(student => parseFloat(student.mark));

  const barColors = [ "red", "blue", "green", "pink", "yellow", "violet"]

  // const barColors = generateColors(labels.length);

    new Chart("myChart", {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        backgroundColor: barColors, 
        data: data
      }]
    },
    options: {
      // scales:{
      //   y: {
      //     beginAtZero: true,
      //     max: 100
      //   }
      // }
      legend: { display: false },
      title: {
        display: true,
        text: "Student Marks"
      }
    }
  });
}

function onEdit(td) {
  const selectedRow = td.parentElement.parentElement;

  let fnameCell = selectedRow.cells[0];
  let lnameCell = selectedRow.cells[1];
  let markCell = selectedRow.cells[2];

  let fname = prompt("Enter the updated first name:", fnameCell.innerHTML);
  let lname = prompt("Enter the updated last name:", lnameCell.innerHTML);
  let mark = prompt("Enter the updated mark:", markCell.innerHTML);

  // Ensure that prompts are not cancelled (resulting in null values)
  if (fname !== null) fnameCell.innerHTML = fname;
  if (lname !== null) lnameCell.innerHTML = lname;
  if (mark !== null) markCell.innerHTML = mark;

  // Update students array and localStorage
  const index = td.parentElement.parentElement.rowIndex - 1; // Adjust for header row
  students[index] = {
    firstName: fnameCell.innerHTML,
    lastName: lnameCell.innerHTML,
    mark: markCell.innerHTML
  };
  localStorage.setItem("students", JSON.stringify(students));
  renderChart();
}

function onDelete(td) {
  if (confirm("Are you sure to delete this record?")) {
    const index = td.parentElement.parentElement.rowIndex - 1; // Adjust for header row
    students.splice(index, 1); // Remove from array
    localStorage.setItem("students", JSON.stringify(students)); // Update localStorage
    renderTable(); // Refresh table
  }
}

function toggleFormVisibility() {
  const x = document.getElementById("dataForm");
  x.style.display = (x.style.display === "none") ? "block" : "none";
}

function mySearch() {
  const input = document.getElementById("searchbar");
  const filter = input.value.toUpperCase();
  const table = document.getElementById("tbl");
  const tr = table.getElementsByTagName("tr");

  for (i = 1; i < tr.length; i++) {
    const tdName = tr[i].getElementsByTagName("td")[0];
    const tdSurname = tr[i].getElementsByTagName("td")[1];
    const tdMark = tr[i].getElementsByTagName("td")[2];

    const txtValueName = tdName ? tdName.textContent || tdName.innerText : '';
    const txtValueSurname = tdSurname ? tdSurname.textContent || tdSurname.innerText : '';
    const txtValueMark = tdMark ? tdMark.textContent || tdMark.innerText : '';

    if (
      txtValueName.toUpperCase().indexOf(filter) > -1 ||
      txtValueSurname.toUpperCase().indexOf(filter) > -1 ||
      txtValueMark.toUpperCase().indexOf(filter) > -1
    ) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
}

sorting.addEventListener("click", () => {
  bubbleSort();
  renderTable();
});

function bubbleSort() {
  const learn = students.length;
  for (let i = 0; i < learn; i++) {
    for (let j = 0; j < learn - 1; j++) {
      if (parseFloat(students[j].mark) > parseFloat(students[j + 1].mark)) {
        let temp = students[j];
        students[j] = students[j + 1];
        students[j + 1] = temp;
      }
    }
  }
}


















































































































































































































































// //Making Form Functional
// const firstName = document.getElementById("fname");
// const lastName = document.getElementById("lname");
// const mark = document.getElementById("Mark");
// const form = document.getElementById("dataForm");
// const sorting = document.getElementById("sort");
// const canva = document.getElementById("myChart");


// const students = JSON.parse(localStorage.getItem("students")) || [];
// document.addEventListener("DOMContentLoaded", renderTable);

// // function getChartData() {
// //   const labels = students.map(student => `${student.firstName} ${student.lastName}`);
// //   const data = students.map(student => parseFloat(student.mark));
// //   return { labels, data };
// // }



// function addStudent() {
//   const student = {
//     firstName: firstName.value,
//     lastName: lastName.value,
//     mark: mark.value,
//   };

//   if (
//     student.firstName === "" ||
//     student.lastName === "" ||
//     student.mark === ""
//   ) {
//     return;
//   }

//   students.push(student);

//   localStorage.setItem("students", JSON.stringify(students));

//   form.reset();
//   renderTable();
//   toggleFormVisibility();
//   renderChart();
// }


// function renderTable() {
//   const tableElement = document.getElementById("tbl");
//   tableElement.innerHTML = ""; // Clear existing rows

//   students.forEach(student => {
//     const trElement = document.createElement("tr");
//     const fnameEle = document.createElement("td");
//     const lnameEle = document.createElement("td");
//     const markEle = document.createElement("td");
//     const editDeleteEle = document.createElement("td");

//     fnameEle.textContent = student.firstName;
//     lnameEle.textContent = student.lastName;
//     markEle.textContent = student.mark;
//     editDeleteEle.innerHTML = `<button class="editBtn" onclick="onEdit(this)">Edit</button> 
//       <button class="deleteBtn" onclick="onDelete(this)">Delete</button>`;

//     trElement.appendChild(fnameEle);
//     trElement.appendChild(lnameEle);
//     trElement.appendChild(markEle);
//     trElement.appendChild(editDeleteEle);

//     tableElement.appendChild(trElement); // Append row to tbody
//     // renderChart();
//   });

//   console.log(students); // Add this before renderChart() in renderTable()

//   renderChart();
// }
// 4
// function generateColors(count) {
//   const colors = [];
//   for (let i = 0; i < count; i++) {
//     // Generate a random color for each bar
//     colors.push(`hsl(${Math.random() * 360}, 70%, 70%)`);
//   }
//   return colors;
// }

// function renderChart() {

//   const labels = students.map(student => `${student.firstName} ${student.lastName}`);
//   const data = students.map(student => parseFloat(student.mark));
//   // return { labels, data };

//   // const { labels, data } = getChartData();
//   const barColors = generateColors(labels.length);

//   new Chart("myChart", {
//     type: "bar",
//     data: {
//       labels: labels,
//       datasets: [{
//         backgroundColor: barColors,
//         data: data
//       }]
//     },
//     options: {
//       legend: { display: false },
//       title: {
//         display: true,
//         text: "Student Marks"
//       }
//     }
//   });

//   // window.location.reload();
// }



// function onEdit(td) {
//   const selectedRow = td.parentElement.parentElement;

//   let fnameCell = selectedRow.cells[0];
//   let lnameCell = selectedRow.cells[1];
//   let markCell = selectedRow.cells[2];

//   let fname = prompt("Enter the updated name:", fnameCell.innerHTML);

//   let lname = prompt("Enter the updated name:", lnameCell.innerHTML);

//   let Mark = prompt("Enter the updated name:", markCell.innerHTML);

//   fnameCell.innerHTML = fname;
//   lnameCell.innerHTML = lname;
//   markCell.innerHTML = Mark;

//  // Update students array and localStorage
//  const index = td.parentElement.parentElement.rowIndex - 1; // Adjust for header row
//  students[index] = {
//    firstName: fnameCell.innerHTML,
//    lastName: lnameCell.innerHTML,
//    mark: markCell.innerHTML
//  };
//  localStorage.setItem("students", JSON.stringify(students));
//  renderChart();
// }



// function onDelete(td) {
//   if (confirm("Are you sure to delete this record ?")) {
//     const index = td.parentElement.parentElement.rowIndex - 1; // Adjust for header row
//     students.splice(index, 1); // Remove from array
//     localStorage.setItem("students", JSON.stringify(students)); // Update localStorage
//     renderTable(); // Refresh table
//   }
// }



// function toggleFormVisibility() {
//   const x = document.getElementById("dataForm");
//   x.style.display = (x.style.display === "none") ? "block" : "none";
// }



// function mySearch() {
//   const input = document.getElementById("searchbar");
//   const filter = input.value.toUpperCase();
//   const table = document.getElementById("tbl");
//   const tr = table.getElementsByTagName("tr");

//   for (i = 1; i < tr.length; i++) {
//     const tdName = tr[i].getElementsByTagName("td")[0];
//     const tdSurname = tr[i].getElementsByTagName("td")[1];
//     const tdMark = tr[i].getElementsByTagName("td")[2];

//       const txtValueName = tdName ? tdName.textContent || tdName.innerText: '';
//       const txtValueSurname = tdSurname ? tdSurname.textContent || tdSurname.innerText: '';
//       const txtValueMark = tdMark ? tdMark.textContent || tdMark.innerText: '';

//       if (
//         txtValueName.toUpperCase().indexOf(filter) > -1 ||
//         txtValueSurname.toUpperCase().indexOf(filter) > -1 ||
//         txtValueMark.toUpperCase().indexOf(filter) > -1
//       ) {
//         tr[i].style.display = "";
//       } else {
//         tr[i].style.display = "none";
//       }
//     }
//   }

//   sorting.addEventListener("click", () => {
//     bubbleSort();
//     renderTable();
//   });

// function bubbleSort() {
//   const learn = students.length;
//   for (let i = 0; i < learn; i++) {
//     for (let j = 0; j < learn - 1; j++) {
//       if (parseFloat(students[j].mark) > parseFloat(students[j + 1].mark)) {
//         let temp = students[j];
//         students[j] = students[j + 1];
//         students[j + 1] = temp;
//       }
//     }
//   }
// }





// let student_serialized = JSON.stringify(student);

// localStorage.setItem('student', student_serialized);

// console.log(localStorage);

// const storedUserData = JSON.parse(localStorage.getItem("student"));

// console.log(storedUserData);

// const firstName = document.getElementById('fname');
// const lastName = document.getElementById('lname');
// const mark = document.getElementById('Mark');
// const button = document.getElementById('btn1');
// const dis = document.getElementById('Display-Data');

// // const students = [];

// function addStudent() {

//   const student = {firstName: firstName, lastName: lastName.value, mark: mark.value}

// //   students.push(student);

//   console.log(student);

//   document.getElementById("dataForm").reset();

// //   dis.innerHTML = Display-Data;

// }

// button.addEventListener('click',addStudent);
