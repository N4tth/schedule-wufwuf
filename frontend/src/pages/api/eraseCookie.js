import { NextResponse } from 'next/server';

export async function DELETE(request) {
  // Crear una respuesta vacía
  const response = NextResponse.next();

  // Establecer la cookie 'access-token' con una fecha de expiración en el pasado
  response.cookies.set('access-token', '', {
    maxAge: -1, // Expira inmediatamente
    path: '/', // Asegúrate de que el camino coincide con el camino original de la cookie
  });

  // Devolver la respuesta
  return response;
}