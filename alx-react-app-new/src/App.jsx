import WelcomeMessage from './components/WelcomeMessage'
import Header from './components/Header'
import MainContent from './components/MainContent'
import Footer from './components/Footer'
import UserProfile from './components/UserProfile'

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      margin: '0',
      padding: '0'
    }}>
      <WelcomeMessage />
      <Header />
      <MainContent />
      <UserProfile name="Alice" age={25} bio="Loves hiking and photography" />
      <Footer />
    </div>
  )
}

export default App