const dummy = (blogs) => {
   return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item
    }

    if (blogs.length === 0) {
        return 0
    } else if (blogs.length === 1) {
        return blogs[0].likes
    } else {
        return blogs.map((blog) => blog.likes).reduce(reducer)
    }

}
  
module.exports = {
    dummy,
    totalLikes,
}