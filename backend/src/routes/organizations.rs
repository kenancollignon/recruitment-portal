use crate::{
    handlers::{OrganizationHandler, OrganizationData, OrganizationResponse},
    AppState,
    error::DbErr,
    entities::{
        organization::Model as OrganizationModel,
        event::Model as EventModel,
        user::Model as UserModel,
    },
};
use actix_web::{get, post, put, delete, Error, web::{Data, Json, Path, ServiceConfig}};

pub fn organizations_config(cfg: &mut ServiceConfig) {
    cfg.service(organization_create)
    .service(organization_delete)
    .service(organization_update)
    .service(organization_get_events);
}

#[post("")]
async fn organization_create(
    data: Data<AppState>,
    json: Json<OrganizationData>,
) -> Result<Json<OrganizationResponse>, DbErr> {
    let db_conn = &data.db_conn;
    let json = json.into_inner();
    let new_organization = OrganizationHandler::create_organization(&db_conn, json).await?;
    Ok(Json(new_organization))
}

#[delete("/{id}")]
async fn organization_delete(
    data: Data<AppState>,
    id: Path<i32>,
) -> Result<Json<()>, DbErr> {
    let db_conn = &data.db_conn;
    let id = id.into_inner();
    let old_organization = OrganizationHandler::delete_organization(&db_conn, id).await?;
    Ok(Json(old_organization))
}

#[put("/{id}")]
async fn organization_update(
    data: Data<AppState>,
    id: Path<i32>,
    json: Json<OrganizationData>
) -> Result<Json<OrganizationResponse>, DbErr> {
    let db_conn = &data.db_conn;
    let id = id.into_inner();
    let json = json.into_inner();
    let updated_organization = OrganizationHandler::update_organization(&db_conn, id, json).await?;
    Ok(Json(updated_organization))
}


#[get("/{id}")]
async fn organization_get_events(
    data: Data<AppState>,
    id: Path<i32>,
) -> Result<Json<Vec<EventModel>>, DbErr> {
    let db_conn = &data.db_conn;
    let id = id.into_inner();
    let requested_events = OrganizationHandler::get_organization_events(&db_conn, id).await?;
    Ok(Json(requested_events))
}

