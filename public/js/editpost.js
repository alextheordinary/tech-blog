// const editPostHandler = async (event) => {
//     event.preventDefault();
//     console.log("hit the edit button");
//     const title = document.querySelector("#title").value.trim();
//     const content = document.querySelector("#content").value.trim();
//     const postID = document.querySelector('#updatepost').dataset.pid;

//     if (title && content) {
//         const response = await fetch(`api/posts/${postID}`, {
//             method: 'PUT',
//             body: JSON.stringify({ title, content }),
//             headers: { 'Content-Type': 'application/json' },
//         });

//         if (response.ok) {

//             document.location.replace(`/posts/${postID}`);
//         } else {
//             alert('Failed to edit post');
//         }
//     }
// };

// const deletePostHandler = async (event) => {
//     event.preventDefault();
//     const postID = document.querySelector('#updatepost').dataset.pid;

//     const response = await fetch(`api/posts/${postID}`, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//     });
//     if (response.ok) {
//         console.log(response);
//         document.location.replace(`/`);
//     } else {
//         alert('Failed to delete post');
//     }
// };

// document
//     .querySelector('#updatepost')
//     .addEventListener('click', editPostHandler);
// document
//     .querySelector('#delete-post')
//     .addEventListener('click', deletePostHandler);

const editPostHandler = async (event) => {
    event.preventDefault();
    console.log("hit the edit button");
    const title = document.querySelector("#title").value.trim();
    const content = document.querySelector("#content").value.trim();
    const postID = document.querySelector('#updatepost').dataset.pid;
    console.log(postID);

    if (title && content) {
        const response = await fetch(`../../api/posts/${postID}`, {
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

    const response = await fetch(`../../api/posts/${postID}`, {
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

document
    .querySelector('#updatepost')
    .addEventListener('click', editPostHandler);
document
    .querySelector('#delete-post')
    .addEventListener('click', deletePostHandler);