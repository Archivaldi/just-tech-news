async function editFormHandler(event) {
    event.preventDefault();

    const windowLocation = window.location.toString();

    const id = windowLocation.split('/')[windowLocation.split('/').length - 1];
    const title = document.getElementsByTagName("input")[0].value;

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }
}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);