import cookie from 'cookie';

export default function handler (req, res) {
  res.setHeader('Set-Cookie', cookie.serialize('access-token', '', {
    maxAge: -1, // Elimina la cookie
    path: '/', // Asegúrate de que el camino coincide con el que se estableció originalmente
  }));

  res.statusCode = 200;
  res.json({ message: 'Cookie borrada' });
};