axios.get('https://api.aladhan.com/v1/timingsByAddress/20-06-2025?address=UK')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })