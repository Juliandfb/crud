// Obtiene el ID del investigador desde la URL (por ejemplo, editar_investigador.html?id=1)
const urlParams = new URLSearchParams(window.location.search);
const id_investigador = urlParams.get('id');

// Función para obtener los proyectos disponibles
function obtenerProyectos() {
    return fetch('/proyectos')  // Suponemos que '/proyectos' devuelve todos los proyectos
        .then(response => response.json())
        .then(data => data.proyectos)  // Devuelve el arreglo de proyectos
        .catch(error => console.error('Error al obtener los proyectos:', error));
}

// Cargar los proyectos y rellenar el campo select
function cargarProyectos() {
    obtenerProyectos().then(proyectos => {
        const proyectoSelect = document.getElementById('id_proyecto');

        // Limpiar las opciones actuales
        proyectoSelect.innerHTML = '<option value="">Seleccione un proyecto</option>';

        // Llenar el campo de selección con los proyectos obtenidos
        proyectos.forEach(proyecto => {
            const option = document.createElement('option');
            option.value = proyecto.id_proyecto;  // Asumimos que cada proyecto tiene un 'id_proyecto'
            option.textContent = proyecto.nombre;  // El nombre del proyecto
            proyectoSelect.appendChild(option);
        });

        // Cargar los datos del investigador después de obtener los proyectos
        cargarDatosInvestigador();
    });
}

// Cargar los datos del investigador y pre-seleccionar el proyecto
function cargarDatosInvestigador() {
    fetch(`/investigadores/${id_investigador}`)  // Suponemos que '/investigadores/:id' devuelve los datos del investigador
        .then(response => response.json())
        .then(data => {
            if (data.investigador) {
                document.getElementById('nombre').value = data.investigador.nombre;
                document.getElementById('apellido').value = data.investigador.apellido;
                document.getElementById('especialidad').value = data.investigador.especialidad;
                document.getElementById('id_proyecto').value = data.investigador.id_proyecto; // Pre-seleccionamos el proyecto asignado
            }
        })
        .catch(error => console.error('Error al obtener el investigador:', error));
}

// Manejo del formulario para guardar los cambios
document.getElementById('editar-investigador-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const investigador = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        especialidad: document.getElementById('especialidad').value,
        id_proyecto: document.getElementById('id_proyecto').value
    };

    fetch(`/investigadores/${id_investigador}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(investigador)
    })
    .then(response => response.json())
    .then(data => {
        if (data.mensaje === 'Investigador actualizado exitosamente') {
            Swal.fire('Éxito', 'Los cambios se han guardado correctamente', 'success');
        } else {
            Swal.fire('Error', 'Hubo un problema al actualizar el investigador', 'error');
        }
    })
    .catch(error => {
        Swal.fire('Error', 'Hubo un problema al guardar los cambios', 'error');
    });
});

// Función para volver a la lista de investigadores
function volver() {
    window.location.href = 'investigadores.html';
}

// Cargar los proyectos cuando se cargue la página
document.addEventListener('DOMContentLoaded', cargarProyectos);
