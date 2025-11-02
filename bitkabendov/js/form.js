const steps = document.querySelectorAll(".step");
const progress = document.querySelectorAll(".progress div");
let current = 0;

function showStep(i) {
  steps.forEach((s, idx) => s.classList.toggle("active", idx === i));
  progress.forEach((p, idx) => p.classList.toggle("active", idx === i));
}

document.querySelectorAll(".next").forEach(btn => {
  btn.addEventListener("click", () => {
    const inputs = steps[current].querySelectorAll("input[required], textarea[required]");
    let allValid = true;
    inputs.forEach(inp => {
      if (!inp.checkValidity()) {
        inp.reportValidity();
        allValid = false;
        if (lang.startsWith("en")) {
          Swal.fire({
            icon: "warning",
            title: "Missing fields",
            text: "Please fill in all required fields before submitting.",
            confirmButtonColor: "#9c0000"
          });
        }
        else if (lang.startsWith("sl")) {
          Swal.fire({
            icon: "warning",
            title: "Prazna polja",
            text: "Prosimo izpolnite vsa polja pravilno pred oddajo.",
            confirmButtonColor: "#9c0000"
          });
        }

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



  if (lang.startsWith("en")) {
    Swal.fire({
      icon: "success",
      title: "Submission successful!",
      text: "Thank you for registering for the Clash of the Bands.",
      confirmButtonColor: "#9c0000"
    }).then(() => {
      document.querySelector("#signform").reset();
      current = 0;
      showStep(current);
    });
  }
  else if (lang.startsWith("sl")) {
    Swal.fire({
      icon: "success",
      title: "Oddaja uspešna!",
      text: "Hvala za prijavo na Bitko bendov.",
      confirmButtonColor: "#9c0000"
    }).then(() => {
      document.querySelector("#signform").reset();
      current = 0;
      showStep(current);
    });
  }


});