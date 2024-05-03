use crate::entities::{
    message_chain::{self, ActiveModel as MessageChainActiveModel, Entity as MessageChainEntity, Model as MessageChainModel},
    message::{self, Entity as MessageEntity},
};
use sea_orm::*;
use serde::Serialize;

pub struct MessageChainHandler;

pub use message_chain::Model as MessageChainResponse;
pub use message_chain::Model as MessageChainData;

impl MessageChainHandler {
    pub async fn create_message_chain(
        db: &DbConn,
        data: MessageChainData,
    ) -> Result<MessageChainResponse, DbErr> {
        let new_chain = MessageChainActiveModel {
            subject: Set(data.subject.clone()),
            last_message: Set(data.last_message),
            ..Default::default()
        }
        .insert(db)
        .await?;

        Ok(new_chain)
    }

    pub async fn update_message_chain(
        db: &DbConn,
        id: i32,
        data: MessageChainData,
    ) -> Result<MessageChainResponse, DbErr> {
        let chain = MessageChainEntity::find_by_id(id)
            .one(db)
            .await?;
    
        if let Some(chain) = chain {
            let updated_chain = MessageChainActiveModel {
                id: Unchanged(chain.id),
                subject: Set(data.subject.clone()),
                last_message: Set(data.last_message),
                ..chain.into()
            }
            .update(db)
            .await?;
    
            Ok(updated_chain)
        } else {
            Err(DbErr::Custom(format!("Message chain with ID {} not found", id)))
        }
    }
    

    pub async fn get_message_chain(
        db: &DbConn,
        id: i32,
    ) -> Result<Option<MessageChainModel>, DbErr> {
        let chain = MessageChainEntity::find_by_id(id)
            .one(db)
            .await?;

        Ok(chain)
    }

    pub async fn add_message_to_chain(
        db: &DbConn,
        chain_id: i32,
        message_data: message::Model,
    ) -> Result<(), DbErr> {
        let message = message_data.clone().insert(db).await?;

        let chain_message = message_chain::Entity::insert(db)
            .values(vec![
                message_chain::ActiveModel {
                    chain_id: Set(chain_id),
                    message_id: Set(message.id),
                    ..Default::default()
                }
            ])
            .exec()
            .await?;

        Ok(chain_message)
    }
}
