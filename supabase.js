const SUPABASE_URL =
"https://jvizawmhqlwnonsdztfz.supabase.co";

const SUPABASE_KEY =
"sb_publishable_cbn5OmUzZVrIwdeKHR5GRQ_bTHuF7dA";

const clienteSupabase =
window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

async function probarConexion(){

    const { data, error } =
    await clienteSupabase
        .from("reparaciones")
        .select("*");

    console.log("DATOS SUPABASE:", data);
    console.log("ERROR SUPABASE:", error);
}

async function actualizarReparacionSupabase(orden){

    const { data, error } = await clienteSupabase
        .from("reparaciones")
        .update({

            estado: orden.estado,
            tecnico: orden.tecnico,

            valor_reparacion: orden.valorReparacion,
            gastos: orden.gastos,

            transporte: orden.transporte,
            valor_transporte: orden.valorTransporte,

            fecha_entrega: orden.fechaEntrega

        })
        .eq("numero", orden.numero)
        .select();

    console.log("UPDATE REPARACION:", data);
    console.log("UPDATE ERROR:", error);

}


async function cargarReparaciones() {

    const { data, error } = await clienteSupabase
        .from("reparaciones")
        .select("*")
        .order("id", { ascending: true });

    if (error) {

        console.error(error);
        return;

    }

    reparaciones = data.map(r => ({

        numero: r.numero,
        cliente: r.cliente,
        telefono: r.telefono,
        direccion: r.direccion,

        producto: r.producto,
        marca: r.marca,
        modelo: r.modelo,
        serie: r.serie,

        falla: r.falla,
        observaciones: r.observaciones,
        accesorios: r.accesorios,

        ubicacion: r.ubicacion,
        estado: r.estado,

        tecnico: r.tecnico,

        valorReparacion: Number(r.valor_reparacion),
        gastos: Number(r.gastos),

        transporte: r.transporte,
        valorTransporte: Number(r.valor_transporte),

        fecha: r.fecha_creacion

    }));

    actualizarTablaReparaciones();

}

async function obtenerProximoNumeroOT() {

    const { data, error } = await clienteSupabase
        .from("reparaciones")
        .select("numero")
        .order("id", { ascending: false })
        .limit(1);

    if (error) {
        console.error(error);
        return "OT-000001";
    }

    if (data.length === 0) {
        return "OT-000001";
    }

    let ultimo = parseInt(data[0].numero.replace("OT-", ""));

    return "OT-" + String(ultimo + 1).padStart(6, "0");
}

async function guardarClienteSupabase(cliente){

    const { data, error } = await clienteSupabase
        .from("clientes")
        .insert([{

            nombre: cliente.nombre,
            telefono: cliente.telefono,
            direccion: cliente.direccion

        }])
        .select();

    console.log("CLIENTE DATA:", data);
    console.log("CLIENTE ERROR:", error);

}
async function actualizarClienteSupabase(cliente){

    const { data, error } = await clienteSupabase
        .from("clientes")
        .update({

            nombre: cliente.nombre,
            telefono: cliente.telefono,
            direccion: cliente.direccion

        })
        .eq("id", cliente.id)
        .select();

    console.log("UPDATE CLIENTE:", data);
    console.log("UPDATE ERROR:", error);
    async function guardarCliente(id){

    console.log("Entró a guardarCliente");

    let cliente =
        clientes.find(c => c.id == id);

    console.log("Cliente encontrado:", cliente);

    cliente.nombre =
        document.getElementById("editarNombre").value;

    cliente.telefono =
        document.getElementById("editarTelefono").value;

    cliente.direccion =
        document.getElementById("editarDireccion").value;

    console.log("Cliente modificado:", cliente);

    await actualizarClienteSupabase(cliente);

    console.log("Terminó el UPDATE");

    guardarDatos();

    await cargarDatos();

    actualizarTablaClientes();

    alert("Cliente actualizado correctamente.");
}

}

async function cargarClientes(){

    const { data, error } = await clienteSupabase
        .from("clientes")
        .select("*")
        .order("nombre");

    if(error){

        console.error(error);
        return;

    }

    clientes = data.map(c => ({

        id: c.id,
        nombre: c.nombre,
        telefono: c.telefono,
        direccion: c.direccion

    }));

    async function login(){

    const email =
        document.getElementById("loginEmail").value;

    const password =
        document.getElementById("loginPassword").value;

    const { data, error } =
        await clienteSupabase.auth.signInWithPassword({

            email: email,
            password: password

        });

    if(error){

        document.getElementById("errorLogin").innerText =
            error.message;

        return;
    }

    document.getElementById("pantallaLogin").style.display = "none";

    await cargarDatos();

    mostrarSeccion("ingreso");

}
    async function verificarSesion(){

    const { data } =
        await clienteSupabase.auth.getSession();

    if(data.session){

        document.getElementById("pantallaLogin").style.display = "none";

        await cargarDatos();

        mostrarSeccion("ingreso");

    }

}
    async function cerrarSesion(){

    await clienteSupabase.auth.signOut();

    location.reload();

}

}

