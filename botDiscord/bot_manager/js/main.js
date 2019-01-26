$(window).on("load", () => {
  $('#authModal').modal('show');
});

const handleStatus = res => {
  if(res.status == 401) $('#failAuthModal').modal('show');
}

const apiUrl = `${window.location.protocol}//${window.location.hostname}:4000`;
const authForm = document.getElementById("authForm");
const failAuthBtn = document.getElementById("failAuthBtn");
const sayOnForm = document.getElementById("sayOnForm");

let getAuth = () => {
  return "";
}




const getCanaux = () => {
  fetch(`${apiUrl}/canaux`, {
    method: 'GET',
    headers: {'Authorization': getAuth()}
  }).then(res => {
    handleStatus(res);
    return res.json();
  }).then(canaux => {
    const canauxSelectors = document.getElementsByClassName("canauxSelector");

    for (let canauxSelector of canauxSelectors) {
      for (let c of canaux) {
        const option = document.createElement("option");

        option.value = c;
        option.innerHTML = c;

        canauxSelector.appendChild(option);
      }
    }
  });
}




authForm.onsubmit = () => {
  const auth = document.getElementById("auth").value;

  getAuth = () => {
    return auth;
  }

  $('#authModal').modal('hide');

  getCanaux();

  return false;
}

failAuthBtn.onclick = () => {
  location.reload();
}

sayOnForm.onsubmit = () => {
  const canal = document.getElementById("channel").value;
  const msg = document.getElementById("msg").value;
  const delay = document.getElementById("delay").value;

  const data = {
    channel: canal,
    msg: msg,
    delay: delay
  }

  fetch(`${apiUrl}/sayOn`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json', 'Authorization': getAuth()},
    body: JSON.stringify(data)
  }).then(res => {
    handleStatus(res);
  });

  $('#sayModal').modal('hide');

  return false;
}
