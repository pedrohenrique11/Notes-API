export async function json(req, res) {
   const buffers = [];
 
   req.on('data', (chunk) => {
     buffers.push(chunk);
   });
 
   await new Promise((resolve, reject) => {
     req.on('end', resolve);
     req.on('error', (error) => reject(error));
   });
 
   try {
     req.body = JSON.parse(Buffer.concat(buffers).toString());
   } catch (error) {
     req.body = null;
   }
 
   res.setHeader('content-type', 'application/json');
 }