// Here is where I will attempt to build the repetitive HTML in JavaScript

const names = ['Alice','Bob','Carlos',
    'Darla','Ellen','Franklin',
    'Georgia','Hector','Iago'];

let build_dropdown = '';
let build_biglist = '';

names.forEach(name => {
    build_dropdown += `<option>${name}</option>`;
    build_biglist += `<p>${name}:</p><p id = "${name}">0</p>`
});

dropdown.innerHTML = build_dropdown;
biglist.innerHTML = build_biglist;

////

update_screen();

button1.onclick = async () => {
    console.log('swishy williams')
    if (!isNaN(parseInt(input.value))){
        console.log('is number');
        await fetch('/boing',
            {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name:dropdown.value,amount:input.value})  // you need to use stringify because thats how it is
            }
        )

        update_screen();

    }
};


async function update_screen () {
    let response = await fetch('/getdata');
    let data = await response.text();
    data = JSON.parse(data);
    
    const players = Object.keys(data);
    console.log(players)

    players.forEach(player => {
        let f = document.getElementById(player);
        f.innerHTML = data[player]
    })

    input.value = '';

}