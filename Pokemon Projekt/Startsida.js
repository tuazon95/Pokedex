
"use-strict";
// Vi skapar en referens till sökfältet
var frm = document.querySelector('#search-form');

/* 
  1. Vi sätter en lysnare på submit, på sökfältet
  2. Vi sätter en preventDefault, så att inte en standardåtgärd tas som normalt om händelsen inte har hanterats
  3. Sedan så skapar vi en referens till sökfältets värde (det någon skriver in i fältet);
  4. Sedan så hämtar vi information från vår url, med pkmn = det som skrevs in
  5. Går det igenom, så returnerar vi json
  6. Från JSON så tar vi emot datan och skickar med det som parameter till createTable(), samtidigt som vi tömmer h2 om det skulle
    stå kvar någon error
  7. Om det man sökte på inte skulle finnas i vårt API så skickar vi med en error
*/
frm.addEventListener('submit', function (e) {
  e.preventDefault();

  const pokmn = document.querySelector('#search').value;

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokmn}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let h2 = document.getElementById('error');
      h2.innerHTML = "";
      createTable(data);
    }).
    // catch metoden har jag hämtat inspiration från https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
    //Jag anpassade den genom att göra det på samma sätt som vi gjort under tidigare labbarna i JS Kursen
    catch(function (error) {
      error = document.getElementById('error');
      error.style.color = 'red';
      error.innerHTML = '<b>' + 'This Pokemon does not exist!' + '</b>';

    })


});

/* 
  1. Denna funktion tar emot JSON data som vi använder oss av för att plocka ut den datan vi vill komma åt
  2. Vi skapar en rad och skapar en referens till vår tbody, vår tabellrad lägger vi sedan in i bodyn
  3. Skapar en ny image tagg och sätter en source som är bilden (sprites) och typen av bild (front_default). och lägger in de i vår tabellrad
  4. Vi skapar en tabelcell och fyller den med namnet på den pokemon vi sökte efter och genom textContent och lägger in vår cell i vår tabellrad
  5. Vi skapar ytterligare en tabellcell och fyller den med vad för typ av Pokemon det är. Eftersom det är en Array, så väljer jag den första typen i arrayen
  6. Samma sak gör vi i de två övriga tabellcellerna, men hämtar ut attack som och defense som är i samma array, men på olika platser
*/

function createTable(data) {
  let row = document.createElement('tr');
  let tbody = document.querySelector('#tbody');
  tbody.appendChild(row);

  let image = document.createElement('img');
  image.src = '' + data.sprites.front_default;
  row.appendChild(image);


  let name = document.createElement('td');
  name.textContent = data.name;
  row.appendChild(name);

  let type = document.createElement('td');
  type.textContent = data.types[0].type.name;
  row.appendChild(type);

  let attack = document.createElement('td');
  attack.textContent = data.stats[4].base_stat;
  row.appendChild(attack);

  let defense = document.createElement('td');
  defense.textContent = data.stats[3].base_stat;
  row.appendChild(defense);

}

//Här skapar vi en lyssnare för reset, som tömmer vår sökhistorik i bodyn, när man trycker på knappen
frm.addEventListener('reset', function () {
  let tbody = document.querySelector('#tbody');
  tbody.innerHTML = '';

});









