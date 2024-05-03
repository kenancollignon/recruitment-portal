use crate::entities::{
    recruitment_process::{self, ActiveModel as ProcessActiveModel, Entity as ProcessEntity},
    organization::{self, Entity as OrganizationEntity, Column, Model as OrganizationModel},
    event::{self, Entity as EventEntity, Model as EventModel},
    user::{self, Entity as UserEntity, ActiveModel as UserActiveModel},
};
use sea_orm::*;
use serde::Serialize;

pub struct UserHandler;

pub use user::Model as UserResponse;
pub use user::Model as UserData;

impl UserHandler {

    pub async fn create_user(
        db: &DbConn,
        data: UserData,
    ) -> Result<UserResponse, DbErr> {
        UserActiveModel {
            net_id: Set(data.net_id.clone()),
            name: Set(data.name.clone()),
            email: Set(data.email.clone()),
            organizations: Set(data.organizations),
            processes: Set(data.processes),
            statuses: Set(data.statuses),
            ..Default::default()
        }
        .insert(db)
        .await
    }

    pub async fn delete_user(
        db: &DbConn,
        net_id: &str,
    ) -> Result<(), DbErr> {
        let user = UserEntity::find_by_id(net_id)
            .one(db)
            .await?;
    
        if let Some(user) = user {
            user.delete(db).await?;
            Ok(())
        } else {
            Err(DbErr::Custom(format!("User with ID {} not found", net_id)))
        }
    }
    
    pub async fn update_user(
        db: &DbConn,
        net_id: &str,
        data: UserData,
    ) -> Result<UserResponse, DbErr> {
        let user = UserEntity::find_by_id(net_id)
            .one(db)
            .await?;

        user::ActiveModel {
            net_id: Unchanged(data.net_id.clone()),
            name: Set(data.name.clone()),
            email: Set(data.email.clone()),
            organizations: Set(data.organizations),
            processes: Set(data.processes),
            statuses: Set(data.statuses),
            ..Default::default()
        }
        .update(db)
        .await
    }
    
    pub async fn get_user_processes(
        db: &DbConn,
        net_id: &str,
    ) -> Result<Vec<ProcessEntity>, DbErr> {
        let processes = ProcessEntity::find()
            .filter(Column::Id.eq(user.processes))
            .all(db)
            .await?;
            Ok(processes)
    }
    
    pub async fn get_user_organizations(
        db: &DbConn,
        net_id: &str,
    ) -> Result<Vec<OrganizationModel>, DbErr> {
        let user = UserEntity::find_by_id(net_id)
            .one(db)
            .await?;
        
        if let Some(user) = user {
            let organizations = OrganizationEntity::find()
                .filter(Column::Id.eq(user.organizations))
                .all(db)
                .await?;
            Ok(organizations)
        } else {
            Err(DbErr::Custom(format!("User with ID {} not found", net_id)))
        }
    }
    
}
