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
                let para = document.createElement("p");
                para.innerText = json.data[i].logo;
                div_dev.appendChild(para);
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