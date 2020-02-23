"use-strict";

//Global variables
const pages = 10; // Allocate how many students are to appear on each page
const list = document.getElementsByClassName('student-item cf'); // Grab list of students from Class
const page = 1; // Set first page
const pagesAmount = Math.ceil(list.length / 10); // Allocate how many students to show on each page
const a = document.getElementsByTagName('a'); // Set a tag for list pagination

const studentList = document.querySelector(".student-list"); // To help find student search results match
const divPageHeader = document.querySelector(".page-header"); // To allocate where search bar will appear
const searchDiv = document.createElement("div"); // Dynamically create div element
const search = document.createElement("input"); //Dynamically create an input bar for search
const submitButton = document.createElement("button"); //Dynamically create a submit button for search
const divNoResult = document.createElement('div'); // Dynamically create an element to filter out and display no results in search

//Function and loop to show pages - Disply allocated list of students to each page
const showPage = (list, page) => {
  for (let i = 0; i < list.length; i++) {
    if (i >= (page * pages) - pages && i <= (page * pages) -1) {
      list[i].style.display = 'block';
    } else {
      list[i].style.display = 'none';
     }
   }
};

/* Created Elements to display students on a paginated list and only create the amount of pages needed
  to cover the list of students. If more students were added, the page numbers would increase automatically
*/
// Function to display page links dynamically, then return 10 students per page
const div = document.createElement('div');
const ul = document.createElement('ul');
div.className = 'pagination';
div.appendChild(ul);
document.querySelector('div.page').appendChild(div);

const pageLink = () => {
  for (let i = 0; i < pagesAmount; i++) {
    const page = i + 1;
    const li = document.createElement('li');
    ul.appendChild(li);
    li.innerHTML = `<a href="#" class="">${page}</a>`;
  };

  for (let i = 0; i < a.length; i++) {
    a[i].addEventListener('click', (event) => {
      for (let i = 0; i < a.length; i++) {
        a[i].className = "";
      };
      showPage(list, i + 1);
      event.target.ClassName = 'active';
     })
   }
};
// Set attributes for search bar features
searchDiv.className = "student-search";
search.setAttribute("placeholder","Search for students...");
search.setAttribute("id", "search-input");
submitButton.setAttribute("id", "submit");
submitButton.textContent = "Submit";
// Set attributes for no match feature
divNoResult.className = 'no-result';
divNoResult.style.textAlign = 'center';
divNoResult.style.color = 'red';
divNoResult.style.fontSize = '20px';
// Append all elements
searchDiv.appendChild(search);
searchDiv.appendChild(submitButton);
divPageHeader.appendChild(searchDiv);
divPageHeader.appendChild(divNoResult);

const userSearch = document.querySelector("#search-input");
const userSubmit = document.querySelector("#submit");

//function to search results and return match while hidding list and displaying no results if no match found
const searchBar = (userInput, search) => {
   let li, listText, i, txtValue;
   let filter = userSearch.value.toLowerCase();
   li = studentList.getElementsByTagName("li");
    for (let i = 0; i < li.length; i += 1) {
      listText = li[i].firstElementChild.getElementsByTagName("h3")[0];
      txtValue = listText.textContent || listText.innerText;
      if(txtValue.toLowerCase().indexOf(filter) > -1) {
        li[i].style.display = "";
        div.style.display = "";
        divNoResult.innerHTML = "";
        if (listText.value.length === 0) {
          divNoResult.innerHTML = "<h1>No Results</h1>";
          div.style.display = "none";
        } else {
          divNoResult.innerHTML = "";
          }
        } else {
        li[i].style.display = "none";
        div.style.display = "none";
        divNoResult.innerHTML = "<h1>No Results</h1>";
        }
     }
  }

// Click events for keyup on search bar
userSearch.addEventListener("keyup", (e) => {
   searchBar(e.target.value, list);

})
// Click event for sumbit on search bad
userSubmit.addEventListener("submit", (e) => {
   searchBar(e.target.value, list);
})

showPage(list, page);
pageLink();
searchBar();
