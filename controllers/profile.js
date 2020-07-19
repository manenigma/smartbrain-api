const handleProfileGet = (req, res, db) => {
	const { id } = req.params;
	// console.log('id: ', id);
	db.select('*').from('users').where({id})
	.then(user => {
		if (user.length) {
			res.json(user[0]);
		} else {
			res.status(400).json('Not found')
		}
	})
	.catch(err => res.status(400).json('Error Getting User'))
}

module.exports = {
	handleProfileGet
}