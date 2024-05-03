use crate::entities::{
    recruitment_process::{self, ActiveModel as ProcessActiveModel, Entity as ProcessEntity},
    organization::{self, Entity as OrganizationEntity, Column, Model as OrganizationModel},
    event::{self, Entity as EventEntity, Model as EventModel},
    user::{self, Entity as UserEntity, Model as UserModel},
};
use sea_orm::*;
use serde::Serialize;

pub struct ProcessHandler;

pub use recruitment_process::Model as ProcessResponse;
pub use recruitment_process::Model as ProcessData;

impl ProcessHandler {

    pub async fn create_process(
        db: &DbConn,
        data: ProcessData,
    ) -> Result<ProcessResponse, DbErr> {
        ProcessActiveModel {
            name: Set(data.name.clone()),
            email: Set(data.email.clone()),
            description: Set(data.description.clone()),
            ..Default::default()
        }
        .insert(db)
        .await
    }

    pub async fn delete_process(
        db: &DbConn,
        id: i32,
    ) -> Result<(), DbErr> {
        let process = recruitment_process::Entity::find_by_id(id)
            .one(db)
            .await?;
    
        if let Some(process) = process {
            process.delete(db).await?;
            Ok(())
        } else {
            Err(DbErr::Custom(format!("Process with ID {} not found", id)))
        }
    }
    
    pub async fn update_process(
        db: &DbConn,
        id: i32,
        data: ProcessData,
    ) -> Result<ProcessResponse, DbErr> {
        let process = recruitment_process::Entity::find_by_id(id)
            .one(db)
            .await?;

        recruitment_process::ActiveModel {
            id: Unchanged(process.unwrap().id),
            name: Set(data.name.clone()),
            email:Set(data.email.clone()),
            description: Set(data.description.clone()),
            ..Default::default()
        }
        .update(db)
        .await
    }
    
    pub async fn get_process_organizations(
        db: &DbConn,
        process_id: i32,
    ) -> Result<Vec<OrganizationModel>, DbErr> {
        let organizations = OrganizationEntity::find()
            .filter(Column::ProcessId.eq(process_id))
            .all(db)
            .await?;
    
        Ok(organizations)
    }
    
    pub async fn get_process_events(
        db: &DbConn,
        process_id: i32,
    ) -> Result<Vec<EventModel>, DbErr> {
        let events = EventEntity::find()
            .filter(Column::ProcessId.eq(process_id))
            .all(db)
            .await?;
    
        Ok(events)
    }
    
    
    pub async fn get_process_users(
        db: &DbConn,
        process_id: i32,
    ) -> Result<Vec<UserModel>, DbErr> {
        let users = UserEntity::find()
            .filter(Column::ProcessId.eq(process_id))
            .all(db)
            .await?;
    
        Ok(users)
    }
}
