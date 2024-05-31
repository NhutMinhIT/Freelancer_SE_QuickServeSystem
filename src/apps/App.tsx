import { BrowserRouter } from 'react-router-dom'
import AppRouter from '../routers'

const App = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
