import { Provider } from 'react-redux'
import './App.css'
import { ThemeProvider } from './components/theme-provider'
import Home from './Pages/Home'
import { store } from './store/store'
import { LanguageProvider } from './hooks/LanguageProvider'

function App() {

  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        <LanguageProvider >
          <div>
            <Home/>
          </div>
        </LanguageProvider>
      </ThemeProvider>
    </Provider>
   
  )
}

export default App
