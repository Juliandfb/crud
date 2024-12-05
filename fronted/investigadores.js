// URL base del backend
const BASE_URL = "http://127.0.0.1:5000";

// Obtener la lista de investigadores
const cargarInvestigadores = async () => {
    try {
        const response = await fetch(`${BASE_URL}/investigadores`);
        const data = await response.json();
        const tabla = document.getElementById("investigadoresTabla");
        tabla.innerHTML = ""; // Limpiar tabla

        data.investigadores.forEach((investigador) => {
            const fila = `
                <tr>
                    <td>${investigador.id_investigador}</td>
                    <td>${investigador.nombre}</td>
                    <td>${investigador.apellido}</td>
                    <td>${investigador.especialidad || "N/A"}</td>
                    <td>${investigador.proyecto || "Sin proyecto"}</td>
                    <td>
                        <button onclick="editarInvestigador(${investigador.id_investigador})">Editar</button>
                        <button onclick="eliminarInvestigador(${investigador.id_investigador})">Eliminar</button>
                    </td>
                </tr>
            `;
            tabla.innerHTML += fila;
        });
    } catch (error) {
        console.error("Error al cargar investigadores:", error);
    }
};

// Eliminar un investigador con confirmación
const eliminarInvestigador = async (id) => {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await fetch(`${BASE_URL}/investigadores/${id}`, {
                    method: "DELETE",
                });
                const data = await response.json();

                Swal.fire("Eliminado", data.mensaje, "success");
                cargarInvestigadores(); // Actualizar la lista
            } catch (error) {
                console.error("Error al eliminar investigador:", error);
            }
        }
    });
};

// Redirigir al formulario de edición
const editarInvestigador = (id) => {
    window.location.href = `editar_investigador.html?id=${id}`;
};

// Redirigir al formulario de registro
document.getElementById("agregarBtn").addEventListener("click", () => {
    window.location.href = "registro_investigador.html";
});

// Cargar investigadores al iniciar
cargarInvestigadores();
