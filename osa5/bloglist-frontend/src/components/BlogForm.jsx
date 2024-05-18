const BlogForm = ({ onSubmit, title, author, url, handleTitleChange, handleAuthorChange, handleUrlChange }) => {
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={onSubmit}>
                <div>
                title:
                    <input
                    value={title}
                    onChange={handleTitleChange}
                />
                </div>
                <div>
                author:
                    <input
                    value={author}
                    onChange={handleAuthorChange}
                />
                </div>
                <div>
                url:
                    <input
                    value={url}
                    onChange={handleUrlChange}
                />
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default BlogForm