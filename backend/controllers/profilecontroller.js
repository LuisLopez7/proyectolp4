const Profile = require('../models/profile');
const User = require('../models/user');

exports.getProfile = async (req, res) => {
    try {
        // Encuentra el perfil del usuario
        let profile = await Profile.findOne({ userId: req.user.id })
            .populate('userId', 'username firstName lastName');

        // Si no se encuentra el perfil, créalo
        if (!profile) {
            // Encuentra los datos del usuario
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            // Crea un nuevo perfil
            profile = new Profile({
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                userId: user._id,
                profilePicture: 'default-profile-picture.jpg'
            });

            
            await profile.save();
        }

        res.json(profile);
    } catch (err) {
        console.error('Error al obtener el perfil:', err);
        res.status(500).json({ message: 'Error del servidor', error: err });
    }
};
