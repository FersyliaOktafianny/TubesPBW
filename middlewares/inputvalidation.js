const validateAddThread = (request, response, next) => {
	const threadtitle = request.body.threadtitle;
	const threadcategory = request.body.threadcategory;
	const threadcontent = request.body.threadcontent;
	const threadauthor = request.session.user_id;
	if (!threadtitle || !threadcategory || !threadcontent) {
		response.redirect("/");
		return;
	}
	next();
};

export { validateAddThread };
