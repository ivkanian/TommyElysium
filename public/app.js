(() => {
  const cfg = window.TOMMY_CONFIG || {};
  const contract = String(cfg.contract || "").trim();
  const toast = document.querySelector("#toast");
  const showToast = text => { toast.textContent = text; toast.classList.add("show"); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200); };

  document.title = `${cfg.ticker || "$TOMMY"} — Ascend to Elysium`;
  document.querySelectorAll("[data-buy-link]").forEach(link => {
    if (!cfg.buyUrl) return;
    link.href = cfg.buyUrl; link.hidden = false;
  });

  const contractValue = document.querySelector("#contractValue");
  const contractNote = document.querySelector("#contractNote");
  const copy = async () => {
    if (!contract) return;
    try { await navigator.clipboard.writeText(contract); showToast("Contract copied. Ascend responsibly."); }
    catch { showToast("Copy failed — select the contract manually."); }
  };
  if (contract) {
    contractValue.textContent = contract;
    document.querySelector("#copyContract").disabled = false;
    document.querySelectorAll("[data-copy-contract]").forEach(button => { button.hidden = false; button.addEventListener("click", copy); });
    contractNote.textContent = "Always verify the address before buying. The flag does not endorse fake contracts.";
  }
  document.querySelector("#copyContract").addEventListener("click", copy);

  const social = document.querySelector("#socialLinks");
  const links = [["X / Twitter", cfg.xUrl], ["Telegram", cfg.telegramUrl], ["Website", cfg.siteUrl]];
  links.filter(([, url]) => url).forEach(([label, url]) => {
    const a = document.createElement("a"); a.href = url; a.target = "_blank"; a.rel = "noreferrer"; a.textContent = label + " ↗"; social.append(a);
  });

  document.querySelector("#shareButton").addEventListener("click", async () => {
    const text = `${cfg.ticker || "$TOMMY"} — Tommy took the flag. Now we ascend to Elysium. ▲`;
    try {
      if (navigator.share) await navigator.share({ title: "$TOMMY", text, url: location.href });
      else { await navigator.clipboard.writeText(`${text} ${location.href}`); showToast("Mission copied. Post it high."); }
    } catch { /* User cancelled native share. */ }
  });

  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add("in"); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
})();
