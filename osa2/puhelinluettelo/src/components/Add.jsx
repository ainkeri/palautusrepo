const Add = ({ onsubmit, value, onChange, value2, onChange2 }) => {
    return (
        <form onSubmit={onsubmit}>
            <div>
                name:
                <input
                    value={value}
                    onChange={onChange}
                />
            </div>
            <div>
                number:
                <input
                    value={value2}
                    onChange={onChange2}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default Add