const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs: Record<any, any>[]) => {
	if (blogs.length === 0 || !blogs) {
		return 0
	}
	const sum = blogs.reduce((sum, val) => sum + val.likes, 0)
	return sum
}

const favoriteBlog = (blogs: Record<any, any>[]) => {
	if (blogs.length === 0 || !blogs) {
		return null
	}

	const fav = blogs.reduce(
		(mostLiked, blog) => {
			if (blog.likes > mostLiked.likes) {
				return blog
			}
			return mostLiked
		},
		{ likes: 0 }
	)

	return fav
}

const mostBlogs = (blogs: Record<any, any>[]) => {

	const authorsList = blogs.reduce((blogCount, blog) => {
		if (blogCount[blog.author]) {
			blogCount[blog.author]++
		} else {
			blogCount[blog.author] = 1
		}
		return blogCount
	}, {})

	let mostBlogsAuthor
	let mostBlogsCount = 0

	for (const [author, count] of Object.entries(authorsList)) {
		if (count > mostBlogsCount) {
			mostBlogsAuthor = author
			mostBlogsCount = count
		}
	}

	return {
		author: mostBlogsAuthor,
		blogs: mostBlogsCount,
	}
}

const mostLikes = (blogs: Record<any, any>[]) => {

	const likesList = blogs.reduce((likesCount, blog) => {
		if (!likesCount[blog.author]) {
			likesCount[blog.author] = { author: blog.author, likes: blog.likes }
		} else {
			likesCount[blog.author].likes += blog.likes
		}
		return likesCount
	}, {})

	let mostLikesAuthor = null
	let mostLikesCount = 0

	Object.values(likesList).forEach((author) => {
		if (author.likes > mostLikesCount) {
			mostLikesAuthor = author
			mostLikesCount = author.likes
		}
	})

	return  mostLikesAuthor
	
}

export default {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
} as const
