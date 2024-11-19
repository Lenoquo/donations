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

names.forEach(name => {update_total(name,true)});

button1.onclick = async () => {
    if (!isNaN(parseInt(input.value))){
        let log_html = await fetch('/boing',
            {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name:dropdown.value,amount:input.value})  // you need to use stringify because thats how it is
            }
        )
        update_total(dropdown.value);
        grandTotal.innerHTML = parseInt(grandTotal.innerHTML) + parseInt(input.value);
        input.value = ''; // resets the text field to empty
        log.innerHTML += await log_html.text();
    }
};


async function update_total (name,startup = false) {
    let response = await fetch(`/getdata/${name}`);
    let data = await response.json();

    let f = document.getElementById(data.name);
    f.innerHTML = data.amount;

    if (startup) { //this doesnt run once at start up in runs 10 times jsyn
        grandTotal.innerHTML = parseInt(grandTotal.innerHTML) + parseInt(f.innerHTML)
        // add code that iterates the log at the bottom?
    }
}


/////

button2.onclick = async () => {
    await fetch('/reset');
    names.forEach(name => {update_total(name)});
    grandTotal.innerHTML = 0;
    log.innerHTML = '';
}


hi.onclick = async () => {
    console.log('hi')
    await fetch('/hi')
}