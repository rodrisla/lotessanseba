const inputBuscador = document.querySelector('#buscador');
const contenedorResultados = document.querySelector('#resultados');

let todosLosRegistros = [];

async function cargarLotes(){
    try {
        const respuesta = await fetch('complementos/lotes.json');
        const datos = await respuesta.json();
        todosLosRegistros = datos.areas.flatMap(area =>
            area.registros.map(reg => ({
                propietario: reg.propietario,
                lote: reg.lote,
                area: area.nombre
            }))
        );
    } catch (e) {
        console.error("Error al cargar datos", e);
    }
}

inputBuscador.addEventListener('input', () => {
    const busqueda = inputBuscador.value.toLowerCase();
    
    
    if (busqueda.length < 2) {
        contenedorResultados.innerHTML = "";
        return;
    }

    
    const encontrados = todosLosRegistros.filter(reg => 
        reg.propietario.toLowerCase().includes(busqueda)
    );

    
    mostrar(encontrados);
});


function mostrar(lista) {
    contenedorResultados.innerHTML = "";
    
    lista.forEach(res => {
        const item = document.createElement('div');
        item.classList.add('resultado-div');
        item.innerHTML = `
            <div class="propietario">${res.propietario}</div>
            <div class="lote">Lote: ${res.lote}</div>
            <div class="area">${res.area}</div>
        `;
        contenedorResultados.appendChild(item);
    });
}

cargarLotes();