import { Button, Badge } from '@hmg-fe/hmg-design-system'

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Vehicle Content Studio</h1>
      <p style={{ marginTop: '1rem', marginBottom: '2rem' }}>
        HMG Design System 연동 완료
      </p>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button hdsProps={{ size: 'large', style: 'primary' }}>
          Primary Button
        </Button>
        <Button hdsProps={{ size: 'medium', style: 'secondary' }}>
          Secondary Button
        </Button>
        <Badge hdsProps={{ size: 'small', style: 'info', type: 'strong' }}>
          Hyundai Theme
        </Badge>
      </div>
    </div>
  )
}

export default App
