import User from '../models/User.js';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class SessionController {
    async store(req, res){

        const { email } = req.body;
        const normalizedEmail = typeof email === 'string' ? email.trim() : '';

        if (!normalizedEmail) {
            return res.status(400).json({ error: 'Email is required' });
        }

        if (!emailRegex.test(normalizedEmail)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        let user = await User.findOne({ email: normalizedEmail });

        if (!user) {
            user = await User.create({ email: normalizedEmail });
            return res.json(user);
        }

        return res.json({
            message: 'User already exists',
            user,
        });
    }

}

export default new SessionController;
