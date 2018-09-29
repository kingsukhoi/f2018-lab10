window.addEventListener('load', function() {
    fetch('https://api.github.com/orgs/funwebdev-2nd-edafasd/repos')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.dir(data)
        })
        .catch(function (error) {
            console.log(error)
        });
});


