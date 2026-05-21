class SessionCrontroller {
    store(req, res){
        return res.json({ message: 'Minha API'});
    }

}

export default new SessionCrontroller;