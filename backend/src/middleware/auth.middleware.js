import 'dotenv/config';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if(!token) return res.status(401).json({ message: 'Não autorizado - Nenhum token foi fornecido.' });

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    if(!decoded) return res.status(401).json({ message: 'Não autorizado - Token inválido!' });

    const user = await User.findById(decoded.userId).select('-password');
    if(!user) return res.status(404).json({ message: 'Usuário não encontrado.' });
    
    req.user = user;
    next();
  } catch (error) {
    console.error('ERRO: auth.middleware.js = ' + error.message);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}

export default protectRoute;