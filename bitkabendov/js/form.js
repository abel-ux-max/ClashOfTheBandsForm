const steps = document.querySelectorAll(".step");
const progress = document.querySelectorAll(".progress div");
let current = 0;

function showStep(i) {
  steps.forEach((s, idx) => s.classList.toggle("active", idx === i));
  progress.forEach((p, idx) => p.classList.toggle("active", idx === i));
}

document.querySelectorAll(".next").forEach(btn => {
  btn.addEventListener("click", () => {
    const inputs = steps[current].querySelectorAll("input[required]");
    let allValid = true;
    inputs.forEach(inp => {
      if (!inp.checkValidity()) {
        inp.reportValidity();
        allValid = false;
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