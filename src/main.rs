use actix_web::{web, middleware, App, HttpServer};

#[derive(Debug, Clone)]
struct AppState {
    app_url: String,
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .wrap(middleware::Logger::default())
            .service(
                web::scope("/authentication")
            )
            .service(
                web::scope("/processes")
            )
            .service(
                web::scope("/organizations")
            )
            .service(
                web::scope("/events")
            )
            .service(
                web::scope("/messages")
            )
        })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}