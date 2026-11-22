//! Tareas en segundo plano: publicación del outbox, alertas de vencimiento y reportes.

use tracing_subscriber::EnvFilter;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    dotenvy::dotenv().ok();
    tracing_subscriber::fmt()
        .with_env_filter(EnvFilter::try_from_default_env().unwrap_or_else(|_| EnvFilter::new("info")))
        .init();

    tracing::info!("worker iniciado");
    tokio::signal::ctrl_c().await?;
    tracing::info!("worker detenido");
    Ok(())
}
