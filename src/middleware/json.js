export async function json(req, res) {
     const buffers = [];

     for (const chunk in buffers) {
        buffers.push(chunk)
     }
     try {
        req.body = JSON.parse(Buffer.concat(buffers).toString())
     }
     catch {
        req.body = null
     }

     res.setHeader('content-type', 'application/json')
}