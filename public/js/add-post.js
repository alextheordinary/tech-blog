const addPostHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector("#title").value.trim();
    const content = document.querySelector("#content").value.trim();

    if (title && content) {
        const response = await fetch('api/posts/', {
            method: 'POST',
            body: JSON.stringify({ title, content}),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            console.log(response);
            document.location.replace('/dashboard');
          } else {
            alert('Failed to make post');
          }
    }
};
const cancelButtonHandler = async (event) => {
  event.preventDefault();

  document.location.replace(`/dashboard`);

};

document
  .querySelector('#add-post')
  .addEventListener('click', addPostHandler);
  document
  .querySelector('#cancel')
  .addEventListener('click', cancelButtonHandler);