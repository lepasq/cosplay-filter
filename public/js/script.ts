function typingEvent(event): void {
    if (event.keyCode === 13) {
        searchCharacters();
    }
}


function searchCharacters(): void {
    let searchInput: HTMLInputElement = (<HTMLInputElement>(document.getElementById('search-input')));
    searchInput.placeholder = searchInput.value;
    let tags:string = searchInput.value.split(' ').join(';');
    searchInput.value = "";
    getCharacters(tags);
}


function getCharacters(tags: string): void {
    fetch('/api/characters?tags=' + tags)
        .then(response => response.json())
        .then(data => console.log((generateResult(data))));
}


let entryHTML = function (param: object): string {
    return '<tr>' +
        '<th><a target="_blank" rel="noopener noreferrer" href="' + addEmoji(param['image']) + '"><img class="table-image" src="' + addEmoji(param['image']) + '" alt="' + addEmoji(param['name']) + '"></a></th>' +
        '<td>' + addEmoji(param['name']) + '</td>' +
        '<td>' + addEmoji(param['genre']) + '</td>' +
        '<td>' + addEmoji(param['title']) + '</td>' +
        '<td>' + addEmoji(param['gender']) + '</td>' +
        '<td>' + addEmoji(param['eyecolor']) + '</td>' +
        '<td>' + addEmoji(param['haircolor']) + '</td>' +
        '<td>' + addEmoji(param['height']) + '</td>' +
        '<td>' + addEmoji(param['age']) + '</td>' +
        '</tr>';
}


function generateResult(parameters: Array<object>): void {
    document.getElementById('table-header').style.visibility = "visible";
    let tbody: any = document.getElementById('table-body');
    let rows: string = "";
    for (let i = 0; i < parameters.length; i++) {
        rows += entryHTML(parameters[i]);
    }
    tbody.innerHTML = rows;
}


function addEmoji(param: string) {
    if (param == undefined) {
        return '';
    } else if(param == "Anime") {
        return ("Anime 🇯🇵");
    } else if(param == "Gaming") {
        return ("Gaming 🎮");
    } else if(param == "Movie" || param == "Series" || param == "TV") {
        return param + " 📺";
    } else if(param == "Male") {
        return ("Male ♂️");
    } else if(param == "Female") {
        return ("Female ♀️")
    } else {
        return param;
    }
}
