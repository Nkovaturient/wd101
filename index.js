const btn = document.getElementById("btn");

btn.addEventListener("click", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const terms = document.getElementById("agree").checked;
  
  let errorMessage = document.getElementById('error-message');
  errorMessage.textContent = '';
  
  // Email validation 
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    errorMessage.textContent = '⚠ Please enter a valid email address! ⚠';
    return;
  }

   // Age validation (between 18 and 55 years old)
   const birthDate = new Date(dob);
   const today = new Date();
   
   let age = today.getFullYear() - birthDate.getFullYear();
   let monthDifference = today.getMonth() - birthDate.getMonth();
   if (
     monthDifference < 0 ||
     (monthDifference === 0 && today.getDate() < birthDate.getDate())
   ) {
     age--;
   }
 
   if (age < 18 || age > 55) {
     errorMessage.textContent = '⚠ You must be between 18 and 55 years old to register! ⚠';
     return;
   }

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
  alert('Congo! 🎉🎊You were registered successfully!');
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
