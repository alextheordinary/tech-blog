const addPostButtonHandler = async (event) => {
    event.preventDefault();

    document.location.replace('/add-post');

};
    document
        .querySelector('#add-post')
        .addEventListener('click', addPostButtonHandler);