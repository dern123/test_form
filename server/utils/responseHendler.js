module.exports = {
    positiveResponse: async (res, data, req) => {
        res.status(200).json({ status: true, data});
    },
    positiveResponseFile: async (res, filePath, fileName, req) => {
        res.status(200).download({ status: true, data});
    },
    negativeResponse: async(res, message, code) => {
        res.status(500).json({status: false, message, code})
    },
    errorMessage: async (res, error) => {
        res.status(200).json({ status: false, data: { message: error } });
    }
}