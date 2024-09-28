const btn = document.getElementById("btn");

btn.addEventListener("click", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const terms = document.getElementById("agree").checked;

  const registered = {
    name,
    email,
    password,
    dob,
    terms,
  };

  storeUserEntry(registered);
  document.getElementById("entry-form").reset();
  
  addEntryToTable(registered);
});

const storeUserEntry = (entries) => {
  const entry = localStorage.getItem("registered-user");
  const parseEntry=JSON.parse(entry) || [];
  parseEntry.push(entries);
  localStorage.setItem("registered-user", JSON.stringify(parseEntry));
};

const displaySavedEntries = () => {
  const entries = JSON.parse(localStorage.getItem("registered-user")) || [];
  entries.forEach(addEntryToTable);
};

const addEntryToTable = (entry) => {
  const tableBody = document.getElementById("tablebody");
  const tablerow = document.createElement("tr");

  Object.values(entry).forEach((data) => {
    const tabledata = document.createElement("td");
    tabledata.textContent = data;
    tablerow.appendChild(tabledata);
  });
  tablerow.classList.add("table-row");
  tableBody.appendChild(tablerow);

//   console.log(tablerow); 

};

window.onload =() => {
  displaySavedEntries();
};
