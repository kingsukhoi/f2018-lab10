let galleries;

function initMap() {

}

/**
 * Update the A div
 * @param gallery entire gallery object. Long story short you find the bloody thing.
 */
function updateA(gallery) {
    function createKeyValue(key, value, isURL = false) {
        function addLink(link) {
            const linkElem = document.createElement('a');
            linkElem.setAttribute('href', link);
            linkElem.appendChild(document.createTextNode(link));
            return linkElem;
        }
        const keyElem = document.createElement('strong');
        keyElem.appendChild(document.createTextNode(key+": "));
        const valueElem = document.createElement('span');
        if(isURL)
            valueElem.appendChild(addLink(value));
        else 
            valueElem.appendChild(document.createTextNode(value));
        const pTag = document.createElement('p');
        pTag.appendChild(keyElem);
        pTag.appendChild(valueElem);
        return pTag;
    }
    const aDiv = document.querySelector(".a");
    clearDiv(aDiv);
    aDiv.appendChild(createKeyValue("Gallery Name", gallery.nameEn));
    aDiv.appendChild(createKeyValue("Link", gallery.link, true))

}

function updateB() {
    function createBullet(name) {
        const li = document.createElement('li');
        li.textContent = name;
        li.addEventListener('click', (e)=>{
            const name = e.target.textContent;
            const elem = galleries.find((curr)=>{
                return curr.nameEn === name;
            });
            updateA(elem);
        });
        return li
    }
    const bDiv = document.querySelector(".b");
    clearDiv(bDiv);
    const list = document.createElement('ul');
    for (let gallery of galleries){
        list.appendChild(createBullet(gallery.nameEn))
    }
    bDiv.appendChild(list);
}

function clearDiv(div) {
    div.childNodes.forEach((curr) => div.removeChild(curr));
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
            galleries = e;
            updateB();
        })
        .catch((e) => {
            console.error(e)
        })

});
