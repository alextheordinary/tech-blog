const addCommentButtonHandler = async (event) => {
    event.preventDefault();
    const postID = document.querySelector('#addcomment').dataset.pid;
    document.location.replace(`/comment/${postID}`);
};

document
    .querySelector('#addcomment')
    .addEventListener('click', addCommentButtonHandler);