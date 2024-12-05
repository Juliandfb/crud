document.addEventListener('DOMContentLoaded', function() {
    // Cargar los proyectos en el campo select
    cargarProyectos();

    // Manejar el envío del formulario
    document.getElementById('form_registrar_investigador').addEventListener('submit', function(e) {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const especialidad = document.getElementById('especialidad').value;
        const id_proyecto = document.getElementById('proyecto').value;

        // Enviar la solicitud para registrar el investigador
        registrarInvestigador(nombre, apellido, especialidad, id_proyecto);
    });
});

// Función para cargar los proyectos disponibles en el select
function cargarProyectos() {
    fetch('http://127.0.0.1:5000/proyecto')
        .then(response => response.json())
        .then(data => {
            const proyectos = data.proyectos;
            const select = document.getElementById('proyecto');
            proyectos.forEach(proyecto => {
                const option = document.createElement('option');
                option.value = proyecto.id_proyecto;
                option.textContent = proyecto.nombre;
                select.appendChild(option);
            });
        })
        .catch(error => console.log('Error al cargar proyectos:', error));
}

// Función para registrar al investigador
function registrarInvestigador(nombre, apellido, especialidad, id_proyecto) {
    const data = {
        nombre: nombre,
        apellido: apellido,
        especialidad: especialidad,
        id_proyecto: id_proyecto
    };

    fetch('http://localhost:5000/investigadores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        Swal.fire({
            title: 'Éxito',
            text: 'Investigador registrado correctamente.',
            icon: 'success'
        }).then(() => {
            window.location.href = 'investigadores.html'; // Redirigir a la página de consulta
        });
    })
    .catch(error => {
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al registrar el investigador.',
            icon: 'error'
        });
        console.error('Error al registrar investigador:', error);
    });
}

// Función para volver a la consulta general
function volver() {
    window.location.href = 'investigadores.html';
}
