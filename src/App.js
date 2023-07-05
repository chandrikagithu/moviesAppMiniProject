import {Switch, Route, Redirect} from 'react-router-dom'
import LoginRoute from './components/LoginRoute'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import PopularMovies from './components/PopularMovies'
import AccountPage from './components/AccountPage'
import SearchRoute from './components/SearchRoute/index'
import MovieDetails from './components/MovieDetails/index'
import NotFound from './components/NotFound/index'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/popular" component={PopularMovies} />
    <ProtectedRoute exact path="/account" component={AccountPage} />
    <ProtectedRoute exact path="/search" component={SearchRoute} />
    <ProtectedRoute exact path="/movies/:id" component={MovieDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
