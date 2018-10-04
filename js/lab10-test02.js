function initMap() {

}

function addGalleries(galleryData) {
    function createBullet(name) {
        const li = document.createElement('li');
        li.textContent = name;
        return li
    }
    const placeHere = document.querySelector(".b");
    clearDiv(placeHere);
    const list = document.createElement('ul');
    for (let gallery of galleryData){
        list.appendChild(createBullet(gallery.nameEn))
    }
    placeHere.appendChild(list);
}

function clearDiv(div) {
    div.innerHTML = ""
}

window.addEventListener('load', function () {

    const endpoint = 'https://gist.githubusercontent.com/rconnolly/a0ad7768d65b6fa46f4e007a1cf27193/raw/38696e5b84cd6b66667a6b87c66c058ab2606ba2/galleries.json';

    fetch(endpoint)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject({
                    status: response.status,
                    statusText: response.statusText
                })
            }
        })
        .then((e) => {
            console.log(e);
            addGalleries(e);
        })
        .catch((e) => {
            console.error(e)
        })

});
