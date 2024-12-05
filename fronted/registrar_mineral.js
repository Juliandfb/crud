// URL base del servidor
const BASE_URL = "http://127.0.0.1:5000";

// Función para cargar los proyectos disponibles
async function cargarProyectos() {
    const selectProyecto = document.getElementById("id_proyecto");

    try {
        const response = await fetch(`${BASE_URL}/proyecto`);
        const data = await response.json();

        if (data.proyectos && data.proyectos.length > 0) {
            // Agregar proyectos al select
            data.proyectos.forEach(proyecto => {
                const option = document.createElement("option");
                option.value = proyecto.id_proyecto;
                option.textContent = proyecto.nombre; // Mostrar solo el nombre del proyecto
                selectProyecto.appendChild(option);
            });
        } else {
            alert("No se encontraron proyectos.");
        }
    } catch (error) {
        console.error("Error al cargar los proyectos:", error);
        alert("Hubo un problema al cargar los proyectos.");
    }
}

// Función para registrar un nuevo mineral
async function registrarMineral(event) {
    event.preventDefault();  // Evitar que el formulario se envíe de forma tradicional

    // Obtener los valores del formulario
    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;
    const ubicacion = document.getElementById("ubicacion").value;
    const id_proyecto = document.getElementById("id_proyecto").value;

    // Verificar que se haya seleccionado un proyecto
    if (!id_proyecto) {
        alert("Por favor, selecciona un proyecto.");
        return;
    }

    // Crear el objeto de datos para enviar al servidor
    const datos = {
        nombre: nombre,
        descripcion: descripcion,
        ubicacion: ubicacion,
        id_proyecto: id_proyecto
    };

    try {
        // Enviar los datos al servidor Flask
        const response = await fetch(`${BASE_URL}/minerales`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });

        const result = await response.json();

        if (response.ok) {
            // Alerta de éxito con SweetAlert2
            Swal.fire({
                icon: 'success',
                title: 'Registro Exitoso',
                text: result.mensaje,  // Mensaje de respuesta del servidor
                confirmButtonText: 'Aceptar'
            }).then(() => {
                window.location.href = "minerales.html"; // Redirigir al listado de minerales
            });
        } else {
            // Alerta en caso de error con SweetAlert2
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: result.mensaje,
                confirmButtonText: 'Intentar nuevamente'
            });
        }
    } catch (error) {
        console.error("Error al registrar el mineral:", error);
        
        // Alerta de error en caso de fallo en la comunicación con el servidor
        Swal.fire({
            icon: 'error',
            title: 'Hubo un error',
            text: 'Hubo un error al intentar registrar el mineral.',
            confirmButtonText: 'Intentar nuevamente'
        });
    }
}

// Cargar los proyectos cuando la página esté lista
document.addEventListener("DOMContentLoaded", cargarProyectos);
