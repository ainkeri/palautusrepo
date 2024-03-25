const Notification = ({ message, rejected }) => {
    if (rejected !== null) {
        return (
            <div className="failed">
                {rejected}
            </div>
        )
    }

    if (message === null) {
        return null
    }

    return (
        <div className="error">
            {message}
        </div>
    )
}

export default Notification