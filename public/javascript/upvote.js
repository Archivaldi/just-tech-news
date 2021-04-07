async function upvoteClickHandler(event) {
    event.preventDefault();
    const windowLocation = window.location.toString();

    const id = windowLocation.split('/')[windowLocation.split('/').length - 1];

    const response = await fetch('/api/posts/upvote', {
        method: 'PUT',
        body: JSON.stringify({
          post_id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
}

document.querySelector('.upvote-btn').addEventListener('click', upvoteClickHandler);