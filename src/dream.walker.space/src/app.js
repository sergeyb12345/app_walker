export class App {

    configureRouter(config, router) {
        config.title = 'Dream Space';
        config.options.pushState = true;

        this.router = router;

        config.map([
            { route: ["strategies"], moduleId: "strategies/navigation", name:"strategies", title: "Strategies", nav:true },
            { route: '', redirect: 'strategies' }

        ]);
    }
}