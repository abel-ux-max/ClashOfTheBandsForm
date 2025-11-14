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
            title: lang.startsWith("en") ? "Missing information" : "Manjkajoči podatki",
            text: lang.startsWith("en")
              ? "Please fill in all required fields before continuing."
              : "Prosimo, izpolnite vsa obvezna polja pred nadaljevanjem.",
            confirmButtonColor: "#9c0000"
          });
          inp.classList.toggle("error");
        }
        if (inp.validity.patternMismatch) {
          Swal.fire({
            icon: "warning",
            title: lang.startsWith("en") ? "Invalid phone number" : "Neveljaven telefon",
            text: lang.startsWith("en")
              ? "Please enter a valid phone number in the format 031 234 567."
              : "Vnesite veljavno telefonsko številko v obliki 031 234 567.",
            confirmButtonColor: "#9c0000"
          });
          inp.classList.toggle("error");
        }
        if (inp.validity.typeMismatch) {
          if (inp.type === "email") {
            Swal.fire({
              icon: "warning",
              title: lang.startsWith("en") ? "Invalid email address" : "Neveljaven email",
              text: lang.startsWith("en")
                ? "Please enter a valid email address."
                : "Vnesite veljaven e-poštni naslov.",
              confirmButtonColor: "#9c0000"
            });
            inp.classList.toggle("error");
          }
          if (inp.type === "url") {
            Swal.fire({
              icon: "warning",
              title: lang.startsWith("en") ? "Invalid link" : "Neveljavna povezava",
              text: lang.startsWith("en")
                ? "Please enter a valid link that starts with http:// or https://."
                : "Vnesite veljavno povezavo, ki se začne s http:// ali https://.",
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