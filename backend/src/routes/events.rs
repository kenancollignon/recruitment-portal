use crate::{handlers::{EventHandler, EventData, EventResponse}, AppState, error::DbErr, entities::{user::Model as UserModel}};
use actix_web::{get, post, put, delete, web::{Data, Json, Path, ServiceConfig}};

pub fn events_config(cfg: &mut ServiceConfig) {
    cfg.service(event_create)
    .service(event_delete)
    .service(event_update)
    .service(event_get)
    .service(event_get_attendees);
}

#[post("")]
async fn event_create(
    data: Data<AppState>,
    json: Json<EventData>,
) -> Result<Json<EventResponse>, DbErr> {
    let db_conn = &data.db_conn;
    let json = json.into_inner();
    let new_event = EventHandler::create_event(&db_conn, json).await?;
    Ok(Json(new_event))
}

#[delete("/{id}")]
async fn event_delete(
    data: Data<AppState>,
    id: Path<i32>,
) -> Result<Json<()>, DbErr> {
    let db_conn = &data.db_conn;
    let id = id.into_inner();
    let old_event = EventHandler::delete_event(&db_conn, id).await?;
    Ok(Json(old_event))
}

#[put("/{id}")]
async fn event_update(
    data: Data<AppState>,
    id: Path<i32>,
    json: Json<EventData>,
) -> Result<Json<EventResponse>, DbErr> {
    let db_conn = &data.db_conn;
    let id = id.into_inner();
    let json = json.into_inner();
    let updated_event = EventHandler::update_event(&db_conn, id, json).await?;
    Ok(Json(updated_event))
}

#[get("/{id}")]
async fn event_get(
    data: Data<AppState>,
    id: Path<i32>,
) -> Result<Json<EventResponse>, DbErr> {
    let db_conn = &data.db_conn;
    let id = id.into_inner();
    let requested_event = EventHandler::get_event_details(&db_conn, id).await?;
    Ok(Json(requested_event.expect("REASON")))
}


#[get("/{id}")]
async fn event_get_attendees(
    data: Data<AppState>,
    id: Path<i32>,
) -> Result<Json<Vec<UserModel>>, DbErr> {
    let db_conn = &data.db_conn;
    let id = id.into_inner();
    let requested_attendees = EventHandler::get_event_attendees(&db_conn, id).await?;
    Ok(Json(requested_attendees))
}