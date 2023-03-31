    
      const deleteBtn = document.getElementsByClassName("myButton")[0].getAttribute("data-link");
const dltBtn = document.getElementsByClassName("myButton")[0];

console.log(dltBtn);
dltBtn.addEventListener("click",(eo) => {
  console.log("clicked");
  fetch(`/index/${deleteBtn}`,{method:'DELETE'})
  .then((response) => response.json())
  .then((data) =>  window.location.href = data.myindex)
  .catch((err) => {  console.log(err)})
})