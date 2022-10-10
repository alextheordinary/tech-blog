const loginFormHandler = async (event) => {
    event.preventDefault();
    console.log("login button clicked")

    const username = document.querySelector("#username-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();

    if (username && password) {
        console.log("right before post")
        const response = await fetch('api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/');
          } else {
            alert('Failed to log in');
          }
    }
};

document
  .querySelector('#submit')
  .addEventListener('click', loginFormHandler);