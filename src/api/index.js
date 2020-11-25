export const fetchAPI = async (url, method = "GET", sendData = null) => {
  const fetchOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlY2hhIiwiaWF0IjoxNjA2MjYyNTA5LCJleHAiOjE2MTE0NDY1MDl9.Us4U9cMiyho5h7kYvelQx9v5VdharuQZR5lN7LOt4pQ",
    },
  };

  if (sendData) {
    fetchOptions.body = JSON.stringify(sendData);
  }

  const response = await fetch(url, fetchOptions);
  const data = await response.json();

  return data;
};
//Below is an example of this fetch
// fetchAPI("https://univ-contact-book.herokuapp.com/api/contacts")
//   .then(function (data) {
//     console.log('my contacts', data);
//   })
//   .catch(function (error) {
//     console.error('error fetching contacts', error);
//   })
