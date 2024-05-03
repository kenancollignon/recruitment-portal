use crate::{handlers::{UserHandler, UserData, UserResponse}, AppState, error::DbErr};
use actix_web::{get, post, put, delete, Error, web::{Data, Json, Path, ServiceConfig}};

pub fn users_config(cfg: &mut ServiceConfig) {
    cfg.service(user_create)
    .service(user_delete)
    .service(user_update)
    .service(user_get_processes)
    .service(user_get_organizations);
}

#[post("")]
async fn user_create(
    data: Data<AppState>,
    json: Json<UserData>,
) -> Result<Json<UserResponse>, DbErr> {
    let db_conn = &data.db_conn;
    let json = json.into_inner();
    let new_user = UserHandler::create_user(&db_conn, json).await?;
    Ok(Json(new_user))
}

#[delete("/{id}")]
async fn user_delete(
    data: Data<AppState>,
    id: Path<String>,
) -> Result<Json<UserResponse>, DbErr> {
    let db_conn = &data.db_conn;
    let id = id.into_inner();
    let old_user = UserHandler::delete_user(&db_conn, id).await?;
    Ok(Json(old_user))
}

#[put("/{id}")]
async fn user_update(
    data: Data<AppState>,
    id: Path<String>,
) -> Result<Json<UserResponse>, DbErr> {
    let db_conn = &data.db_conn;
    let id = id.into_inner();
    let updated_user = UserHandler::create_user(&db_conn, id).await?;
    Ok(Json(updated_user))
}

#[get("/{id}")]
async fn user_get_processes(
    data: Data<AppState>,
    id: Path<String>,
) -> Result<Json<UserResponse>, DbErr> {
    let db_conn = &data.db_conn;
    let id = id.into_inner();
    let requested_processes = UserHandler::get_user_processes(&db_conn, id).await?;
    Ok(Json(requested_processes))
}

#[get("/{id}")]
async fn user_get_organizations(
    data: Data<AppState>,
    id: Path<String>,
) -> Result<Json<Vec<UserResponse>>, DbErr> {
    let db_conn = &data.db_conn;
    let id = id.into_inner();
    let requested_organizations = UserHandler::get_user_organizations(&db_conn, id).await?;
    Ok(Json(requested_organizations))
}


