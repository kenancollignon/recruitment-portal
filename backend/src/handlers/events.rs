use crate::entities::{
    event::{self, ActiveModel as EventActiveModel, Entity as EventEntity, Column, Model as EventModel},
    user::{self, Entity as UserEntity, Model as UserModel},
    event_invitee::{self, Entity as EventInviteeEntity, Model as InviteeModel}
};
use sea_orm::*;
use serde::Serialize;

pub struct EventHandler;

pub use event::Model as EventResponse;
pub use event::Model as EventData;

impl EventHandler {

    pub async fn create_event(
        db: &DbConn,
        data: EventData,
    ) -> Result<EventResponse, DbErr> {
        EventActiveModel {
            location: Set(data.location.clone()),
            time: Set(data.time.clone()),
            duration: Set(data.duration.clone()),
            description: Set(data.description.clone()),
            ..Default::default()
        }
        .insert(db)
        .await
    }

    pub async fn delete_event(
        db: &DbConn,
        id: i32,
    ) -> Result<(), DbErr> {
        let event = EventEntity::find_by_id(id)
            .one(db)
            .await?;
    
        if let Some(event) = event {
            event.delete(db).await?;
            Ok(())
        } else {
            Err(DbErr::Custom(format!("Event with ID {} not found", id)))
        }
    }
    
    pub async fn update_event(
        db: &DbConn,
        id: i32,
        data: EventData,
    ) -> Result<EventResponse, DbErr> {
        let event = EventEntity::find_by_id(id)
            .one(db)
            .await?;

        event::ActiveModel {
            id: Unchanged(event.unwrap().id),
            location: Set(data.location.clone()),
            time: Set(data.time.clone()),
            duration: Set(data.duration.clone()),
            description: Set(data.description.clone()),
            ..Default::default()
        }
        .update(db)
        .await
    }
    
    pub async fn get_event_attendees(
        db: &DbConn,
        event_id: i32,
    ) -> Result<Vec<InviteeModel>, DbErr> {
        let invitees = EventInviteeEntity::find()
            .filter(event_invitee::Column::EventId.eq(event_id))
            .all(db)
            .await?;
    
        Ok(invitees)
    }

    
    pub async fn get_event_details(
        db: &DbConn,
        id: i32,
    ) -> Result<Option<EventModel>, DbErr> {
        let event = EventEntity::find_by_id(id)
            .one(db)
            .await?;
        Ok(event)
    }
}
