export abstract class Observer {

    update(subject: any): void {
        console.log(subject);
    }
}