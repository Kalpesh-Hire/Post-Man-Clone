console.log("Postman clone");
// utility functios:
// 1. utility function to get DOM element from string
function getElementFromString(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}

// initialize number of parameters
let addedParamsCount = 0;

// Hide the parameters box initially
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = "none";

// if the user clicks on params box, hide the json box
let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", () => {
  document.getElementById("requestJsonBox").style.display = "none";
  document.getElementById("parametersBox").style.display = "block";
});

// if the user clicks on json box, hide the params box
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
  document.getElementById("requestJsonBox").style.display = "block";
  document.getElementById("parametersBox").style.display = "none";
});

// if the user click + button add more parameters
let addParam = document.getElementById("addParam");
addParam.addEventListener("click", () => {
  let params = document.getElementById("params");
  let string = ` <div class="row g-3 my-1">
                        <label for="url" class="col-sm-2 col-form-label">Parameter ${
                          addedParamsCount + 2
                        }</label>
                        <div class="col-md-4">
                            <input type="text" id="parameterKey${
                              addedParamsCount + 2
                            }" class="form-control" placeholder="Enter parameter ${
    addedParamsCount + 2
  } key"
                                aria-label="First name">
                        </div>
                        <div class="col-md-4">
                            <input type="text" id="parameterValue${
                              addedParamsCount + 2
                            }" class="form-control" placeholder="Enter parameter ${
    addedParamsCount + 2
  } value"
                                aria-label="Last name">
                        </div>
                        <button class="btn btn-primary col-auto deleteParam">-</button>
                    </div>`;
  // convert element string to DOM node

  let paramElement = getElementFromString(string);
  params.appendChild(paramElement);
  // add an event listener to remove the parameters on clicking - button
  let deleteParam = document.getElementsByClassName("deleteParam");
  for (item of deleteParam) {
    item.addEventListener("click", (e) => {
      e.target.parentElement.remove();
    });
  }

  addedParamsCount++;
});

// if the user click on submit button
let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  // show please wait in the responce box to request patience from the user
  document.getElementById("responseJsonText").value =
    "Plz wait..Your responce fetching";

  // fetch all the values users has entered

  let url = document.getElementById("urlField").value;
  let requestType = document.querySelector(
    "input[name='requestType']:checked"
  ).value;
  let contentType = document.querySelector(
    "input[name='contentType']:checked"
  ).value;

  

  // if user has used params option instead of json, collect all the parameters in an object
  if (contentType == 'params') {
    data = {};
    for (let i = 0; i < addedParamsCount + 1; i++) {
      if (document.getElementById("parameterKey" + (i + 1)) != undefined) {
        let key = document.getElementById("parameterKey" + (i + 1)).value;
        let value = document.getElementById("parameterValue" + (i + 1)).value;
        data[key] = value;
      }
    }
    data = JSON.stringify(data);
  }
  else{
    data = document.getElementById('requestJsonText').value;
  }

  // log all the values in the console for debugging
  console.log("URL is", url);
  console.log("Request type is", requestType);
  console.log("Content type is", contentType);
  console.log("Data is", data);

//   if the request type is get, invoke fetch api to create a post request
  if(requestType =='GET'){
    fetch(url, {
        method:'GET',
    })
    .then(response=> response.text())
    .then((text) =>{
        document.getElementById("responseJsonText").value = text;
    });
  }

  else{
    fetch(url, {
        method:'POST',
        body:data,
        headers:{
            "Content-type":"application/json; charset=UTF-8"
        }
    })
    .then(response=> response.text())
    .then((text) =>{
        document.getElementById("responseJsonText").value = text;
    });
  }


});
