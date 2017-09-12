export class HomeController {
    index(req: any, res: any, next: any) {
        res.render('index', { title: 'Express' });
    }
}