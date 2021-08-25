/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const navList= document.getElementById('navbar__list');
const selectorItems= document.querySelectorAll('section');
const navLinks= document.querySelectorAll('#navbar__list a');
const topButton= document.getElementById('top-btn');
const collapButtons=document.getElementsByClassName('collap-btn');
let scrollTimer=0; 

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const createNavItems= () =>{
  // Create document fragment to store the nav items
  const fragment = document.createDocumentFragment(); 
  // Create list item for each section
  for (item of selectorItems)
  { 
   const createdItems =document.createElement('li');
   createdItems.innerHTML=`<a class="menu__link" data-nav="${item.getAttribute('data-nav')}" >${item.getAttribute('data-nav')}</a>` ;
   // Add nav items to the document fragment
   fragment.appendChild(createdItems);
  }
  // Add the stored items to the unordered list
  navList.appendChild(fragment);

}


// Add class 'active' to section when near top of viewport
const activeSection=() =>{
  for (item of selectorItems){
    const itemDataNav= item.getAttribute("data-nav");
    if((item.getBoundingClientRect().top >=-280) && (item.getBoundingClientRect().top <=280) ) 
    {
      // Add active class if the section's top value in range of (280 ,-280) to the viewport
      item.classList.add("your-active-class");
      // Add active class to navigation items when a section is in the viewport
      document.querySelector(`a[data-nav="${itemDataNav}"]`).classList.add("active-link");


    }
    // Remove active class
    else {item.classList.remove("your-active-class");
    // Remove the active class of navigation items when a section is not in the viewport
    document.querySelector(`a[data-nav="${itemDataNav}"]`).classList.remove("active-link");
    }
  }
}

// Scroll to anchor ID using scrollTO event
const navLinkClick=(evet) =>{
  evet.preventDefault();
  // Get the data-nav of the clicked link
  const dataTarget =evet.target.getAttribute("data-nav");
  if(dataTarget)
  {
    // Get the section of the current data-nav and scroll to it
    document.querySelector(`section[data-nav="${dataTarget}"]`).scrollIntoView({behavior: 'smooth'}); 
    document.querySelector(`section[data-nav="${dataTarget}"]`).top; 

  
  }
}

//Hide fixed navigation bar while not scrolling 
const hideNavBar= (evet)=>{
  // Clear timeout while scrolling
  window.clearTimeout(scrollTimer);
  navList.style.display = "block";
  // Set timeout to run after stop scrolling 
  scrollTimer=setTimeout(()=>{
    navList.style.display = "none";     // Change display property to hide the nav bar
  },5000);
}

// Top button only visible when the user scrolls below the fold of the page
const topButtonVisibilty= ()=>{
 if(document.documentElement.scrollTop >1000)
 {
  topButton.style.display="block";
 }
 else topButton.style.display="none";
}

// Scroll to top of the page 
const scrollToTop= ()=>{
document.documentElement.scrollIntoView({behavior: 'smooth'});
}

// Make sections collapsible
const secCollapsible= (event)=>{
 let sibbling =event.target.nextElementSibling;
 if(sibbling.style.display === "block")
    {
      sibbling.style.display ="none";
      event.target.textContent = 'Show Content';       //change button text
    }
  else {
    sibbling.style.display = "block";
    event.target.textContent = 'Hide';
  }  
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
createNavItems();

// Scroll to section on link click
navList.addEventListener('click',navLinkClick);

// Set sections as active
 document.addEventListener( 'scroll' ,activeSection);

// Hide navigation bar lisener
 window.addEventListener('scroll',hideNavBar);

// Show Top button 
 document.addEventListener('scroll',topButtonVisibilty);

// Scroll to Top of the page on link click
 topButton.addEventListener('click',scrollToTop);

// Collapsible sections liseners
 for (btn of collapButtons)
 {
 btn.addEventListener('click',secCollapsible)
 }
