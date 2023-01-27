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
    
	const fav = blogs.reduce((mostLiked, blog) => {
		if (blog.likes > mostLiked.likes) {
			return blog
		}
		return mostLiked
	}, { likes: 0 })
    
	return fav
}

export default {
	dummy,
	totalLikes,
	favoriteBlog
} as const
