document.addEventListener("DOMContentLoaded", () => {
  const themeButton = document.querySelector("[data-theme-toggle]");
  if (themeButton) {
    themeButton.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      themeButton.setAttribute("aria-pressed", String(document.body.classList.contains("dark")));
      themeButton.textContent = document.body.classList.contains("dark") ? "☀ Light mode" : "🌙 Dark mode";
    });
  }

  const areaSearch = document.querySelector("#area-search-form");
  if (areaSearch) {
    const input = document.querySelector("#area-query");
    const results = document.querySelector("#area-results");
    const areas = [
      {name:"Gulshan-e-Iqbal", zone:"East", detail:"Sample area listing. Confirm any schedule with the official provider."},
      {name:"Gulistan-e-Jauhar", zone:"East", detail:"Sample area listing. Confirm any schedule with the official provider."},
      {name:"North Nazimabad", zone:"Central", detail:"Sample area listing. Confirm any schedule with the official provider."},
      {name:"Nazimabad", zone:"Central", detail:"Sample area listing. Confirm any schedule with the official provider."},
      {name:"Clifton", zone:"South", detail:"Sample area listing. Confirm any schedule with the official provider."},
      {name:"DHA", zone:"South", detail:"Sample area listing. Confirm any schedule with the official provider."},
      {name:"Korangi", zone:"East", detail:"Sample area listing. Confirm any schedule with the official provider."},
      {name:"Malir", zone:"East", detail:"Sample area listing. Confirm any schedule with the official provider."},
      {name:"Orangi Town", zone:"West", detail:"Sample area listing. Confirm any schedule with the official provider."},
      {name:"Baldia Town", zone:"West", detail:"Sample area listing. Confirm any schedule with the official provider."},
      {name:"Saddar", zone:"South", detail:"Sample area listing. Confirm any schedule with the official provider."},
      {name:"Federal B Area", zone:"Central", detail:"Sample area listing. Confirm any schedule with the official provider."}
    ];
    const render = (query = "") => {
      const q = query.trim().toLowerCase();
      const matches = areas.filter(a => (a.name + " " + a.zone).toLowerCase().includes(q));
      results.innerHTML = "";
      if (!matches.length) {
        results.innerHTML = '<div class="notice info">No sample areas matched. Try another spelling.</div>';
        return;
      }
      matches.forEach(a => {
        const item = document.createElement("article");
        item.className = "result-item";
        const heading = document.createElement("h3");
        heading.textContent = a.name;
        const pill = document.createElement("span");
        pill.className = "pill";
        pill.textContent = a.zone + " zone (sample)";
        const para = document.createElement("p");
        para.textContent = a.detail;
        item.append(heading, pill, para);
        results.append(item);
      });
    };
    areaSearch.addEventListener("submit", event => {
      event.preventDefault();
      render(input.value);
    });
    input.addEventListener("input", () => render(input.value));
    render();
  }

  const scheduleSearch = document.querySelector("#schedule-search");
  if (scheduleSearch) {
    scheduleSearch.addEventListener("input", () => {
      const q = scheduleSearch.value.toLowerCase();
      document.querySelectorAll("#schedule-table tbody tr").forEach(row => {
        row.hidden = !row.textContent.toLowerCase().includes(q);
      });
    });
  }

  const countdown = document.querySelector("[data-countdown]");
  if (countdown) {
    const target = new Date();
    target.setDate(target.getDate() + 7);
    target.setHours(0, 0, 0, 0);
    const update = () => {
      let diff = Math.max(0, target.getTime() - Date.now());
      const days = Math.floor(diff / 86400000); diff %= 86400000;
      const hours = Math.floor(diff / 3600000); diff %= 3600000;
      const minutes = Math.floor(diff / 60000); diff %= 60000;
      const seconds = Math.floor(diff / 1000);
      ["days","hours","minutes","seconds"].forEach((key, i) => {
        const el = countdown.querySelector(`[data-${key}]`);
        if (el) el.textContent = [days,hours,minutes,seconds][i];
      });
    };
    update();
    setInterval(update, 1000);
  }

  document.querySelectorAll("form[data-demo-form]").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const message = form.querySelector("[data-form-message]");
      if (message) {
        message.textContent = "Thank you! This demo form works in your browser, but it does not send or save information online.";
        message.className = "notice info";
      }
      form.reset();
    });
  });

  document.querySelectorAll("[data-current-year]").forEach(el => {
    el.textContent = new Date().getFullYear();
  });
});
