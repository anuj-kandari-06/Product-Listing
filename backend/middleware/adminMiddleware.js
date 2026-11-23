import User from "../User.js";
const adminMiddleware = async (req, res, next) => {
    try{
        if(!req.session.userId){
            return res.status(401).json({message:"Please login first",
            });
        }
        const user = await User.findById(req.session.userId)
        .select("role");

        if(!user){
            return res.status(401).json({message:"User not found",
            });
        }
        if(user.role !== "admin"){
            return res.status(403).json({
                message:"Access denied. Admin only.",
            });
        }
        next();
    }catch(error){
        console.error("Admin middleware error:",error.message);
      return res.status(500).json({message:"Internal server error",
      });   
    }
};
export default adminMiddleware;