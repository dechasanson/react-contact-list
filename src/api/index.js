export const fetchAPI = async (url, method = "GET", sendData = null) => {
  const fetchOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlY2hhOTJAaG90bWFpbC5jb20iLCJpYXQiOjE2MDU1Nzc4NTMsImV4cCI6MTYwNjE4MjY1M30.fwbG9M6mtYX-HUdrltiMx6VPxyh6gZ4t3UtOj4EnKFk",
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
