async function deleteFormHandler(event) {
    event.preventDefault();
    const windowLocation = window.location.toString();
    const id = windowLocation.split('/')[windowLocation.split('/').length - 1];
    console.log(id);

    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

    if (response.ok){
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);