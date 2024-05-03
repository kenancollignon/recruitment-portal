use crate::{handlers::{MessageChainHandler, MessageChainData, MessageChainResponse}, AppState};
use actix_web::{get, post, put, Error, web::{Data, Json, Path, ServiceConfig}};

pub fn message_chains_config(cfg: &mut ServiceConfig) {
    cfg.service(message_chain_create)
    .service(message_chain_update)
    .service(message_chain_get)
    .service(message_chain_add_message);
}

#[post("")]
async fn message_chain_create(
    data: Data<AppState>,
    json: Json<MessageChainData>,
) -> Result<Json<MessageChainResponse>, Error> {
    let db_conn = &data.db_conn;
    let json = json.into_inner();
    let new_message_chain = MessageChainHandler::create_message_chain(&db_conn, json).await?;
    Ok(Json(new_message_chain))
}

#[put("/{id}")]
async fn message_chain_update(
    data: Data<AppState>,
    id: Path<i32>,
    json: Json<MessageChainData>,
) -> Result<Json<MessageChainResponse>, Error> {
    let db_conn = &data.db_conn;
    let id = id.into_inner();
    let json = json.into_inner();
    let updated_message_chain = MessageChainHandler::update_message_chain(&db_conn, id, json).await?;
    Ok(Json(updated_message_chain))
}

#[get("/{id}")]
async fn message_chain_get(
    data: Data<AppState>,
    id: Path<i32>,
) -> Result<Json<Vec<i32>>, Error> {
    let db_conn = &data.db_conn;
    let id = id.into_inner();
    let requested_message_chain = MessageChainHandler::get_message_chain(&db_conn, id).await?;
    Ok(Json(requested_message_chain))
}


#[post("/{id}")]
async fn message_chain_add_message(
    data: Data<AppState>,
    id: Path<i32>,
    json: Json<MessageChainData>,
) -> Result<Json<Vec<i32>>, Error> {
    let db_conn = &data.db_conn;
    let id = id.into_inner();
    let json = json.into_inner();
    let new_message = MessageChainHandler::add_new_message(&db_conn, id, json).await?;
    Ok(Json(new_message))
}