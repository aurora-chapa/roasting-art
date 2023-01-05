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
  const currentReaction = document.querySelector("input[type='radio'][name=reaction]:checked");

  //Data validtation
  
  if (currentUser === "" && currentComment === "" && currentReaction == null) {
    errorMessage("Username is mandatory 🧐");
    errorMessage("Oopsie, you can't send empty messages 🤔");
    errorMessage("Summary type is required 🤔");
    return;
  } else if (currentUser === "" && currentComment === "") {
    errorMessage("Username is mandatory 🧐");
    errorMessage("Oopsie, you can't send empty messages 🤔");
    return;
  } else if (currentUser === "" && currentReaction == null) {
    errorMessage("Username is mandatory 🧐");
    errorMessage("Summary type is required 🤔");
    return;
  } else if (currentComment === "" && currentReaction == null) {
    errorMessage("Oopsie, you can't send empty messages 🤔");
    errorMessage("Summary type is required 🤔");
    return;
  } else if (currentComment === "") {
    errorMessage("Oopsie, you can't send empty messages 🤔");
    return;
  } else if (currentUser === "") {
    errorMessage("Username is mandatory 🧐");
    return;
  } else if (currentReaction == null) {
    errorMessage("Summary type is requiered 🤔");
    return;
  } else if (currentUser !== "" && currentComment !== "" && currentReaction !== null) {
    successMessage("Your comment was successfully added! 😎");
  }

  //Adds current comment to comment section
  commentsObj = {
    id: Date.now(),
    user: currentUser,
    comment: currentComment, 
    reaction: currentReaction.value,
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
      let reactionValue = "";

      if (comment.reaction === "loveit") {
        reactionValue = '<img src="src/loveit.svg" style="width:24px;"></img>';
      } else {
        reactionValue = '<img src="src/criticism.svg" style="width:24px;"></img>';
      }
      const commentDate = new Date()
      let currentCommentDate = commentDate.toLocaleString();

      const commentsDiv = document.createElement('div');
      commentsDiv.innerHTML = `
      <div class="article-feedback-forum-comment">
        <div class="article-feedback-forum-comment-reaction">${reactionValue}</div>
        <div class="article-feedback-forum-comment-userfeedback">
          <p class="text-m-graystrong-700">${comment.user}</p>
          <p class="text-s-graystrong-400">${comment.comment}</p>
        </div>
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