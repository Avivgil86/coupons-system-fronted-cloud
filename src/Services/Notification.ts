import { Notyf } from "notyf";

class Notify {
    private notification = new Notyf({
        duration: 3000,
        position: {
            x: "right", y: "top"
        }
    })
    public success(message: string) {
        this.notification.success(message);
    }
    public error(err: string) {
        this.notification.error(this.extractMsg(err));
    }
    private extractMsg(err: any): string {
        if (typeof err === "string") {

            return err
        }
        if (typeof err?.response?.data?.message === "string") {

            return err.response.data.message;
        }
        if (typeof err?.response?.data === "string") {

            return err.response;
        }
        if (Array.isArray(err?.response.data)) {

            return err?.response?.data[0];
        }
        if (typeof err?.message === "string") {

            return err.message;
        }
        return "Error occurrd - please try again";
    }
}

const notify = new Notify();
export default notify;