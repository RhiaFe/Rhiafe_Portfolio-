// Theme toggle (remembers choice)
const root = document.documentElement;
const toggle = document.getElementById("themeToggle");
const setTheme = (t) => {
  root.setAttribute("data-theme", t);
  toggle.textContent = t === "dark" ? "☀️" : "🌙";
  try { localStorage.setItem("theme", t); } catch (e) {}
};
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
setTheme(saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
toggle.addEventListener("click", () => setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark"));

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Recommendations carousel
const items = document.querySelectorAll(".reco-item");
const dots = document.getElementById("recoDots");
let idx = 0;
const show = (i) => {
  items.forEach((el, n) => el.classList.toggle("active", n === i));
  dots.querySelectorAll("button").forEach((d, n) => d.classList.toggle("active", n === i));
  idx = i;
};
items.forEach((_, i) => {
  const b = document.createElement("button");
  b.setAttribute("aria-label", `Recommendation ${i + 1}`);
  b.addEventListener("click", () => show(i));
  dots.appendChild(b);
});
show(0);
setInterval(() => show((idx + 1) % items.length), 6000);

document.getElementById("year").textContent = new Date().getFullYear();
