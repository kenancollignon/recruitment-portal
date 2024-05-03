use actix_web::{http, web, App, HttpServer};
use sea_orm::{Database, DatabaseConnection};

mod entities;
mod handlers;
mod routes;

use routes::*;

#[derive(Debug, Clone)]
struct AppState {
    db_conn: DatabaseConnection,
    base_url: String,
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenvy::dotenv().ok();
    let db_url = std::env::var("DATABASE_URL").expect("'DATABASE_URL' should be set in .env file'");
    let host = std::env::var("HOST").expect("'HOST' should be set in .env file");
    let port = std::env::var("PORT").expect("'PORT' should be set in .env file");
    let base_url = format!("{}:{}", host, port);

    // set up database connection
    let db_conn = Database::connect(&db_url)
        .await
        .expect("unable to connect to database");

    // create app state
    let state = AppState { db_conn, base_url };

    HttpServer::new(move || {
        App::new()
            .service(
                web::scope("/api")
                    .service(
                        web::scope("/cas")
                            .app_data(web::Data::new(state.clone()))
                            .configure(cas_config),
                    )
                    .service(
                        web::scope("/events")
                            .app_data(web::Data::new(state.clone()))
                            .configure(events_config),
                    )
                    .service(
                        web::scope("/messagechains")
                            .app_data(web::Data::new(state.clone()))
                            .configure(message_chains_config),
                    )
                    .service(
                        web::scope("/organizations")
                            .app_data(web::Data::new(state.clone()))
                            .configure(organizations_config),
                    )
                    .service(
                        web::scope("/processes")
                            .app_data(web::Data::new(state.clone()))
                            .configure(processes_config),
                    )
                    .service(
                        web::scope("/users")
                            .app_data(web::Data::new(state.clone()))
                            .configure(users_config),
                    ),
            )
    })
    .bind(("127.0.0.1", 8000))?
    .run()
    .await
}