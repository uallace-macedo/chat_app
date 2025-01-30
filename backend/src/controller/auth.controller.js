import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';

const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error('> ERRO [auth.controller.js]: CheckAuth_controller = ' + error.message);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
}

const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if(!fullName || !email || !password) return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    if(password.length < 8) return res.status(400).json({ message: 'A senha precisa conter pelo menos 8 caracteres.' });

    const user = await User.findOne({ email });
    if(user) return res.status(400).json({ message: 'Email já cadastrado!' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword
    });

    if(newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({ message: 'Usuário criado com sucesso!', data: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic
      } })
    } else {
      res.status(400).json({ message: 'Dados de usuário inválidos!' });
    }
  } catch (error) {
    console.error('> ERRO [auth.controller.js]: Signup_controller = ' + error.message);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if(!email || !password) return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });

    const user = await User.findOne({ email });
    const correctPassword = await bcrypt.compare(password, (user ? user.password : ''));
    if(!user || !correctPassword) return res.status(400).json({ message: 'Credenciais inválidas!' });

    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic
    })

  } catch (error) {
    console.error('> ERRO [auth.controller.js]: Login_controller = ' + error.message);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
}

const logout = (req, res) => {
  try {
    res.clearCookie('jwt');
    res.status(200).json({ message: 'Logout efetuado com sucesso!' });
  } catch (error) {
    console.error('> ERRO: Logout_controller = ' + error.message);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
}

const updateProfile = async (req, res) => {
  try {
    const {profilePic} = req.body;
    const userId = req.user._id;

    if(!profilePic) return res.status(400).json({ message: 'Imagem de perfil não fornecida!' });
    const uploadReponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadReponse.secure_url }, { new: true })
    
    res.status(200).json(updatedUser);

  } catch (error) {
    console.error('> ERRO [auth.controller.js]: UpdateProfile_controller = ' + error.message);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
}

const AuthController = {
  checkAuth: (req, res) => checkAuth(req, res),
  signup: (req, res) => signup(req, res),
  login: (req, res) => login(req, res),
  logout: (req, res) => logout(req, res),
  updateProfile: (req, res) => updateProfile(req, res)
};

export default AuthController;