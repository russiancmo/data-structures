import Array from "./utils/Array";

const companies = new Array(5);
companies.add(0, "Apple");
companies.add(1, "Yandex");
companies.add(2, "Google");
companies.add(3, "Microsoft");
companies.add(4, "Uber");

const el = document.createElement("ul");
const companiesList = companies.getAll();

for (key in companiesList) {
  const company = document.createElement("li");
  company.textContent = companiesList[key];
  el.appendChild(company);
}

document.getElementById("root").appendChild(el);
