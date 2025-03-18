import { Provider } from 'react-redux'
import './App.css'
import { ThemeProvider } from './hooks/theme-provider'
import { store } from './store/store'
import { LanguageProvider } from './hooks/LanguageProvider'
import AppRoutes from './route/AppRoutes'

function App() {

  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        <LanguageProvider >
            <AppRoutes/>
        </LanguageProvider>
      </ThemeProvider>
    </Provider>
   
  )
}

export default App
