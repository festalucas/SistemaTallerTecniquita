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

