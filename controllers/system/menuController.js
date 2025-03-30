module.exports = {
    index: async(req, res) => {
        try {
            return res.render('pages/menu', { 
                title: 'Menu'
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                code: 500,
                status: 'error',
                message: 'Internal Server Error'
            });
        }
    },
}