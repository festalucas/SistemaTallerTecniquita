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

probarConexion();
