const steps = document.querySelectorAll(".step");
const progress = document.querySelectorAll(".progress div");
const lang = document.documentElement.lang || "sl";
 
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
      if (!inp.checkValidity()) {
        inp.reportValidity();
        allValid = false;
        Swal.fire({
        icon: "warning",
        title: lang.startsWith("en") ? "Missing fields!" : "Prazna polja!",
        text: lang.startsWith("en") ? "Please fill in all required fields before submitting." : "Prosimo, izpolnite vsa zahtevana polja pravilno pred oddajo.",
        confirmButtonColor: "#9c0000"
      });

        return;

      }
    });
    if (allValid && current < steps.length - 1) current++;
    showStep(current);
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