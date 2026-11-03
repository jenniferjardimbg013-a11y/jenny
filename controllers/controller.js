export default class GeralController {

    constructor() {

        this.home = async (req, res) => {
            res.render('index')
        };
    }
}