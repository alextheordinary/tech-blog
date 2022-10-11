// This file isn't currently used for anything. Moved code to editpost.handlebars to fix an issue where the /editpost/:id GET route was erroneously using the script tag as an argument. I don't know why this fixed it, but all my attempts at figuring it out led me nowhere.

const editPostHandler = async (event) => {
    event.preventDefault();
    console.log("hit the edit button");
    const title = document.querySelector("#title").value.trim();
    const content = document.querySelector("#content").value.trim();
    const postID = document.querySelector('#updatepost').dataset.pid;
    console.log(postID);

    if (title && content) {
        const response = await fetch(`../api/posts/${postID}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {

            document.location.replace(`/posts/${postID}`);
        } else {
            alert('Failed to edit post');
        }
    }
};

const deletePostHandler = async (event) => {
    event.preventDefault();
    const postID = document.querySelector('#updatepost').dataset.pid;

    const response = await fetch(`../api/posts/${postID}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        console.log(response);
        document.location.replace(`/`);
    } else {
        alert('Failed to delete post');
    }
};
const cancelButtonHandler = async (event) => {
    event.preventDefault();

    document.location.replace(`/dashboard`);

};

document
    .querySelector('#updatepost')
    .addEventListener('click', editPostHandler);
document
    .querySelector('#delete-post')
    .addEventListener('click', deletePostHandler);
document
    .querySelector('#cancel')
    .addEventListener('click', cancelButtonHandler);