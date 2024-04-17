const _ = require('lodash')

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

const favoriteBlog = (blogs) => {
    const reducer = blogs.reduce((a, b) => {
        return (a && b.y > b.y) ? a : b
    })
    
    return {
        title: reducer.title,
        author: reducer.author,
        likes: reducer.likes
    }
}

const mostBlogs = (blogs) => {
    const authors = _.countBy(blogs.map((blog) => blog.author))

    const most = Object.keys(authors).reduce((a, b) => authors[a] > authors[b] ? a : b)

    return {
        author: most,
        blogs: authors[most]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
}