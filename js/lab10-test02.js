let galleries;
let map;
let mapUp=false;
function initMap() {
    map = new google.maps.Map(document.querySelector('.d'), {
        center: {lat: 41.89474, lng: 12.4839},
        zoom: 18,
        mapTypeId: 'satellite',
        tilt: 45
    });
    mapUp=true;
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
        const liTag = document.createElement('li');
        liTag.appendChild(keyElem);
        liTag.appendChild(valueElem);
        return liTag;
    }
    const aDiv = document.querySelector(".a");
    clearDiv(aDiv);
    const list = document.createElement('ul');
    list.appendChild(createKeyValue("Gallery Name", gallery.nameEn));
    list.appendChild(createKeyValue("Link", gallery.link, true));
    list.appendChild(createKeyValue("Address", `${gallery.location.address}, ${gallery.location.city} ${gallery.location.country}`));
    aDiv.appendChild(list);
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
            updateC(elem.paintings);
            updateD(elem.location.latitude, elem.location.longitude);
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

function updateC(paintings) {
    const cDiv = document.querySelector('.c');
    clearDiv(cDiv);
    const ul = document.createElement('ul');
    for (let painting of paintings){
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(painting.title));
        li.addEventListener('click', (e) => {
            const utterThis = new SpeechSynthesisUtterance(e.target.textContent);
            speechSynthesis.speak(utterThis);
        });
        ul.appendChild(li);
    }
    cDiv.appendChild(ul);
}

function updateD(lat, lng) {
    /*document.querySelector(".d").setAttribute('style', 'display:;');*/
    if(!mapUp){
        initMap();
    }
    map.setCenter({lat:lat, lng: lng});
    map.setZoom(18);
    map.setTilt(45);

}

function clearDiv(div) {
    div.childNodes.forEach((curr) => div.removeChild(curr));
}

window.addEventListener('load', function () {

    const endpoint = 'https://gist.githubusercontent.com/rconnolly/a0ad7768d65b6fa46f4e007a1cf27193/raw/38696e5b84cd6b66667a6b87c66c058ab2606ba2/galleries.json';
/*
    document.querySelector('.d').setAttribute('style', 'display:none;')
*/
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
