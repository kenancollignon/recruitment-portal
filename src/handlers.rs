use actix_web::web::ServiceConfig;

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(web::resource("/routes"));
}

mod routes {

    use actix_web::{get, post, put, web::Path, HttpResponse};

    #[get("/authentication")]
    async fn logout() -> HttpResponse {
        todo!()
    }

    #[get("/authentication")]
    async fn login() -> HttpResponse {
        todo!()
    }

    #[get("/authentication")]
    async fn return() -> HttpResponse {
        todo!()
    }

    #[put("/processes")]
    async fn add_process() -> HttpResponse {
        todo!()
    }

    #[get("/processes")]
    async fn view_process() -> HttpResponse {
        todo!()
    }

    #[get("/processes")]
    async fn add_organization() -> HttpResponse {
        todo!()
    }

    #[get("/processes")]
    async fn remove_organization() -> HttpResponse {
        todo!()
    }

    #[get("/processes")]
    async fn view_messages() -> HttpResponse {
        todo!()
    }

    #[get("/processes")]
    async fn send_message() -> HttpResponse {
        todo!()
    }

    #[get("/processes")]
    async fn search_user() -> HttpResponse {
        todo!()
    }

    #[get("/processes")]
    async fn create_event() -> HttpResponse {
        todo!()
    }

    #[get("/processes")]
    async fn delete_event() -> HttpResponse {
        todo!()
    }

    #[get("/processes")]
    async fn edit_event() -> HttpResponse {
        todo!()
    }

    #[get("/processes")]
    async fn add_note_to_event() -> HttpResponse {
        todo!()
    }

    #[get("/organizations")]
    async fn add_organization() -> HttpResponse {
        todo!()
    }

    #[get("/organizations")]
    async fn view_organizations() -> HttpResponse {
        todo!()
    }

    #[get("/organizations")]
    async fn add_member() -> HttpResponse {
        todo!()
    }

    #[get("/organizations")]
    async fn remove_member() -> HttpResponse {
        todo!()
    }

    #[get("/organizations")]
    async fn update_member_status() -> HttpResponse {
        todo!()
    }




