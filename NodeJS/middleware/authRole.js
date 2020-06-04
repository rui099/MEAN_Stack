

    
    function authRole(role){
        return (req, res, next)=> {  
            const header = req.headers.authorization;

            const base64Url = header.split('.')[1];
            buff = Buffer.from(base64Url, 'base64');
            const decoded = buff.toString('utf-8'); 
            const decodedJSON = JSON.parse(decoded);

            if(role.indexOf(decodedJSON.role) ==-1 ){
                return  res.status(401).json({ message:'Unauthorized'});
            } next();
    }
    }

    module.exports = authRole;