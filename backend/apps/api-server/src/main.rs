//! Binario principal: arma todos los módulos y expone la API con Axum.

use axum::{Router, extract::State, http::StatusCode, routing::get};
use sqlx::postgres::PgPoolOptions;
use tower_http::{compression::CompressionLayer, trace::TraceLayer};
use tracing_subscriber::EnvFilter;

#[derive(Clone)]
struct AppState {
    db: sqlx::PgPool,
    #[allow(dead_code)] // se usará para caché, sesiones y colas
    redis: redis::Client,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    dotenvy::dotenv().ok();
    tracing_subscriber::fmt()
        .with_env_filter(EnvFilter::try_from_default_env().unwrap_or_else(|_| EnvFilter::new("info")))
        .init();

    let database_url = std::env::var("DATABASE_URL")?;
    let redis_url = std::env::var("REDIS_URL")?;
    let bind_addr = std::env::var("BIND_ADDR").unwrap_or_else(|_| "0.0.0.0:8080".into());

    let db = PgPoolOptions::new().max_connections(10).connect(&database_url).await?;
    let redis = redis::Client::open(redis_url)?;
    let state = AppState { db, redis };

    let app = Router::new()
        .route("/health", get(health))
        .layer(CompressionLayer::new())
        .layer(TraceLayer::new_for_http())
        .with_state(state);

    let listener = tokio::net::TcpListener::bind(&bind_addr).await?;
    tracing::info!("api-server escuchando en {bind_addr}");
    axum::serve(listener, app)
        .with_graceful_shutdown(async {
            tokio::signal::ctrl_c().await.ok();
        })
        .await?;
    Ok(())
}

async fn health(State(state): State<AppState>) -> StatusCode {
    match sqlx::query("SELECT 1").execute(&state.db).await {
        Ok(_) => StatusCode::OK,
        Err(_) => StatusCode::SERVICE_UNAVAILABLE,
    }
}
