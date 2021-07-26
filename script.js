// Container for Image and Search bar.//
const logo = document.createElement("div");
logo.className = "logo";
logo.innerHTML = `
<img class="beer-logo" src="beer.png"></img>
<h1 class="heading">Search for Breweries across <span class="usa">USA</span> <h1>
<input placeholder="Enter State/City names or any other keywords" class="name"></input>
    <button class="btn-search" type="submit" onclick="getUsers()">Search</button>
    <button class="reset" type="submit" onclick="window.location.reload()">Reset</button>
    <div class="pagination"></div>
`
  document.body.append(logo); // Appending the container information to the body of HTML.//


  // Function to load the content and displaying the container with API details.//
function loadUsers(users) {
  const userList = document.createElement("div");
  userList.className = "user-list";
  users.forEach((user) => {
    const userContainer = document.createElement("div");
    userContainer.className = "user-container";

    userContainer.innerHTML = `
    <div class="brew-content">
    <h3 class="brew-name"> Name:  ${user.name}<h3>
    <h3 class="brew-city"> City:  ${user.city}<h3> 
    <h3 class="brew-state"> State: ${user.state}<h3>
    <a href=${user.website_url} target="_blank" class="web">Website</a>
    </div>
    `;
    

    userList.append(userContainer);
  });

  document.body.append(userList); // Appending the details to the body of HTML.//
  
}
// Function to fetch the data from API using GET method.//
async function getUsers(search) {
    try{
  search = document.querySelector(".name").value;
 const response = await fetch(`https://api.openbrewerydb.org/breweries/search?query=${search}`, {
    method: "GET"
  });
    console.log(response);
      const users = await response.json();
      
      // To display pages of the data from API according to length of the data received.//
  const Pages = Math.ceil(users.length / 10);
  
  const pagination = document.querySelector(".pagination");
  
  for (let i = 1; i <= Pages; i++) {
    const page = document.createElement("button");
    page.className="page-button"
    page.innerText = i;

    page.onclick = function () {
  
      const pageUsers = users.filter(
        (user, index) => index >= (i - 1) * 10 && index < i * 10
      );
      document.querySelector(".user-list").remove();
      loadUsers(pageUsers);
    };
    
    pagination.append(page);  // Appending page buttons.//

  }

// Displaying the first 10 data alone.//
  const firstTenUsers = users.filter((user, index) => index < 10);
      loadUsers(firstTenUsers);
    } 
    catch(error){
        if(response.status===404){
            console.log("Not found");
        }
    }
      
  }
 
// Calling the getUser function to display the data.//
  function refreshList() {
    document.querySelector(".user-list").remove();
    getUsers();
    
  }