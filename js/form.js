const steps = document.querySelectorAll(".step");
const progress = document.querySelectorAll(".progress div");
const lang = document.documentElement.lang || "sl";
/* burek velikonocno jajce*/
let current = 0;

function showStep(i) {
  for (var idx = 0; idx < steps.length; idx++) {
    steps[idx].classList.toggle("active", idx === i);
  }
  for (var idx = 0; idx < progress.length; idx++) {
    progress[idx].classList.toggle("active", idx === i);
  }
}

document.querySelectorAll(".next").forEach(btn => {
  btn.addEventListener("click", () => {
    const inputs = steps[current].querySelectorAll("input[required], textarea[required]");
    let allValid = true;
    inputs.forEach(inp => {
      inp.classList.remove("error");
      if (!inp.checkValidity()) {
        inp.reportValidity();
        allValid = false;
        if (inp.validity.valueMissing) {
          Swal.fire({
            icon: "warning",
            title: lang.startsWith("en") ? "Missing fields!" : "Prazna polja!",
            text: lang.startsWith("en") ? "Please fill in all required fields before submitting." : "Prosimo, izpolnite vsa zahtevana polja pravilno pred oddajo.",
            confirmButtonColor: "#9c0000"
          });
          inp.classList.toggle("error");
        }
        if(inp.validity.patternMismatch){
          Swal.fire({
            icon: "warning",
            title: lang.startsWith("en") ? "Wrong number format!" : "Napačen format telefonske številke!",
            text: lang.startsWith("en") ? "Please fill in the rquired pattern 031 230 230." : "Prosimo, izpolnite v zaželeni obliki 031 230 120.",
            confirmButtonColor: "#9c0000"
          });
          inp.classList.toggle("error");
        }
        if(inp.validity.typeMismatch){
          if(inp.type === "email"){
            Swal.fire({
            icon: "warning",
            title: lang.startsWith("en") ? "Email is not valid!" : "Email ni prou bumbar!",
            text: lang.startsWith("en") ? "Please make sure that the email is valid." : "Email mora biti veljaven!",
            confirmButtonColor: "#9c0000"
          });
          inp.classList.toggle("error");
          }
          if(inp.type === "url"){
            Swal.fire({
            icon: "warning",
            title: lang.startsWith("en") ? "Email is not valid!" : "Povezava ni pravilna!",
            text: lang.startsWith("en") ? "Please make sure that the email is valid." : "Povezava mora biti veljavna...s",
            confirmButtonColor: "#9c0000"
          });
          inp.classList.toggle("error");
          }
          
        }
          


        return;

      }
    });
    if (allValid && current < steps.length - 1) current++;
    showStep(current);
    inp.classList.remove("error");
  });
});

document.querySelectorAll(".prev").forEach(btn => {
  btn.addEventListener("click", () => {
    if (current > 0) current--;
    showStep(current);
  });
});


document.querySelector("#signform").addEventListener("submit", e => {
  e.preventDefault();


  Swal.fire({
    icon: "success",
    title: lang.startsWith("en") ? "Submission successful!" : "Oddaja uspešna!",
    text: lang.startsWith("en") ? "Thank you for registering for the Battle of the Bands." : "Hvala za prijavo na Bitko bendov.",
    confirmButtonColor: "#9c0000"
  }).then(() => {
    document.querySelector("#signform").reset();
    current = 0;
    showStep(current);
  });



});