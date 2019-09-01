var group;
var div_dev;
var k = 0;

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
        let div_container = document.createElement('div');
        div_container.setAttribute('id', 'div_container');
        div_dev.appendChild(div_container);

        let div_container_res = document.createElement('div');
        div_container_res.setAttribute('id', 'div_container_res');
        div_container.appendChild(div_container_res);

        for (let i = 0; i < json.data.length; i++) {
            if (json.data[i].hasOwnProperty('logo')) {
                let div_lang = document.createElement('div');
                div_lang.setAttribute('id', 'div_lang');
                div_container_res.appendChild(div_lang);

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

                docs_href = json.data[i].docs;
                let docs = document.createElement("a");
                docs.setAttribute('id', 'docs');
                docs.innerText = 'Документация';
                if (docs_href) {
                    docs.href = docs_href;
                    docs.setAttribute('target', '_blank');
                    div_lang.appendChild(docs);
                } else {
                    docs.href = 'https://www.google.com/search?q=' + json.data[i].name;
                    docs.setAttribute('target', '_blank');
                    div_lang.appendChild(docs);
                }
                k++;
            }
        }


        let label_res = document.createElement('label');
        label_res.setAttribute('class', 'my-1 mr-2');
        div_container.appendChild(label_res);
        label_res.innerText = 'Результат (' + k + '): ';
    }
}

function handlerDom() {
    k = 0;
    div_dev = document.getElementById('div_dev');
    div_dev.remove();
    div_dev = document.createElement('div');
    div_dev.setAttribute('id', 'div_dev');
    document.body.appendChild(div_dev);
}