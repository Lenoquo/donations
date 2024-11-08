// Here is where I will attempt to build the repetitive HTML in JavaScript

const names = ['nobody','Alice','Bob','Carlos',
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

names.forEach(name => {update_screen(name)});

button1.onclick = async () => {
    if (!isNaN(parseInt(input.value))){
        await fetch('/boing',
            {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name:dropdown.value,amount:input.value})  // you need to use stringify because thats how it is
            }
        )

        update_screen(dropdown.value);
        input.value = ''; // resets the text field to empty
    }
};


async function update_screen (name) {
    let response = await fetch(`/getdata/${name}`);
    let data = await response.json();
    
    let f = document.getElementById(data.name);
    f.innerHTML = data.amount;
}


/////

button2.onclick = async () => {
    await fetch('/reset');
    names.forEach(name => {update_screen(name)});
}