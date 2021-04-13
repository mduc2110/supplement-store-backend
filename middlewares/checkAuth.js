const jwt = require("jsonwebtoken");

module.exports = {
    adminAuth: (req, res, next) => {
        const token = req.header('access-token');
        // next();
        // res.status(200).send(token);
        if(!token) return res.status(401).send("Unauthorized");
        // else next();
        try{
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = verified;
            if(verified.roles.roleName === 'ADMIN'){
                next();
            }else{
                return res.status(403).send("You don't have permission to access");
            }
        }catch(err){
            res.status(400).send("Invalid token");
        }
    },
    userAuth: (req, res, next) => {
        const token = req.header('access-token');
        if(!token) return res.status(403).send("Unauthorized");
        try{
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = verified;
            next();
            
        }catch(err){
            res.status(400).send("Invalid token");
        }
    },
    productRoles: (req, res, next) => {
        const token = req.header('access-token');
        if(!token) return res.status(403).send("Unauthorized");
        try{
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = verified;
            
            if(verified.roles.roleName == 'ADMIN'){
                next();
            }else if(verified.roles.roleName == 'MANAGER' && verified.roles.permissions.includes("PRODUCT_CRUD")){
                next();
            }else {
                return res.status(403).send("You don't have permission to access");
            }
            
        }catch(err){
            res.status(400).send("Invalid token");
        }
    },
    categoryRoles: (req, res, next) => {
        const token = req.header('access-token');
        if(!token) return res.status(403).send("Unauthorized");
        try{
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = verified;
            if(verified.roles.roleName == 'ADMIN'){
                next();
            }else if(verified.roles.roleName == 'MANAGER' && verified.roles.permission.includes("CATEGORY_CRUD")){
                next();
            }else {
                return res.status(403).send("You don't have permission to access");
            }
            
        }catch(err){
            res.status(400).send("Invalid token");
        }
    },
    orderRoles: (req, res, next) => {
        const token = req.header('access-token');
        if(!token) return res.status(403).send("Unauthorized");
        try{
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = verified;
            if(verified.roles.roleName == 'ADMIN'){
                next();
            }else if(verified.roles.roleName == 'MANAGER' && verified.roles.permission.includes("ORDER_CRUD")){
                next();
            }else {
                return res.status(403).send("You don't have permission to access");
            }
            
        }catch(err){
            res.status(400).send("Invalid token");
        }
    }
}