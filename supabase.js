const SUPABASE_URL =
"https://jvizawmhqlwnonsdztfz.supabase.co";

const SUPABASE_KEY =
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2aXphd21ocWx3bm9uc2R6dGZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2NTk2OTQsImV4cCI6MjA5NjIzNTY5NH0.qAJ4W0mKmOvFMEJxNm6zG4dD2MnuToOXm2QJFKUaTQs;

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
