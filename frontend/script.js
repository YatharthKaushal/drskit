const tableContainer = document.getElementById("table-body");

async function getAll() {
  const res = await fetch("http://localhost:3000/api/getall/", {
    method: "GET",
  });

  let result = await res.json();
  result = result.data[0];

  const tableData = result.map((data, index) => {
    const date_time = data.date_time.split("/");
    // console.log("tabledata: ", data);
    return `<tr style="background-color: ${index % 2 ? "#fff" : "#f5f5f5"};">
  <td style="color:grey">${index + 1}</td>
  <td style="text-align: start">
  <ul>
  <li class="underline-on-hover">
  ${data.patient_name}
  </li>
  <li style="color:grey; font-size: small;">
  ${data.for_dr}
  </li>
    </ul>
    </td>
    <td>${data.visit_type}</td>
    <td>${date_time[0]}</td>
    <td>${date_time[1]}</td>
    <td>${data.status}</td>
    <td>
    <button style="color:#6495ed">
    <a href="updateAppointment.html?id=${data.id}&name=${
      data.patient_name
    }&phone=${data.patient_phone}&visit=${data.visit_type}&status=${
      data.status
    }&dr=${data.for_dr}&date-time=${data.date_time}">
    <i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i>
    </a></button>
    <button onclick="handleDeleteAppointment(event, ${
      data.id
    })" style="color:#ff0000">
    <i class="fa fa-trash fa-2x" aria-hidden="true"></i>
    </button>
    </td>
    </tr>`;
  });

  // console.log(tableData);

  tableContainer.innerHTML = tableData.join("");
}

getAll();

async function handleAddAppointment(e) {
  e.preventDefault();
  const name = document.getElementById("name-input");
  const phone = document.getElementById("phone-input");
  const visit = document.getElementById("visit-input");
  const status = document.getElementById("status-input");
  const doctor = document.getElementById("dr-input");
  const date = document.getElementById("date-input");
  const time = document.getElementById("time-input");

  const data = {
    patient_name: name.value,
    patient_phone: phone.value,
    visit_type: visit.value,
    status: status.value,
    for_dr: doctor.value,
    date_time: date.value + "/" + time.value,
  };
  const res = await fetch("http://localhost:3000/api/add", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  window.location.href = "index.html";
}

async function handleUpdateAppointment(e) {
  e.preventDefault();
  const name = document.getElementById("name-input");
  const phone = document.getElementById("phone-input");
  const visit = document.getElementById("visit-input");
  const status = document.getElementById("status-input");
  const doctor = document.getElementById("dr-input");
  const date = document.getElementById("date-input");
  const time = document.getElementById("time-input");

  // console.log(
  //   "clicked: ",
  //   name.value,
  //   phone.value,
  //   visit.value,
  //   status.value,
  //   doctor.value,
  //   date.value,
  //   time.value
  // );

  // console.log(window.location.search);

  const id = urlParams.get("id");
  const data = {
    patient_name: name.value,
    patient_phone: phone.value,
    visit_type: visit.value,
    status: status.value,
    for_dr: doctor.value,
    date_time: date.value + "/" + time.value,
  };
  const res = await fetch("http://localhost:3000/api/update", {
    method: "POST",
    body: JSON.stringify({ id, data }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  window.location.href = "index.html";
}

async function handleDeleteAppointment(e, id) {
  const res = await fetch("http://localhost:3000/api/delete", {
    method: "POST",
    body: JSON.stringify({ id: id }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  window.location.reload();
}

async function handleSearch() {
  const phone = document.getElementById("search-input");
  if (!phone.value == "") {
    document.getElementById("search-result").classList.toggle("hide");

    const res = await fetch("http://localhost:3000/api/search", {
      method: "POST",
      body: JSON.stringify({ phone: phone.value }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    let data = await res.json();

    const searchResult = document.getElementById("search-body");

    data = data.data;
    if (data.length == 0) {
      searchResult.innerHTML = `<tr style="border: none">
      <td colspan="7" style="border: none">no results matched</td>
      </tr>
      <tr style="border: none">
      <td
      style="
      font-size: small;
      color: gray;
      cursor: pointer;
      border: none;
      "
      onclick="hideSearchResults()"
      >
      clear search
      </td>
      </tr>`;
      return;
    }

    const resultData = data.map((data) => {
      const date_time = data.date_time.split("/");
      return `<tr>
  <td style="color:grey; border: none; 
  padding: 0 0.25rem;">#</td>
  <td style="text-align: start; border: none">
  <ul>
  <li class="underline-on-hover">
  ${data.patient_name}
  </li>
  <li style="color:grey; font-size: small;">
  ${data.for_dr}
  </li>
    </ul>
    </td>
    <td style="border: none">${data.visit_type}</td>
    <td style="border: none">${date_time[0]}</td>
    <td style="border: none">${date_time[1]}</td>
    <td style="border: none">${data.status}</td>
    <td style="border: none">
    <button style="color:#6495ed">
    <a href="updateAppointment.html?id=${data.id}&name=${data.patient_name}&phone=${data.patient_phone}&visit=${data.visit_type}&status=${data.status}&dr=${data.for_dr}&date-time=${data.date_time}"> 
    <i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i>
    </a></button>
    <button onclick="handleDeleteAppointment(event, ${data.id})" style="color:#ff0000">
    <i class="fa fa-trash fa-2x" aria-hidden="true"></i>
    </button>
    </td>
    </tr>
    <tr style="border: none">
      <td
      colspan="7" 
      style="
      font-size: small;
      color: gray;
      cursor: pointer;
      border: none;
      "
      onclick="hideSearchResults()"
      >
      clear search
      </td>
      </tr>`;
    });

    searchResult.innerHTML = resultData.join("");
  }
}

function hideSearchResults() {
  const searchResults = document.getElementById("search-result");
  document.getElementById("search-input").value = "";
  searchResults.classList.toggle("hide");
}
