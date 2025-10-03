let input_sku = document.getElementById('sku');
let btn_buscar = document.getElementById('btn-buscar');
let arrTallas = [];
let card = document.querySelector('.card');
let url_Img = 'https://www.pre.desigual.com/dw/image/v2/BCVV_PRD/on/demandware.static/-/Sites-desigual-m-catalog/default/dw97ce96ee/images/B2C/';


async function data(sku) {
    try {
        const response = await fetch('json/all_Master.json');

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const productoEncontrado = data.filter(item => item.Sku === sku)

        if(productoEncontrado){
            let concaUrl = sku.slice(0,8)+'_'+sku.slice(8,12)+'_X.jpg';
            let img = document.createElement('img');
            img.setAttribute('src', url_Img+concaUrl);
            let label_Sku = document.createElement('h2');
            label_Sku.textContent = productoEncontrado[0].Sku;
            card.appendChild(label_Sku);
            card.appendChild(img);
            const table = document.createElement('table');
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            const thTalla = document.createElement('th');
            thTalla.textContent = 'Talla';
            thTalla.style.border = '1px solid black';
            const thEAN = document.createElement('th');
            thEAN.textContent = 'EAN';
            thEAN.style.border = '1px solid black';
            headerRow.appendChild(thTalla);
            headerRow.appendChild(thEAN);
            thead.appendChild(headerRow);
            table.appendChild(thead);
            const tbody = document.createElement('tbody');

            for (let i = 0; i < productoEncontrado.length; i++) {
                const row = document.createElement('tr');
                const tdTalla = document.createElement('td');
                tdTalla.textContent = productoEncontrado[i].Talla;
                tdTalla.style.border = '1px solid black';

                const tdEAN = document.createElement('td');
                tdEAN.textContent = productoEncontrado[i].EAN;
                tdEAN.style.border = '1px solid black';

                row.appendChild(tdTalla);
                row.appendChild(tdEAN);
                tbody.appendChild(row);
            }
            table.appendChild(tbody);
            card.appendChild(table);
        }
    }   catch (error) {
            let p = document.createElement('p');
            p.textContent = 'Sku no encontrado'
            card.appendChild(p);
            console.error('Error al leer el archivo JSON:', error);
        }
}

btn_buscar.addEventListener('click', () => {
    card.innerHTML='';
    let sku = input_sku.value;
    sku = sku.toUpperCase();
    if(sku == ''){
        let p = document.createElement('p');
        p.textContent = 'Sku vacio'
        card.appendChild(p);
    } else if(sku.length < 12 || sku.length > 12){
        let p = document.createElement('p');
        p.textContent = 'Sku no Valido'
        card.appendChild(p);
    } else{
            data(sku);
        }
    input_sku.value='';
});