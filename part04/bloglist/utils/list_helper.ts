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

export default {
	dummy,
	totalLikes,
} as const
