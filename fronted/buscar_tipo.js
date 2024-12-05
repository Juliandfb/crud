// URL base del servidor Flask
const BASE_URL = "http://localhost:5000";

// Función para buscar tipos de energía por renovabilidad (Renovable o No Renovable)
async function buscarPorRenovabilidad() {
    const tipoRenovabilidad = document.getElementById("tipo-renovabilidad").value;
    const tablaResultados = document.querySelector("#resultados-busqueda tbody");
    tablaResultados.innerHTML = ""; // Limpiar tabla antes de mostrar los nuevos resultados

    if (!tipoRenovabilidad) {
        alert("Por favor, seleccione un tipo de renovabilidad.");
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/tipo_energia`);
        const data = await response.json();

        if (data.tipo_energia) {
            // Filtra los datos por el tipo de renovabilidad
            const filtrados = data.tipo_energia.filter(tipo => tipo.tipo === tipoRenovabilidad);

            if (filtrados.length > 0) {
                // Agregar los resultados filtrados a la tabla
                filtrados.forEach(tipo => {
                    const row = `
                        <tr>
                            <td>${tipo.id_tipo_energia}</td>
                            <td>${tipo.tipo}</td>
                            <td>${tipo.nombre_tipo_energia}</td>
                        </tr>
                    `;
                    tablaResultados.innerHTML += row;
                });
            } else {
                tablaResultados.innerHTML = "<tr><td colspan='3'>No se encontraron resultados para esta opción.</td></tr>";
            }
        } else {
            tablaResultados.innerHTML = "<tr><td colspan='3'>No se encontraron registros.</td></tr>";
        }
    } catch (error) {
        console.error("Error al buscar el tipo de energía:", error);
        tablaResultados.innerHTML = "<tr><td colspan='3'>Error al buscar los datos.</td></tr>";
    }
}

// Asociar evento al botón de búsqueda
document.getElementById("buscar-tipo-btn").addEventListener("click", buscarPorRenovabilidad);
