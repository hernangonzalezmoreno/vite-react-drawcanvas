import './App.css'
import { DrawCanvas } from './components/DrawCanvas'

function App() {
  return (
    <DrawCanvas
      idCanvas="canvas"
      width={800}
      height={600}
    />
  )
}

export default App
