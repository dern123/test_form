const CounterSchemaModel = require("../../models/CounterSchema");
const ObjectId = require("mongoose").Types.ObjectId;

exports.post = async(req, res) => {
    try{
        const {model, count, field } = req.body;
        CounterSchemaModel.findByIdAndUpdate({_id: 'model'}, {$inc: { count: 1} }, function(error, counter)   {
            if(error)
                return next(error);
            doc.testvalue = counter.seq;
            next();
        });
    }
    catch(e){
      console.log("error", e);
      return handler.negativeResponse(res, { message: "Error!" });
    }
};

exports.get = async(req, res) => {
    try{

    }   
    catch(e){
        console.log("error", e);
        return handler.negativeResponse(res, "Error!");
    }
};
