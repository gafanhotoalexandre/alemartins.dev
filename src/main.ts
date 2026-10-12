type Theme = "light" | "dark";

function element<T extends Element>(selector: string): T {
  const found = document.querySelector<T>(selector);
  if (!found) throw new Error(`Elemento obrigatório ausente: ${selector}`);
  return found;
}

const root = document.documentElement;
const themeButton = element<HTMLButtonElement>("#themeBtn");
const themeIcon = element<SVGElement>("#themeIcon");
const themeColor = element<HTMLMetaElement>('meta[name="theme-color"]');
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
let explicitTheme = false;
try {
  const saved = localStorage.getItem("am-theme");
  explicitTheme = saved === "light" || saved === "dark";
} catch {
  /* The system preference remains available when storage is blocked. */
}

function applyTheme(theme: Theme, save = false): void {
  const dark = theme === "dark";
  root.dataset.theme = theme;
  themeButton.setAttribute("aria-pressed", String(dark));
  themeButton.setAttribute(
    "aria-label",
    dark ? "Ativar tema claro" : "Ativar tema escuro",
  );
  themeIcon.innerHTML = dark
    ? '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>'
    : '<path d="M20.1 15.1A8 8 0 0 1 8.9 3.9a8.2 8.2 0 1 0 11.2 11.2Z"/>';
  themeColor.content = dark ? "#141e1b" : "#f3f0e8";
  if (save) {
    explicitTheme = true;
    try {
      localStorage.setItem("am-theme", theme);
    } catch {
      /* Keep the choice for this visit. */
    }
  }
}

applyTheme(root.dataset.theme === "dark" ? "dark" : "light");
themeButton.addEventListener("click", () =>
  applyTheme(root.dataset.theme === "dark" ? "light" : "dark", true),
);
systemTheme.addEventListener("change", (event) => {
  if (!explicitTheme) applyTheme(event.matches ? "dark" : "light");
});

const menuButton = element<HTMLButtonElement>("#menuBtn");
const mobileNav = element<HTMLElement>("#mobileNav");
function setMenu(open: boolean): void {
  if (!open && mobileNav.contains(document.activeElement)) {
    menuButton.focus({ preventScroll: true });
  }
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  mobileNav.hidden = !open;
}
setMenu(false);
menuButton.addEventListener("click", () => setMenu(mobileNav.hidden === true));
mobileNav.querySelectorAll<HTMLAnchorElement>("a").forEach((link) => {
  link.addEventListener("click", () => {
    setMenu(false);
    const target = document.querySelector<HTMLElement>(link.hash);
    if (target) {
      target.tabIndex = -1;
      target.focus({ preventScroll: true });
    }
  });
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !mobileNav.hidden) {
    setMenu(false);
    menuButton.focus();
  }
});
document.addEventListener("click", (event) => {
  if (
    !mobileNav.hidden &&
    event.target instanceof Element &&
    !event.target.closest(".site-header")
  )
    setMenu(false);
});
window.matchMedia("(min-width: 901px)").addEventListener("change", (event) => {
  if (event.matches) {
    if (mobileNav.contains(document.activeElement))
      element<HTMLAnchorElement>(".header-brand").focus();
    setMenu(false);
  }
});

const copyButton = element<HTMLButtonElement>("#copyEmail");
const copyStatus = element<HTMLElement>("#copyStatus");
const emailLink = element<HTMLAnchorElement>("#emailLink");
copyButton.addEventListener("click", async () => {
  copyButton.disabled = true;
  copyStatus.textContent = "";
  try {
    await navigator.clipboard.writeText(
      emailLink.getAttribute("href")!.slice("mailto:".length),
    );
    copyStatus.textContent = "E-mail copiado.";
  } catch {
    copyStatus.textContent =
      "Não foi possível copiar. O endereço está no link de e-mail.";
  } finally {
    copyButton.disabled = false;
  }
});
element<HTMLElement>("#year").textContent = String(new Date().getFullYear());

// Expose only wired controls; the original HTML remains useful without this module.
root.classList.add("js-ready");
themeButton.hidden = menuButton.hidden = copyButton.hidden = false;

const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const reveals = document.querySelectorAll<HTMLElement>(".reveal");
if ("IntersectionObserver" in window && !motionQuery.matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("is-pending");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05 },
  );
  reveals.forEach((reveal) => {
    observer.observe(reveal);
    reveal.classList.add("is-pending");
  });
  motionQuery.addEventListener("change", (event) => {
    if (event.matches) {
      observer.disconnect();
      reveals.forEach((reveal) => reveal.classList.remove("is-pending"));
    }
  });
}
