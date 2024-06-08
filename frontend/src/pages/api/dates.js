const ServiceLink = 'http://backend-dates-service:8000/';

export default async function handler(req, res) {
      
    if(req.method === 'GET'){
        try {
            let preRes = await fetch(ServiceLink, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            //let token = preRes.headers.get('set-cookie')
            
            //set a cookie with the token
            //await res.setHeader('Set-Cookie', token);
            const data = await preRes.json()
            res.status(preRes.status).json(data);
            //console.log(preRes)
            //console.log(data)
        } catch (err) {
            console.error(err);
            res.status(500).json({ data: 'Error next api', err : JSON.stringify(err) });
        }
        
    }
    if(req.method === 'POST'){
        try {
            let preRes = await fetch(ServiceLink, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req.body)
            });
            
            const data = await preRes.json()
            res.status(preRes.status).json(data);
            //console.log(preRes)
            //console.log(data)
        } catch (err) {
            console.error(err);
            res.status(500).json({ data: 'Error next api', err : JSON.stringify(err) });
        }
        
    }
  }