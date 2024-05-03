use crate::{
    handlers::{ProcessHandler, ProcessData, ProcessResponse},
    AppState,
    error::DbErr,
    entities::{
        organization::Model as OrganizationModel,
        event::Model as EventModel,
        user::Model as UserModel,
    },
};
use actix_web::{get, post, put, delete, web::{Data, Json, Path, ServiceConfig}};

pub fn processes_config(cfg: &mut ServiceConfig) {
    cfg.service(process_create)
    .service(process_delete)
    .service(process_update)
    .service(process_get_organizations)
    .service(process_get_events)
    .service(process_get_users);
}

#[post("/create")]
async fn process_create(
    data: Data<AppState>,
    json: Json<ProcessData>,
) -> Result<Json<ProcessResponse>, DbErr> {
    let db_conn = &data.db_conn;
    let json = json.into_inner();
    let new_process = ProcessHandler::create_process(&db_conn, json).await?;
    Ok(Json(new_process))
}

#[delete("/{id}/delete")]
async fn process_delete(
    data: Data<AppState>,
    id: Path<i32>,
) -> Result<Json<()>, DbErr> {
    let db_conn = &data.db_conn;
    let id = id.into_inner();
    let old_process = ProcessHandler::delete_process(&db_conn, id).await?;
    Ok(Json(old_process))
}

#[put("/{id}/update")]
async fn process_update(
    data: Data<AppState>,
    id: Path<i32>,
    json: Json<ProcessData>
) -> Result<Json<ProcessResponse>, DbErr> {
    let db_conn = &data.db_conn;
    let id = id.into_inner();
    let json = json.into_inner();
    let updated_process = ProcessHandler::update_process(&db_conn, id, json).await?;
    Ok(Json(updated_process))
}

#[get("/{id}/organizations")]
async fn process_get_organizations(
    data: Data<AppState>,
    id: Path<i32>,
) -> Result<Json<Vec<OrganizationModel>>, DbErr> {
    let db_conn = &data.db_conn;
    let id = id.into_inner();
    let requested_organizations = ProcessHandler::get_process_organizations(&db_conn, id).await?;
    Ok(Json(requested_organizations))
}

#[get("/{id}/events")]
async fn process_get_events(
    data: Data<AppState>,
    id: Path<i32>,
) -> Result<Json<Vec<EventModel>>, DbErr> {
    let db_conn = &data.db_conn;
    let id = id.into_inner();
    let requested_events = ProcessHandler::get_process_events(&db_conn, id).await?;
    Ok(Json(requested_events))
}

#[get("/{id}/users")]
async fn process_get_users(
    data: Data<AppState>,
    id: Path<i32>,
) -> Result<Json<Vec<UserModel>>, DbErr> {
    let db_conn = &data.db_conn;
    let id = id.into_inner();
    let requested_users = ProcessHandler::get_process_users(&db_conn, id).await?;
    Ok(Json(requested_users))
}






