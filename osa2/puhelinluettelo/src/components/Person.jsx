const Person = ({ person, toggleDeletion }) => {
    return (
        <div>{person.name} {person.number} <button onClick={toggleDeletion}>delete</button></div>
    )
}

export default Person