//ESPERAMOS A QUE EL DOM ESTE COMPLETAMENTE CARGADO.
//DEFINIMOS ALGUNAS VARIABLES PARA REFERENCIAR ELEMENTOS DEL DOM.
document.addEventListener("DOMContentLoaded", async () => {
    const apiURL = "https://restcountries.com/v3/all";
    const countriesList = document.getElementById("countries-list");
    const modal = document.getElementById("modal");
    const closeBtn = document.getElementById("close-btn"); // Asegúrate de que el ID coincida con el HTML
    const countryDetails = document.getElementById("country-details");

//FUNCION PARA OBTENER LOS PAISES:
//UTILIZAMOS FETCH PARA OBTENER LOS DATOS DE LA API
//CONVERTIMOS LA RESPUESTA A JSON
//ORDENAMOS LOS PAISES ALFABETICAMENTE
//CREAMOS ELEMENTOS EN EL DOM PARA CADA PAIS Y AGREGAMOS UN EVENTO DE CLIC PARA MOSTRAR LOS DETALLES 

    async function fetchCountries() {
    try {
            const response = await fetch(apiURL);
            const countries = await response.json();
            
            // Ordenamos los países alfabéticamente
            countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

            // Mostramos los países
            countries.forEach(country => {
                const countryElement = document.createElement("div");
                countryElement.classList.add("country");

                // Verificamos las URLs de las banderas
                const flagUrl = country.flags && (country.flags?.png || country.flags?.svg);
                
                if (flagUrl) {
                    countryElement.innerHTML = `
                        <img src="${flagUrl}" alt="Bandera de ${country.name.common}" width="100"> 
                        <p>${country.name.common}</p> 
                    `;
                } else {
                    countryElement.innerHTML = `
                        <p>${country.name.common}</p> 
                        <p>Imagen no disponible</p> 
                    `;
                }
                countryElement.addEventListener("click", () => showCountryDetails(country));
                countriesList.appendChild(countryElement);
            });
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        } 
    }


//Funcion para mostrar los detalles del pais
//Esta funcion muestra la informacion detallada del pais seleccionado en el modal.
//Cambiamos el contenido del modal y lo mostramos.

    function showCountryDetails(country) {
        const flagUrl = country.flags && (country.flags?.png || country.flags?.svg);
        countryDetails.innerHTML = `
            <h2>${country.name.common}</h2>
            ${flagUrl ? `<img src="${flagUrl}" alt="Bandera de ${country.name.common}" width="150">` : '<p>Imagen no disponible</p>'}
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p><strong>Población:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Conduce por:</strong> ${country.car.side === 'right' ? 'Derecha' : 'Izquierda'}</p>
        `;
        modal.classList.remove("hidden");
        modal.style.display = "block";
    }
    //Funcion para cerrar el modal
    //Añadimos un evento para cerrar el modal cuando se hace clic en el boton de cerrar.
    closeBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
        modal.style.display = "none";
    });

    // Obtener y mostrar los países al cargar la página
fetchCountries();
});

