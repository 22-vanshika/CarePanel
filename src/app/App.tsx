// Root component responsible strictly for composing global providers (Theme, Store, Router).
import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { useAuthStore } from './store/authStore'
import { onAuthStateChanged } from '../modules/auth/services/firebaseAuth'
import { registerServiceWorker, requestNotificationPermission } from '../modules/notifications/services/notificationService'

const App = () => {
    const setUser = useAuthStore(state => state.setUser)
    const setLoading = useAuthStore(state => state.setLoading)
    const clearUser = useAuthStore(state => state.clearUser)

    useEffect(() => {
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
        requestNotificationPermission()
        return unsubscribe
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return <RouterProvider router={router} />
}

export default App