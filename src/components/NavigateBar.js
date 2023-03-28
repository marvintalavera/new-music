import { useNavigate } from 'react-router-dom'

export default function NavigateBar() {
    const navigate = useNavigate()

    return <div>
        <button onClick={() => navigate(-1)}>Back</button>
        |
        <button onClick={() => navigate('/')}>Home</button>
    </div>
}