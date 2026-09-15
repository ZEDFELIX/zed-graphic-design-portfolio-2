const yearEls = document.querySelectorAll("#year, .year");
yearEls.forEach((el) => {
  el.textContent = new Date().getFullYear();
});

const header = document.getElementById("siteHeader");
if (header) {
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
if (menuToggle && nav) {
  const setMenu = (open) => {
    menuToggle.classList.toggle("is-open", open);
    nav.classList.toggle("is-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  };
  menuToggle.addEventListener("click", () => {
    setMenu(!nav.classList.contains("is-open"));
  });
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) setMenu(false);
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) setMenu(false);
  });
}

const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-in"));
}

const transitionEl = document.querySelector(".transition");
function leavePage(url) {
  document.documentElement.classList.add("is-leaving");
  transitionEl.classList.add("is-active");
  setTimeout(() => {
    window.location.assign(url);
  }, 420);
}

document.addEventListener("click", (e) => {
  const link = e.target.closest('a[href]');
  if (!link) return;
  const href = link.getAttribute("href");
  if (!href || href.startsWith("#")) return;
  if (href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel")) return;
  if (link.target === "_blank") return;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
  e.preventDefault();
  leavePage(href);
});

function filterWork(category, btn) {
  const items = document.querySelectorAll(".gallery [data-type]");
  items.forEach((item) => {
    const type = item.dataset.type;
    item.classList.toggle("is-hidden", category !== "all" && type !== category);
  });
  const chips = document.querySelectorAll(".filter-bar .filter-chip");
  chips.forEach((c) => {
    const active = c === btn;
    c.classList.toggle("is-active", active);
    c.setAttribute("aria-pressed", String(active));
  });
}

const cases = {
  brand: {
    kicker: "case no.001 — branding",
    title: "Brand Identity",
    desc: "A full identity — logo, color, type and rules — built to be recognised at a glance.",
    image: "brand identity (2).jpeg",
    alt: "Brand identity project by Zed",
    summary:
      "Identity work that goes further than a logo. This project covered the mark, the color story, typography and how it all plays together across print, screens and the feed. Designed loud enough to stand out, disciplined enough to stay consistent.",
    tags: ["identity", "logo", "branding"],
  },
  logo: {
    kicker: "case no.002 — branding",
    title: "Logo System",
    desc: "A flexible logo family that works everywhere from a favicon to a billboard.",
    image: "logo.jpeg",
    alt: "Logo system design by Zed",
    summary:
      "One idea, many faces. This logo system was built modular — primary, secondary and compact versions that each keep the same personality at any size or format.",
    tags: ["logo", "system", "identity"],
  },
  guidelines: {
    kicker: "case no.003 — branding",
    title: "Brand Guidelines",
    desc: "The rulebook that keeps a brand looking sharp no matter who’s holding the pen.",
    image: "brand guidlines.jpeg",
    alt: "Brand guidelines design by Zed",
    summary:
      "Guidelines are the insurance policy of a brand. This document locks in the logo usage, palette, type hierarchy and spacing so the identity survives contact with the real world.",
    tags: ["guidelines", "branding", "documentation"],
  },
  ui: {
    kicker: "case no.004 — UI design",
    title: "Website UI",
    desc: "A clean interface that puts the content first and the next step front and centre.",
    image: "website ui (2).jpeg",
    alt: "Website UI design project by Zed",
    summary:
      "Structure, hierarchy, rhythm. This interface work focused on how people actually read a page — clear grids, honest typography and a layout that makes every click feel obvious.",
    tags: ["interface", "web", "ui/ux"],
  },
  mobile: {
    kicker: "case no.005 — UI design",
    title: "Mobile App UI",
    desc: "Thumb-friendly screens with big targets, bold contrast and zero dead ends.",
    image: "mobile ui.jpeg",
    alt: "Mobile app UI design by Zed",
    summary:
      "Mobile is a small stage, so every pixel earns its place. This UI keeps actions loud, nav simple and content swipeable — quick to learn, quicker to use.",
    tags: ["mobile", "app", "ui/ux"],
  },
  dashboard: {
    kicker: "case no.006 — UI design",
    title: "Dashboard UI",
    desc: "Data that reads instantly — dense, but never cluttered.",
    image: "dashboard ui.jpeg",
    alt: "Dashboard UI design by Zed",
    summary:
      "Dashboards live or die on hierarchy. This design groups data into scannable modules with clear visual weight, so the important number is always the one you find first.",
    tags: ["dashboard", "data", "ui/ux"],
  },
  social: {
    kicker: "case no.007 — social",
    title: "Instagram Post",
    desc: "Feed content engineered to stop a thumb mid-scroll.",
    image: "social media design.jpeg",
    alt: "Social media post design by Zed",
    summary:
      "One post, one idea, executed at full volume. Strong contrast, oversized type and a single focal point — the recipe for content that gets noticed, not ignored.",
    tags: ["social", "content", "feed"],
  },
  ad: {
    kicker: "case no.008 — social",
    title: "Ad Design",
    desc: "Small space, big hook — ads built to earn the click.",
    image: "add design.jpeg",
    alt: "Ad design by Zed",
    summary:
      "The best ads read in half a second. This creative leads with a single bold promise, clear action and brand styling that never gets lost in a crowded feed.",
    tags: ["ads", "campaign", "social"],
  },
  poster: {
    kicker: "case no.009 — social",
    title: "Campaign Poster",
    desc: "A poster with real volume — layout, color and type working overtime.",
    image: "campaing poster.jpeg",
    alt: "Campaign poster design by Zed",
    summary:
      "Posters have one chance to land. This campaign visual stacks oversized type, high-contrast color and composition that reads at street distance.",
    tags: ["poster", "campaign", "print"],
  },
};

function loadCase() {
  const title = document.getElementById("caseTitle");
  const kicker = document.getElementById("caseKicker");
  const desc = document.getElementById("caseDesc");
  const image = document.getElementById("caseImage");
  const summary = document.getElementById("caseSummary");
  const tags = document.getElementById("caseTags");
  const hero = document.getElementById("caseHero");
  if (!title || !image) return;

  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");
  const data = cases[type] || cases.brand;

  title.textContent = data.title;
  kicker.textContent = data.kicker;
  desc.textContent = data.desc;
  image.src = data.image;
  image.alt = data.alt;
  if (summary) summary.textContent = data.summary;
  if (tags) {
    tags.innerHTML = "";
    data.tags.forEach((tag) => {
      const li = document.createElement("li");
      li.textContent = tag;
      tags.appendChild(li);
    });
  }
  document.title = data.title + " — ZED | Graphic Designer";
  if (hero) {
    const colors = ["--cyan", "--lime", "--yellow", "--pink"];
    const frame = document.querySelector(".case-frame");
    if (frame) {
      frame.style.backgroundColor = `var(${colors[Math.floor(Math.random() * colors.length)]})`;
    }
  }
}

function sendMessage() {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const response = document.getElementById("response");
  if (!response) return;

  const valid = name && email && message;
  const filled = valid && name.value.trim() && email.value.trim() && message.value.trim();
  const emailOk = valid && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());

  if (filled && emailOk) {
    response.textContent = "Boom — message sent! Talk soon.";
    response.classList.add("is-success");
    response.classList.remove("is-error");
    name.value = "";
    email.value = "";
    message.value = "";
  } else {
    response.textContent = filled && !emailOk ? "That email looks off — double-check it." : "Whoa, fill in everything first.";
    response.classList.add("is-error");
    response.classList.remove("is-success");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.classList.contains("page-case")) loadCase();
});