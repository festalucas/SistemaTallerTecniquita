const SUPABASE_URL =
"https://jvizawmhqlwnonsdztfz.supabase.co";

const SUPABASE_KEY =
"sb_publishable_cbn5OmUzZVrIwdeKHR5GRQ_bTHuF7dA";

const clienteSupabase =
window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

// ======================
// LOGIN
// ======================

async function login(){

    const email =
        document.getElementById("loginEmail").value;

    const password =
        document.getElementById("loginPassword").value;

    const { error } =
        await clienteSupabase.auth.signInWithPassword({

            email,
            password

        });

    if(error){

        document.getElementById("errorLogin").innerText =
            error.message;

        return;
    }

    document.getElementById("pantallaLogin").style.display =
        "none";

  await cargarPerfil();

  await cargarDatos();
    mostrarSeccion("ingreso");

}

async function verificarSesion(){

    const { data } =
        await clienteSupabase.auth.getSession();

  if(data.session){

    document.getElementById("pantallaLogin").style.display =
        "none";

    await cargarPerfil();

    await cargarDatos();

    mostrarSeccion("ingreso");

}

}
async function cargarPerfil(){

    const { data: usuario } =
        await clienteSupabase.auth.getUser();

    if(!usuario.user){

        return;

    }

    const { data, error } =
        await clienteSupabase
        .from("perfiles")
        .select("*")
        .eq("id", usuario.user.id)
        .single();

    if(error){

        console.error(error);
        return;

    }

    usuarioActual = data;

    console.log("USUARIO:", usuarioActual);

    document.getElementById("usuarioLogueado").innerHTML =
    "👤 " +
    usuarioActual.nombre +
    " | " +
    usuarioActual.rol;
}

async function cerrarSesion(){

    await clienteSupabase.auth.signOut();

    location.reload();

}

// ======================
// CLIENTES
// ======================

async function guardarClienteSupabase(cliente){

    return await clienteSupabase
        .from("clientes")
        .insert([{

            nombre: cliente.nombre,
            telefono: cliente.telefono,
            direccion: cliente.direccion

        }])
        .select();

}

async function actualizarClienteSupabase(cliente){

    return await clienteSupabase
        .from("clientes")
        .update({

            nombre: cliente.nombre,
            telefono: cliente.telefono,
            direccion: cliente.direccion

        })
        .eq("id",cliente.id)
        .select();

}

async function cargarClientes(){

    const { data, error } =
        await clienteSupabase
        .from("clientes")
        .select("*")
        .order("nombre");

    if(error){

        console.error(error);
        return;

    }

    clientes = data;

}

// ======================
// REPARACIONES
// ======================

async function obtenerProximoNumeroOT(){

    const { data, error } =
        await clienteSupabase
        .from("reparaciones")
        .select("numero")
        .order("id",{ascending:false})
        .limit(1);

    if(error || data.length==0){

        return "OT-000001";

    }

    let ultimo =
        parseInt(
            data[0].numero.replace("OT-","")
        );

    return "OT-" +
        String(ultimo+1).padStart(6,"0");

}

async function actualizarReparacionSupabase(orden){

    return await clienteSupabase
        .from("reparaciones")
        .update({

            estado: orden.estado,
            tecnico: orden.tecnico,

            valor_reparacion:
                orden.valorReparacion,

            gastos:
                orden.gastos,

            transporte:
                orden.transporte,

            valor_transporte:
                orden.valorTransporte,

            fecha_entrega:
                orden.fechaEntrega

        })
        .eq("numero",orden.numero)
        .select();

}
