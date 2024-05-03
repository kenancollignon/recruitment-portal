//! `SeaORM` Entity. Generated by sea-orm-codegen 0.12.15

use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Eq, Serialize, Deserialize)]
#[sea_orm(table_name = "user_processes")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub process_id: i32,
    #[sea_orm(primary_key)]
    pub user_net_id: String,
    pub status_id: Option<i32>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(
        belongs_to = "super::recruitment_process::Entity",
        from = "Column::ProcessId",
        to = "super::recruitment_process::Column::Id",
        on_update = "NoAction",
        on_delete = "NoAction"
    )]
    RecruitmentProcess,
    #[sea_orm(
        belongs_to = "super::user::Entity",
        from = "Column::UserNetId",
        to = "super::user::Column::NetId",
        on_update = "NoAction",
        on_delete = "NoAction"
    )]
    User,
    #[sea_orm(
        belongs_to = "super::user_statuses::Entity",
        from = "Column::StatusId",
        to = "super::user_statuses::Column::StatusCode",
        on_update = "NoAction",
        on_delete = "NoAction"
    )]
    UserStatuses,
}

impl Related<super::recruitment_process::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::RecruitmentProcess.def()
    }
}

impl Related<super::user::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::User.def()
    }
}

impl Related<super::user_statuses::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::UserStatuses.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}