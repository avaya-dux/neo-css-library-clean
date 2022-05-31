const isDisabled = (element) =>
  /.*--disabled/.test(element) || /.*-disabled/.test(element);

const isActive = (element) => /.*--active/.test(element);

let tabs = Array.from(document.querySelectorAll("li")).filter(
  (tab) => ![...tab.classList].some(isDisabled)
);

function toggleActive(e) {
  let tabListItem = e.target.closest("li");

  if (tabListItem.classList.contains("neo-tabs__item--vertical")) {
    tabListItem.classList.toggle("neo-tabs__item--vertical--active");
  } else {
    tabListItem.classList.toggle("neo-tabs__item--active");
  }
}

tabs.forEach((tab) => tab.addEventListener("click", toggleActive));

window.onunload = function () {
  tabs.forEach((tab) => tab.removeeventListener("click", toggleActive));
};
