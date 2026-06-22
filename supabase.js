const SUPABASE_URL =
"https://jvizawmhqlwnonsdztfz.supabase.co";

const SUPABASE_KEY =
"PEGA_AQUI_TU_ANON_KEY";

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

probarConexion();
