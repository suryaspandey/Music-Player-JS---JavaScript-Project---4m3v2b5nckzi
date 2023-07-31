const playlistImg = localStorage.getItem('playlistImg');
// const playlistId = localStorage.getItem('playlistId');

const plalistheaderdata = document.getElementById('playlist-header');


fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
})
  .then(response => response.json())
  .then(data => {



    plalistheaderdata.innerHTML = `<table>
      <tr id  ="playlist-header">
          <td>
              <img id = "playlistImg" src="${playlistImg}" height="185px" width="200px">
          </td>
          <td id="header-text">
              <div>

              <h1 id="playlistName" >${data.name}</h1>
              <p id="playlistDescription">${data.description} </p>

              </div>
          </td>
      </tr>

    </table>`

  });











