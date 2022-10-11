const addPostHandler = async (event) => {
    event.preventDefault();
    console.log(event);
    const title = document.querySelector("#title").value.trim();
    const content = document.querySelector("#content").value.trim();
    const user_id = document.querySelector("#add-post").dataset.uid;

    if (title && content) {
        const response = await fetch('api/posts/', {
            method: 'POST',
            body: JSON.stringify({ title, content, user_id}),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            console.log(response);
            document.location.replace('/');
          } else {
            alert('Failed to make post');
          }
    }
};

document
  .querySelector('#add-post')
  .addEventListener('click', addPostHandler);