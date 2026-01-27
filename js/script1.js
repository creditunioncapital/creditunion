document.addEventListener("DOMContentLoaded", () => {

  
const phoenixToggle = document.getElementById("phoenix-toggle");

if (phoenixToggle) {
  phoenixToggle.addEventListener("click", () => {
    document.body.classList.toggle("phoenix-mode");
    alert("Phoenix mode toggled");
  });
}

  phoenixToggle.addEventListener("click", () => {
    document.body.classList.toggle("phoenix-mode");

    if (document.body.classList.contains("phoenix-mode")) {
      localStorage.setItem("theme", "phoenix");
    } else {
      localStorage.removeItem("theme");
    }
  });
}
  /* =========================
     SIDEBAR TOGGLE
  ========================= */
  const sidebarToggle = document.querySelector(".app-sidebar__toggle");

  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
      document.body.classList.toggle("sidebar-open");
    });
  }
 document.addEventListener("DOMContentLoaded", () => {
  const pageLoader = document.querySelector(".skeleton-loader");

  // Always stop loading state
  document.body.classList.remove("page-loading");

  // Kill shimmer animation
  document.querySelectorAll(".skeleton-header, .skeleton-card")
    .forEach(el => {
      el.style.animation = "none";
      el.style.background = "transparent";
    });

  // Fade + remove skeleton
  if (pageLoader) {
    pageLoader.style.opacity = "0";
    pageLoader.style.pointerEvents = "none";

    setTimeout(() => {
      pageLoader.remove();
    }, 1600);
  }
});
    /* =========================
     CLOSE SIDEBAR ON OUTSIDE CLICK
  ========================= */

  document.addEventListener("click", (e) => {
    if (!document.body.classList.contains("sidebar-open")) return;

    const sidebar = document.querySelector(".app-sidebar");
    const toggle = document.querySelector(".app-sidebar__toggle");

    if (
      sidebar &&
      !sidebar.contains(e.target) &&
      toggle &&
      !toggle.contains(e.target)
    ) {
      document.body.classList.remove("sidebar-open");
    }
  });


  /* =========================
     TREEVIEW MENU
  ========================= */
  document.querySelectorAll(".treeview > .app-menu__item")
    .forEach(item => {
      item.addEventListener("click", e => {
        e.preventDefault();
        item.parentElement.classList.toggle("is-expanded");
      });
    });

  /* =========================
     LOGIN TRACKING
  ========================= */
  const lastLoginEl = document.getElementById("last-login");
  const visitCountEl = document.getElementById("visit-count");
  const deviceEl = document.getElementById("device-info");
  const timezoneEl = document.getElementById("timezone");

  const previousLogin = localStorage.getItem("lastLogin");
  let visitCount = Number(localStorage.getItem("visitCount")) || 0;

  visitCount += 1;
  localStorage.setItem("visitCount", visitCount);

  const now = new Date();
  const formattedTime = now.toLocaleString();
  localStorage.setItem("lastLogin", formattedTime);

  if (lastLoginEl) lastLoginEl.textContent = previousLogin || "First visit";
  if (visitCountEl) visitCountEl.textContent = visitCount;
  if (deviceEl) deviceEl.textContent = navigator.userAgent;
  if (timezoneEl) timezoneEl.textContent =
    Intl.DateTimeFormat().resolvedOptions().timeZone;

  /* =========================
     BALANCE CARD DELAY
  ========================= */
  const balanceCard = document.querySelector(".balance-card");

  if (balanceCard) {
    setTimeout(() => {
      balanceCard.classList.remove("balance-card--hidden");
      balanceCard.classList.add("balance-card--show");
    }, 800);
  }
    /* =========================
     BALANCE CARD FOCUS GLOW
  ========================= */

  if (balanceCard) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          balanceCard.classList.add("balance-card--active");
        } else {
          balanceCard.classList.remove("balance-card--active");
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(balanceCard);
  }


  /* =========================
     BALANCE VISIBILITY TOGGLE (SVG EYE)
  ========================= */
  const balanceToggle = document.querySelector(".balance-card__toggle");
  const balanceAmount = document.querySelector(".balance-card__amount");
  const eyeIcon = balanceToggle?.querySelector("svg");

  let balanceVisible = false;

  if (balanceToggle && balanceAmount && eyeIcon) {
    balanceToggle.addEventListener("click", () => {
      balanceVisible = !balanceVisible;

      if (balanceVisible) {
        balanceAmount.textContent = "$552,430.75";
        balanceAmount.classList.remove("balance-card__amount--hidden");
        balanceAmount.classList.add("balance-card__amount--visible");

        eyeIcon.innerHTML = `
          <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
        `;
      } else {
        balanceAmount.textContent = "••••••••";
        balanceAmount.classList.remove("balance-card__amount--visible");
        balanceAmount.classList.add("balance-card__amount--hidden");

        eyeIcon.innerHTML = `
          <path d="M2 2l20 20M12 5c-7 0-11 7-11 7a20.7 20.7 0 0 0 5.1 5.9L17 7.1A9.9 9.9 0 0 0 12 5z"/>
        `;
      }
    });
  }

  /* =========================
     CARD LOAD ANIMATION
  ========================= */
  const cards = document.querySelectorAll(".dashboard-card");

  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("card-visible");
    }, index * 120);
  });

  /* =========================
     AI-STYLE DYNAMIC ADVERT
  ========================= */
  const adTitle = document.getElementById("ai-ad-title");
  const adMessage = document.getElementById("ai-ad-message");

  if (adTitle && adMessage) {
    const accountNumber = "1234567890"; // simulated
    const visits = visitCount;

    let accountTier = accountNumber.length >= 10 ? "premium" : "standard";

    if (accountTier === "premium" && visits > 5) {
      adTitle.textContent = "Exclusive Investment Opportunity";
      adMessage.textContent =
        "Based on your activity, you qualify for our premium investment plans.";
    } else if (accountTier === "premium") {
      adTitle.textContent = "Premium Account Benefits";
      adMessage.textContent =
        "Enjoy priority support, higher limits, and exclusive banking perks.";
    } else if (visits > 5) {
      adTitle.textContent = "Upgrade Your Banking Experience";
      adMessage.textContent =
        "You’re an active user! Unlock additional features with an account upgrade.";
    } else {
      adTitle.textContent = "Get More From Your Account";
      adMessage.textContent =
        "Discover tools and services designed to help you manage your finances.";
    }
  }

  /* =========================
     TRANSFER BUTTON → SIDEBAR TREEVIEW (WITH AUTO-FOCUS)
  ========================= */

  const transferBtn = document.getElementById("transfer-btn");
  const transfersMenu = document.getElementById("transfers-menu");
  const domesticLink = document.getElementById("domestic-transfer");

  if (transferBtn && transfersMenu) {
transferBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation(); // 🔑 THIS LINE FIXES IT


      // Open sidebar
      document.body.classList.add("sidebar-open");

      // Collapse other treeviews
      document.querySelectorAll(".treeview").forEach(menu => {
        if (menu !== transfersMenu) {
          menu.classList.remove("is-expanded");
        }
      });

      // Expand Transfers
      transfersMenu.classList.add("is-expanded");

      // Bring Transfers into view
      transfersMenu.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });

      // Auto-focus Domestic Transfer
      if (domesticLink) {
        setTimeout(() => {
          domesticLink.focus();
          domesticLink.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        }, 200); // wait for expand animation
      }
    });
  }

});


