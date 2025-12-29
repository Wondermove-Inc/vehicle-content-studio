import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ContentRequest() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/project', { replace: true })
  }, [navigate])

  return null
}

export default ContentRequest
