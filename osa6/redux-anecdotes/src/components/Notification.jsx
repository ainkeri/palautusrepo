import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notifications)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification.length !== 0) return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification