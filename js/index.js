var group;
var div_dev;

function getCmbValue() {
    let cmb_dev = document.getElementById('cmb_dev');
    group = cmb_dev.value;
    if (group == '') {
        handlerDom();
    } else {
        getJson();
    }
}

async function getJson() {
    let url = 'https://frontend-test-api.alex93.now.sh/api/languages?group=' + group;
    let response = await fetch(url);

    if (!response.ok) {
        alert("Ошибка HTTP: " + response.status);
    } else {
        let json = await response.json();
        handlerDom();
        for (let i = 0; i < json.data.length; i++) {
            if (json.data[i].hasOwnProperty('logo')) {
                let div_lang = document.createElement('div');
                div_lang.setAttribute('id', 'div_lang');
                div_dev.appendChild(div_lang);

                let img = new Image(100, 100);
                img.src = json.data[i].logo;
                div_lang.appendChild(img);

                let name = document.createElement("p");
                name.setAttribute('id', 'name');
                name.innerText = json.data[i].name;
                div_lang.appendChild(name);

                let year = document.createElement("p");
                year.setAttribute('id', 'year');
                year.innerText = 'Основан в ' + json.data[i].year;
                div_lang.appendChild(year);

                let projectsCount = document.createElement("p");
                projectsCount.setAttribute('id', 'projectsCount');
                projectsCount.innerText = json.data[i].projectsCount + ' проектов на GitHub';
                div_lang.appendChild(projectsCount);

                let docs = document.createElement("a");
                docs.setAttribute('id', 'docs');
                docs.innerText = 'Документация';
                docs.href = json.data[i].docs;
                docs.setAttribute('target', '_blank');
                div_lang.appendChild(docs);
            }
        }
    }
}

function handlerDom() {
    div_dev = document.getElementById('div_dev');
    div_dev.remove();
    div_dev = document.createElement('div');
    div_dev.setAttribute('id', 'div_dev');
    document.body.appendChild(div_dev);
}