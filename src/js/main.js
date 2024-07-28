let MyData = document.querySelector(".myData");
$(".lodingScreenOtherPages").fadeOut(0);
// =================== Ready ? ===================
$(function () {
  searchByName("").then(function () {
    $(".inner-lodingScreen .lodingScreen").fadeOut(1000, function () {
      $(".inner-lodingScreen").fadeOut(1500, function () {
        $("body").css("overflow-y", "auto");
      });
    });
  });
});

// =================== Side Nav ===================
let sideWidth = $(".navLeft").innerWidth();
closeSide(0);
// =================== Open Side ===================
function openSide() {
  $(".open").css("display", "none");
  $(".close").css("display", "block");
  $(".sideNav").animate({ left: 0 }, 500);
  for (let i = 0; i < 5; i++) {
    $(".links li")
      .eq(i)
      .animate({ top: 0 }, (i + 9) * 100);
  }
}
$(".open").click(function () {
  if ($(".sideNav").css("left") != "0px") {
    openSide();
  }
});

// =================== Close Side ===================
function closeSide(time) {
  $(".close").css("display", "none");
  $(".open").css("display", "block");
  $(".sideNav").animate({ left: -sideWidth }, time);
  $(".links li").animate({ top: 500 }, 500);
}
$(".close").click(function () {
  if ($(".sideNav").css("left") == "0px") {
    closeSide(500);
  }
});
// ====================== Display Meals ======================
function displayMeals(element) {
  $(".lodingScreenOtherPages").fadeIn(500);
  let box = "";
  for (let i = 0; i < element.length; i++) {
    box += `
<div class="w-full md:w-1/4">
          <div onclick ='getMealDetails("${element[i].idMeal}")' class="inner relative overflow-hidden group mx-3 cursor-pointer">
            <img
              class="w-full rounded-lg"
              src="${element[i].strMealThumb}"
              alt=""
            />
            <div
              class="absolute top-0 start-0 end-0 bottom-0 bg-[#f9f6f6ca] rounded-lg flex items-center flex-wrap py-2 translate-y-full group-hover:translate-y-0 duration-300"
            >
              <h3 class="text-4xl ps-2 text-black">${element[i].strMeal}</h3>
            </div>
          </div>
        </div>`;
  }
  MyData.innerHTML = box;
  $(".contact").css("display", "none");
  $(".lodingScreenOtherPages").fadeOut(1000);
}
// ====================== Search By Name ======================
async function searchByName(temp) {
  MyData.innerHTML = "";
  $(".lodingScreenOtherPages").fadeIn(500);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${temp}`
  );
  let data = await response.json();
  data.meals ? displayMeals(data.meals) : displayMeals("");
  $(".lodingScreenOtherPages").fadeOut(1000);
}
// ====================== Search By First Letter ======================
async function searchByFirstLetter(temp) {
  MyData.innerHTML = "";
  $(".lodingScreenOtherPages").fadeIn(500);
  temp == "" ? (temp = "a") : "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${temp}`
  );
  let data = await response.json();
  data.meals ? displayMeals(data.meals) : displayMeals("");
  $(".lodingScreenOtherPages").fadeOut(1000);
}
$(".searchBtn").click(function () {
  MyData.innerHTML = "";
  $(".lodingScreenOtherPages").fadeIn(500);
  $(".search").css("display", "block");
  $(".contact").css("display", "none");
  closeSide(500);
  $(".lodingScreenOtherPages").fadeOut(1000);
});
// ====================== Get Meal Details ======================
async function getMealDetails(id) {
  $(".lodingScreenOtherPages").fadeIn(500);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let data = await response.json();
  displayMealDetails(data.meals[0]);
  $(".lodingScreenOtherPages").fadeOut(1000);
}
// ====================== Display Meal Details ======================
function displayMealDetails(meal) {
  MyData.innerHTML = "";
  let ingredients = "";
  for (let i = 0; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li
      class="bg-[#cff4fc] rounded-lg py-2 px-1 text-[#055160] inline-block m-2"
    >
      ${meal[`strIngredient${i}`]}
      ${meal[`strMeasure${i}`]}
    </li>`;
    }
  }
  let tags = meal.strTags?.split(",");
  if (!tags) tags = [];
  let strTags = "";
  for (let i = 0; i < tags.length; i++) {
    strTags += `<span
    class="bg-[#f8d7da] rounded-lg p-1 text-[#842029] inline-block m-2"
  >${tags[i]}</span>
  <span>`;
  }
  let box = `<div class="w-full md:w-1/3 my-4">
  <img
    src="${meal.strMealThumb}"
    class="w-full rounded-lg"
    alt=""
  />
  <h2 class="text-4xl font-semibold my-2">${meal.strMeal}</h2>
</div>
<div class="w-full md:w-2/3 px-5 my-4">
  <h2 class="text-4xl my-2">Instructions</h2>
  <p>
    ${meal.strInstructions}
  </p>
  <h3 class="text-3xl font-semibold my-2">
    Area : <span>${meal.strArea}</span>
  </h3>
  <h3 class="text-3xl font-semibold my-2">
    Category : <span>${meal.strCategory}</span>
  </h3>
  <h3 class="text-2xl font-medium my-2">Recipes :</h3>
  <ul>
    ${ingredients}
  </ul>
  <h3 class="text-3xl font-semibold my-2">Tags :</h3>
  ${strTags}
  <div>
  <a href=" ${meal.strSource}" 
      class="bg-[#157347] rounded-lg p-2 px-3 text-white inline-block my-2 mx-1 cursor-pointer"
      >Sourse</a
    >
    <a href=" ${meal.strYoutube}"
      class="bg-[#bb2d3b] rounded-lg p-2 px-3 text-white inline-block my-2 mx-1 cursor-pointer"
    >Youtube</a>
  </div>
    
</div>`;
  MyData.innerHTML = box;
  $(".inner-lodingScreen").fadeOut(500);
}
// ====================== Categories ======================
// ===== Display Categories ====
function displayCategory(element) {
  MyData.innerHTML = "";
  let box = "";
  for (let i = 0; i < element.length; i++) {
    box += `
<div class="w-full md:w-1/4">
          <div onclick ='getCategoryMeals("${
            element[i].strCategory
          }")' class="inner relative overflow-hidden group mx-3 cursor-pointer">
            <img
              class="w-full rounded-lg"
              src="${element[i].strCategoryThumb}"
              alt=""
            />
            <div
              class="absolute top-0 start-0 end-0 bottom-0 bg-[#f9f6f6ca] rounded-lg flex justify-center flex-wrap py-2 translate-y-full group-hover:translate-y-0 duration-300"
            >
              <h3 class="text-4xl ps-2 text-black">${
                element[i].strCategory
              }</h3>
              <p class="text-base text-black px-2 text-center ">${element[
                i
              ].strCategoryDescription
                .split(" ")
                .slice(0, 20)
                .join(" ")}</p>
            </div>
          </div>
        </div>`;
  }
  MyData.innerHTML = box;
}
// ===== Get Categories ====
async function getCategories() {
  MyData.innerHTML = "";
  $(".inner-lodingScreen").fadeIn(500);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let data = await response.json();
  displayCategory(data.categories);
  $(".inner-lodingScreen").fadeOut(1000);
}
// === Get Categories Meals ===
async function getCategoryMeals(category) {
  MyData.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  let data = await response.json();
  displayMeals(data.meals);
}
$(".categoryBtn").click(function () {
  $(".lodingScreenOtherPages").fadeIn(500);
  getCategories();
  closeSide(500);
  $(".search").css("display", "none");
  $(".contact").css("display", "none");
  $(".lodingScreenOtherPages").fadeOut(1000);
});
// ====================== Area ======================
// ===== Display Areas ====
function displayArea(element) {
  MyData.innerHTML = "";
  let box = "";
  for (let i = 0; i < element.length; i++) {
    box += `
    <div onclick="getAreaMeals('${element[i].strArea}')" class="w-full md:w-1/4 cursor-pointer">
          <div class="inner">
            <p class="text-center"><i class="fa-solid fa-house-laptop fa-7x"></i></p>
            <h3 class="font-bold text-3xl text-center">${element[i].strArea}</h3>
          </div>
        </div>
    `;
  }
  MyData.innerHTML = box;
}
// ===== Get Areas ====
async function getArea() {
  $(".inner-lodingScreen").fadeIn(500);
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let data = await respone.json();
  displayArea(data.meals);
  $(".inner-lodingScreen").fadeOut(1000);
}
// === Get Areas Meals ===
async function getAreaMeals(country) {
  MyData.innerHTML = "";
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`
  );
  let data = await respone.json();
  displayMeals(data.meals);
}
$(".areaBtn").click(function () {
  $(".lodingScreenOtherPages").fadeIn(500);
  getArea();
  closeSide(500);
  $(".contact").css("display", "none");
  $(".search").css("display", "none");
  $(".lodingScreenOtherPages").fadeOut(1000);
});
// ====================== Ingredients ======================
// ===== Display Ingredients ====
function displayIngredients(element) {
  MyData.innerHTML = "";
  let box = "";
  for (let i = 0; i < element.length; i++) {
    box += `
    <div onclick="getIngredientsMeals('${element[i].strIngredient}')" class="w-full md:w-1/4 cursor-pointer">
          <div class="inner">
            <p class="text-center"><i class="fa-solid fa-drumstick-bite fa-7x"></i></p>
            <h3 class="font-bold text-3xl text-center">${element[i].strIngredient}</h3>
          </div>
        </div>
    `;
  }
  MyData.innerHTML = box;
}
// ===== Get Ingredients ====
async function getIngredients() {
  $(".inner-lodingScreen").fadeIn(500);
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let data = await respone.json();
  displayIngredients(data.meals);
  $(".inner-lodingScreen").fadeOut(1000);
}
// === Get Ingredients Meals ===
async function getIngredientsMeals(Ingredient) {
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredient}`
  );
  let data = await respone.json();
  displayMeals(data.meals);
}
$(".ingrediantsBtn").click(function () {
  $(".lodingScreenOtherPages").fadeIn(500);
  getIngredients();
  closeSide(500);
  $(".contact").css("display", "none");
  $(".search").css("display", "none");
  $(".lodingScreenOtherPages").fadeOut(1000);
});
// ====================== Contact ======================
let submitBtn ;
function displayContact() {
  MyData.innerHTML = "";
  let box = `<div class="w-9/12 mx-auto">
  <div class="row justify-center">
    <div class="w-full md:w-5/12 mx-4 my-1">
      <input oninput="inputsValidation()"
        id="inputName"
        class="w-full rounded-lg text-black p-2 focus:shadow-sm focus:shadow-white"
        type="text"
        placeholder="Enter Your Name"
      />
      <h4
        id="alertName"
        class="bg-[#f8d7da] text-[#842029] p-3 rounded-lg my-1 text-center hidden"
      >
        Special characters and numbers not allowed
      </h4>
    </div>
    <div class="w-full text-black md:w-5/12 mx-4 my-1">
      <input oninput="inputsValidation()" id="inputEmail"
        class="w-full rounded-lg p-2 focus:shadow-sm focus:shadow-white"
        type="email"
        placeholder="Enter Your Email"
      />
      <h4
        id="alertEmail"
        class="bg-[#f8d7da] text-[#842029] p-3 rounded-lg my-1 text-center hidden"
      >
        Email not valid *exemple@yyy.zzz
      </h4>
    </div>
    <div class="w-full md:w-5/12 mx-4 my-1">
      <input oninput="inputsValidation()" id="inputPhone"
        class="w-full rounded-lg p-2 text-black focus:shadow-sm focus:shadow-white"
        type="tel"
        placeholder="Enter Your Phone"
      />
      <h4
        id="alertPhone"
        class="bg-[#f8d7da] text-[#842029] p-3 rounded-lg my-1 text-center hidden"
      >
        Enter valid Phone Number
      </h4>
    </div>
    <div class="w-full md:w-5/12 mx-4 my-1">
      <input oninput="inputsValidation()" id="inputAge"
        class="w-full rounded-lg p-2 text-black focus:shadow-sm focus:shadow-white"
        type="number"
        placeholder="Enter Your Age"
      />
      <h4
        id="alertAge"
        class="bg-[#f8d7da] text-[#842029] p-3 rounded-lg my-1 text-center hidden"
      >
        Enter valid age
      </h4>
    </div>
    <div class="w-full md:w-5/12 mx-4 my-1">
      <input oninput="inputsValidation()" id="inputPassword"
        class="w-full rounded-lg p-2 text-black focus:shadow-sm focus:shadow-white"
        type="password"
        placeholder="Enter Your Password"
      />
      <h4
        id="alertPassword"
        class="bg-[#f8d7da] text-[#842029] p-3 rounded-lg my-1 text-center hidden"
      >
        Enter valid password *Minimum eight characters, at least one
        letter and one number:*
      </h4>
    </div>
    <div class="w-full md:w-5/12 mx-4 my-1">
      <input oninput="inputsValidation()" id="inputRepassword"
        class="w-full rounded-lg p-2 text-black focus:shadow-sm focus:shadow-white"
        type="password"
        placeholder="Enter Your Repassword"
      />
      <h4
        id="alertRepassword"
        class="bg-[#f8d7da] text-[#842029] p-3 rounded-lg my-1 text-center hidden"
      >
        Enter valid repassword
      </h4>
    </div>
  </div>
  <div  class="text-center my-2">
    <button id="submit"
      class="border-[1px] rounded-lg border-[#dc3545] text-[#dc3545] px-3 py-1 cursor-auto"
    >
      Submit
    </button>
  </div>
</div>`;
  MyData.innerHTML = box;
  let inputName = document.getElementById("inputName");
  let inputPhone = document.getElementById("inputPhone");
  let inputPassword = document.getElementById("inputPassword");
  let inputEmail = document.getElementById("inputEmail");
  let inputAge = document.getElementById("inputAge");
  let inputRepPassword = document.getElementById("inputRepassword");
  submitBtn = document.getElementById("submit");

  inputName.addEventListener("focus", () => {
    nameInputTouched = true;
  });

  inputEmail.addEventListener("focus", () => {
    emailInputTouched = true;
  });

  inputPhone.addEventListener("focus", () => {
    phoneInputTouched = true;
  });

  inputAge.addEventListener("focus", () => {
    ageInputTouched = true;
  });

  inputPassword.addEventListener("focus", () => {
    passwordInputTouched = true;
  });

  inputRepPassword.addEventListener("focus", () => {
    repasswordInputTouched = true;
  });
  $(".contact").css("display", "block");
}
$(".contactBtn").click(function () {
  $(".lodingScreenOtherPages").fadeIn(500);
  displayContact();
  closeSide(500);
  $(".search").css("display", "none");
  $(".lodingScreenOtherPages").fadeOut(1000);
});
// ========================== Validations ==========================

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document.getElementById("alertName").classList.replace("block", "hidden");
    } else {
      document.getElementById("alertName").classList.replace("hidden", "block");
    }
  }

  if (emailInputTouched) {
    if (emailValidation()) {
      document
        .getElementById("alertEmail")
        .classList.replace("block", "hidden");
    } else {
      document
        .getElementById("alertEmail")
        .classList.replace("hidden", "block");
    }
  }

  if (phoneInputTouched) {
    if (phoneValidation()) {
      document
        .getElementById("alertPhone")
        .classList.replace("block", "hidden");
    } else {
      document
        .getElementById("alertPhone")
        .classList.replace("hidden", "block");
    }
  }

  if (ageInputTouched) {
    if (ageValidation()) {
      document.getElementById("alertAge").classList.replace("block", "hidden");
    } else {
      document.getElementById("alertAge").classList.replace("hidden", "block");
    }
  }

  if (passwordInputTouched) {
    if (passwordValidation()) {
      document
        .getElementById("alertPassword")
        .classList.replace("block", "hidden");
    } else {
      document
        .getElementById("alertPassword")
        .classList.replace("hidden", "block");
    }
  }
  if (repasswordInputTouched) {
    if (repasswordValidation()) {
      document
        .getElementById("alertRepassword")
        .classList.replace("block", "hidden");
    } else {
      document
        .getElementById("alertRepassword")
        .classList.replace("hidden", "block");
    }
  }
  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    $('#submit').css("cursor", "pointer");
  } else {
    $('#submit').css("cursor", "auto");
  }
}

function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("inputName").value);
}
function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("inputEmail").value
  );
}
function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("inputPhone").value
  );
}
function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("inputAge").value
  );
}
function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("inputPassword").value
  );
}
function repasswordValidation() {
  return (
    document.getElementById("inputPassword").value ==
    document.getElementById("inputRepassword").value
  );
}
