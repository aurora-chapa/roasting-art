const roastForm = document.querySelector("#roast-form");
const roastComments = document.querySelector("#roast-comments");
let comments = [];

//EVENT LISTENERS
eventListeners();

function eventListeners() {
  roastForm.addEventListener("submit", addComment );

  //Keep comments after refreashing 
  document.addEventListener('DOMContentLoaded', () => {
    comments = JSON.parse(localStorage.getItem('comments')) || [];
    commentLayout();
})

}

//FUNCTIONS 

function addComment(e) {
  e.preventDefault();

  //Getting inputs
  const currentComment = document.querySelector("#roast-comment-box").value;
  const currentUser = document.querySelector("#roast-username-box").value;

  //Data validtation
  
  if (currentUser === "" && currentComment === "") {
    errorMessage("Username is mandatory 🧐");
    errorMessage("Oopsie, you can't send empty messages 🤔");
    return;
  } else if (currentComment === "") {
    errorMessage("Oopsie, you can't send empty messages 🤔");
    return;
  } else if (currentUser === "") {
    errorMessage("Username is mandatory 🧐");
    return;
  } else if (currentUser !== "" && currentComment !== "") {
    successMessage("Your comment was successfully added! 😎");
  }

  //Adds current comment to comment section
  commentsObj = {
    id: Date.now(),
    user: currentUser,
    comment: currentComment, 
  }

  comments = [...comments, commentsObj]
  
  commentLayout();

  roastForm.reset();
}


//Creates layout of Error Message
function errorMessage(error) {
  const errorAlert = document.createElement("p");
  errorAlert.textContent = error;
  errorAlert.classList.add("error-message");

  const addCommentBlock = document.querySelector("#add-comment-block");
  addCommentBlock.appendChild(errorAlert);

  setTimeout(() => {
    errorAlert.remove();
  }, 2500);
}

//Creates layout of Success Message
function successMessage(success) {
  const successAlert = document.createElement("p");
  successAlert.textContent = success;
  successAlert.classList.add("success-message");

  const addCommentBlock = document.querySelector("#add-comment-block");
  addCommentBlock.appendChild(successAlert);

  setTimeout(() => {
    successAlert.remove();
  }, 2000);
}

//Creates layout of Comment
function commentLayout () {
  cleanHTML();

  if(comments.length > 0) {
    comments.forEach ( comment => {

      const commentsDiv = document.createElement('div');
      commentsDiv.innerHTML = `
      <div class="article-feedback-forum-comment">
        <p class="text-m-graystrong-700">${comment.user}</p>
        <p class="text-s-graymedium-400">${comment.comment}</p>
      </div>
      `;
      roastComments.appendChild(commentsDiv);
  });
  }

  commentStorage();
}

//Adds comments to localStorage
function commentStorage() {
  localStorage.setItem('comments', JSON.stringify(comments))
}

//Prevents the same html from appearing more than once
function cleanHTML () {
  while(roastComments.firstChild) {
      roastComments.removeChild(roastComments.firstChild);
  }
}