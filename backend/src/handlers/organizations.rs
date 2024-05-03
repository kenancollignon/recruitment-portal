use crate::entities::{
    organization::{self, ActiveModel as OrganizationActiveModel, Entity as OrganizationEntity},
    event::{self, Entity as EventEntity, Model as EventModel, Column},
    user::{self, Model as UserModel},
    user_organizations::{Entity as UserOrganizationEntity, Model as UserOrganization}
};
use sea_orm::*;
use serde::Serialize;

pub struct OrganizationHandler;

pub use organization::Model as OrganizationResponse;
pub use organization::Model as OrganizationData;

impl OrganizationHandler {

    pub async fn create_organization(
        db: &DbConn,
        data: OrganizationData,
    ) -> Result<OrganizationResponse, DbErr> {
        OrganizationActiveModel {
            name: Set(data.name.clone()),
            email: Set(data.email.clone()),
            process_id: Set(data.process_id),
            ..Default::default()
        }
        .insert(db)
        .await
    }

    pub async fn delete_organization(
        db: &DbConn,
        id: i32,
    ) -> Result<(), DbErr> {
        let organization = OrganizationEntity::find_by_id(id)
            .one(db)
            .await?;
    
        if let Some(organization) = organization {
            organization.delete(db).await?;
            Ok(())
        } else {
            Err(DbErr::Custom(format!("Organization with ID {} not found", id)))
        }
    }

    pub async fn update_organization(
        db: &DbConn,
        id: i32,
        data: OrganizationData,
    ) -> Result<OrganizationResponse, DbErr> {
        let organization = OrganizationEntity::find_by_id(id)
            .one(db)
            .await?;

        OrganizationActiveModel {
            id: Unchanged(organization.unwrap().id),
            name: Set(data.name.clone()),
            email: Set(data.email.clone()),
            process_id: Set(data.process_id),
            ..Default::default()
        }
        .update(db)
        .await
    }

    pub async fn get_organization_events(
        db: &DbConn,
        organization_id: i32,
    ) -> Result<Vec<EventModel>, DbErr> {
        let events = EventEntity::find()
            .filter(event::Column::OrganizationId.eq(organization_id))
            .all(db)
            .await?;
    
        Ok(events)
    }
}
