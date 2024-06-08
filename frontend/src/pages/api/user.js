const ServiceLink = 'http://servicio-api-gateway-service/service-users/api/users/get/user';

export default async function handler(req, res) {

    if (req.method === 'GET') {
        try {
            // Extraer la primera cookie de la solicitud entrante
            const cookies = req.headers.cookie;
            const firstCookie = cookies ? cookies.split(';')[0].trim() : '';

            let preRes = await fetch(ServiceLink, {
                method: 'GET',
                headers: {
                    'accept':'application/json',
                    'Content-Type': 'application/json',
                    'access-token': firstCookie
                },
            });
            const data = await preRes.json()
            res.status(preRes.status).json(data);
        } catch (err) {
            console.error(err);
            res.status(500).json({ data: 'Error next api', err: JSON.stringify(err) });
        }

    }
}