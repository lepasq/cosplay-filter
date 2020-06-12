function typingEvent(event): void {
    if (event.keyCode === 13) {
        searchCharacters();
    }
}


function searchCharacters(): void {
    let searchInput: HTMLInputElement = (<HTMLInputElement>(document.getElementById('search-input')));
    searchInput.placeholder = searchInput.value;
    let tags: Array<string> = searchInput.value.split(' ');
    searchInput.value = "";
    getCharacters(tags);
}


function getCharacters(tags: Array<string>): void {
    fetch('/api/characters')
        .then(response => response.json())
        .then(data => console.log((generateResult(data))));
}


let entryHTML = function (param: object): string {
    return '<tr>' +
        '<th><a href="' + addParam(param['image']) + '"><img class="table-image" src="' + addParam(param['image']) + '" alt="' + addParam(param['name']) + '"></a></th>' +
        '<td>' + addParam(param['name']) + '</td>' +
        '<td>' + addParam(param['genre']) + '</td>' +
        '<td>' + addParam(param['title']) + '</td>' +
        '<td>' + addParam(param['gender']) + '</td>' +
        '<td>' + addParam(param['eyecolor']) + '</td>' +
        '<td>' + addParam(param['haircolor']) + '</td>' +
        '<td>' + addParam(param['height']) + '</td>' +
        '<td>' + addParam(param['age']) + '</td>' +
        '<td>' + addParam(param['tags']) + '</td>' +
        '</tr>';
}


function generateResult(parameters: Array<object>): void {
    document.getElementById('table-header').style.visibility = "visible";
    let tbody: any = document.getElementById('table-body');
    for (let i = 0; i < parameters.length; i++) {
        tbody.innerHTML += entryHTML(parameters[i]);
    }
}


function addParam(param: string) {
    return (param == undefined) ? '' : param;
}
