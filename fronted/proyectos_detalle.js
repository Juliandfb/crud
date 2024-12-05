// URL base del servidor Flask
const BASE_URL = "http://127.0.0.1:5000";

// Obtener el ID del proyecto desde la URL
function obtenerIdProyecto() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id_proyecto");
}

// Función para cargar los detalles del proyecto
async function cargarDetallesProyecto() {
    const id_proyecto = obtenerIdProyecto();
    if (!id_proyecto) {
        alert("ID del proyecto no especificado.");
        window.location.href = "proyectos.html"; // Redirigir si no hay ID
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/proyecto/${id_proyecto}`);
        const data = await response.json();

        if (data.proyecto) {
            // Mostrar los datos del proyecto en la página
            const proyecto = data.proyecto;
            document.getElementById("nombre").textContent = proyecto.nombre;
            document.getElementById("descripcion").textContent = proyecto.descripcion;
            document.getElementById("ubicacion").textContent = proyecto.ubicacion;
            document.getElementById("fecha_inicio").textContent = proyecto.fecha_inicio;
            document.getElementById("fecha_fin").textContent = proyecto.fecha_fin;
            document.getElementById("tipo_energia").textContent = `${proyecto.tipo_energia.tipo} - ${proyecto.tipo_energia.nombre_tipo_energia}`;
        } else {
            alert("Proyecto no encontrado.");
            window.location.href = "proyecto.html";
        }
    } catch (error) {
        console.error("Error al cargar los detalles del proyecto:", error);
        alert("Error al cargar los detalles.");
        window.location.href = "proyectos.html";
    }
}

// Cargar los detalles del proyecto automáticamente al abrir la página
document.addEventListener("DOMContentLoaded", cargarDetallesProyecto);
// Función para manejar el clic en el botón "Editar Proyecto"
document.getElementById("btn-editar").addEventListener("click", function() {
    const id_proyecto = obtenerIdProyecto();  // Obtener el ID del proyecto de la URL actual
    if (id_proyecto) {
        // Redirigir a la página de edición con el ID del proyecto en la URL
        window.location.href = `editar_proyecto.html?id_proyecto=${id_proyecto}`;
    } else {
        alert("No se puede obtener el ID del proyecto.");
    }
});
