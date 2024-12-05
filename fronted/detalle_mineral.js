// URL base del servidor Flask
const BASE_URL = "http://localhost:5000";

// Obtener el ID del mineral desde la URL
const urlParams = new URLSearchParams(window.location.search);
const idMineral = urlParams.get('id_mineral');

// Función para obtener los detalles de un mineral por su ID
async function obtenerMineral() {
    if (!idMineral) {
        Swal.fire({
            title: 'Error',
            text: 'No se proporcionó un ID de mineral.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/minerales/${idMineral}`);
        const data = await response.json();

        if (data.mineral) {
            // Si se encontró el mineral, mostrar sus detalles
            const mineral = data.mineral;
            const detallesMineral = `
                <h3>${mineral.nombre}</h3>
                <p><strong>Descripción:</strong> ${mineral.descripcion}</p>
                <p><strong>Ubicación:</strong> ${mineral.ubicacion}</p>
                <p><strong>Proyecto ID:</strong> ${mineral.id_proyecto}</p>
            `;
            document.getElementById("detalles-mineral").innerHTML = detallesMineral;
        } else {
            Swal.fire({
                title: 'Mineral no encontrado',
                text: data.mensaje,
                icon: 'info',
                confirmButtonText: 'Aceptar'
            });
        }
    } catch (error) {
        console.error("Error al obtener el mineral:", error);
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al intentar obtener el mineral.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
}

// Redirigir a la página de edición de ubicación
function habilitarEdicion() {
    document.getElementById('editar-ubicacion-btn').addEventListener('click', () => {
        window.location.href = `editar_mineral.html?id_mineral=${idMineral}`;
    });
}

// Cargar los detalles del mineral y habilitar el botón de edición al abrir la página
document.addEventListener("DOMContentLoaded", () => {
    obtenerMineral();
    habilitarEdicion();
});
