window.addEventListener('load', function() {
    fetch('https://api.github.com/orgs/funwebdev-2nd-ed/repos')
        .then(function (response) {
            if (response.ok){
                return response.json();
            } else {
                return Promise.reject({
                    status: response.status,
                    statusText: response.statusText
                })
            }
        })
        .then(function (response) {
            console.dir(response);
        })
        .catch(function (error) {
            console.log(error);
    });

});


