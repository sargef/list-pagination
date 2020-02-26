"use-strict";

//Global variables
const list = document.querySelectorAll('.student-item'); // Grab list of students from student item Class
const pages = 10; // Allocate how many students are to appear on each page

//Function and loop to show pages - Disply allocated list of students to each page
const showPage = (list, page) => {
  const start = (page * pages) - pages;
  const end = page * pages;
  for (let i = 0; i < list.length; i += 1) {
    const items = list[i];
    if (i >= start && i < end) {
      items.style.display = '';
    } else {
      items.style.display = 'none';
    }
  }
};

// Function for student search to filter the amount of students available from search and hide others.
const filterList = (list, searchInput) => {
  const filteredList = Array.from(list).filter(
    student => student.textContent.toLowerCase().includes(searchInput.value.toLowerCase()),
  );
  for (let i = 0; i < list.length; i += 1) {
    const items = list[i];
    if (filteredList.indexOf(items) !== -1) {
      items.style.display = '';
    } else {
      items.style.display = 'none';
  }
}
  return filteredList;
};

/* Created Elements to display students on a paginated list and only create the amount of pages needed
  to cover the list of students. If more students were added, the page numbers would increase automatically
*/
// Function to display page links dynamically, then return 10 students per page
const appendPageLinks = (list) => {
  let pageLinks = document.querySelectorAll('a');
  for (let i = 0; i < pageLinks.length; i += 1) {
    pageLinks[i].parentNode.removeChild(pageLinks[i]);
  }
  const pagesAmount = (list.length % 10 === 0) ? (list.length / 10) : Math.floor(list.length / 10) + 1;
  const page = document.querySelector('.page');
  const div = document.createElement('div');
  div.className = 'pagination';
  const ul = document.createElement('ul');

  for (let i = 0; i < pagesAmount; i += 1) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.setAttribute('href', '#');
    a.textContent = i + 1;
    ul.appendChild(li);
    li.appendChild(a);
    if (i === 0) {
      a.className = 'active';
    } else {
      a.className = '';
    }

  div.appendChild(ul);
  page.appendChild(div);

// Event listener for active page link allocation
  pageLinks = document.querySelectorAll('a');
  Array.from(pageLinks).forEach((itemLink) => {
    itemLink.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('.active').className = '';
      e.target.className = 'active';
      showPage(list, e.target.textContent);
    });
  });
}};


//function to search results and return match while hidding list and displaying no results if no match found
const appendSearchBar = () => {
  const filterResults = (list, searchInput) => {
    const filteredList = filterList(list, searchInput);
    const divNoResults = document.querySelector('.results');
    if (filteredList.length === 0) {
      divNoResults.style.display = '';
    } else {
      divNoResults.style.display = 'none';
    showPage(filteredList, 1);
    appendPageLinks(filteredList);
    }
  };

  // Set attributes for search bar features and appearance
  const pageHeader = document.querySelector('.page-header');
  const page = document.querySelector('.page');
  const divNoResults = document.createElement('span');
  divNoResults.className = 'results';
  divNoResults.textContent = 'No results';
  divNoResults.style.textAlign = 'center';
  divNoResults.style.color = 'red';
  divNoResults.style.fontSize = '25px';
  divNoResults.style.clear = 'both';
  divNoResults.style.width = '70%';
  divNoResults.style.position = 'absolute';
  divNoResults.style.marginTop = "-40px";
  divNoResults.style.display = 'none';
  const searchDiv = document.createElement('div');
  searchDiv.className = 'student-search';
  const searchInputs = document.createElement('input');
  searchInputs.setAttribute("placeholder" , "Search for students...");
  const submitButton = document.createElement('button');
  submitButton.textContent = "Search";
//Append elements to page
  pageHeader.appendChild(searchDiv);
  searchDiv.appendChild(searchInputs);
  searchDiv.appendChild(submitButton);
  page.appendChild(divNoResults);

// Event listener for click on submit button
  document.querySelector('button').addEventListener('click', (e) => {
    e.preventDefault();
    filterResults(list, e.target);
  });

// Event listener for search on input bar
  document.querySelector('input').addEventListener('keyup', (e) => {
    filterResults(list, e.target);
  });
};


// Event Listener to load functions at time of page execution
document.addEventListener('DOMContentLoaded', () => {
  showPage(list, 1);
  appendPageLinks(list);
  if (document.querySelector('.student-search') === null) appendSearchBar();
});
