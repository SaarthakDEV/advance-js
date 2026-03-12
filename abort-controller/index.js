// import axios from "axios";

const buttonEle = document.getElementById("call-button");
const responseLog = document.getElementById("container")

buttonEle.addEventListener("click", () => {
  initiateApiAxios();
});

let controller = new AbortController();
let signal = controller.signal;

const initiateApi = async () => {
    if(controller){
        controller.abort();
        controller = new AbortController();
        signal = controller.signal;
    }
  fetch("https://dummyjson.com/test", { signal })
    .then((res) => res.json())
    .then(data => {
        responseLog.innerHTML = JSON.stringify(data)
    });
};

const initiateApiAxios = async () => {
    if(controller){
        controller.abort();
        controller = new AbortController();
        signal = controller.signal;
    }
  axios.post("https://dummyjson.com/test", undefined, { signal })
    .then(data => {
        responseLog.innerHTML = JSON.stringify(data?.data)
    });
};
