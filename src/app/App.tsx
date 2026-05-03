// Root component responsible strictly for composing global providers (Theme, Store, Router).
import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import ErrorBoundary from '../shared/components/ErrorBoundary';
import { useAuthStore } from './store/authStore'
import { onAuthStateChanged } from '../modules/auth/services/firebaseAuth'
import { registerServiceWorker } from '../modules/notifications/services/notificationService'

const App = () => {
    useEffect(() => {
        const { setUser, setLoading, clearUser } = useAuthStore.getState()
        setLoading(true)
        const unsubscribe = onAuthStateChanged((user) => {
            if (user) {
                setUser(user)
            } else {
                clearUser()
            }
            setLoading(false)
        })
        registerServiceWorker()
        return unsubscribe
    }, [])


    return (
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    );
}

export default App