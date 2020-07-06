import Loadable from 'react-loadable'
import { Loading } from '../components'
const Dashboard = Loadable({
  loader: () => import('./Dashboard'),
  loading: Loading
})

const NotFound = Loadable({
  loader: () => import('./NotFound'),
  loading: Loading
})

const Settings = Loadable({
  loader: () => import('./Settings'),
  loading: Loading
})

const Login = Loadable({
  loader: () => import('./Login'),
  loading: Loading
})

const List = Loadable({
  loader: () => import('./Article/List'),
  loading: Loading
})

const Edit = Loadable({
  loader: () => import('./Article/Edit'),
  loading: Loading
})

const Notifications = Loadable({
  loader: () => import('./Notifications'),
  loading: Loading
})

// const NoAuth = Loadable({
//   loader: () => import('./NoAuth'),
//   loading: Loading
// })

// const Profile = Loadable({
//   loader: () => import('./Profile'),
//   loading: Loading
// })

export {
  Dashboard,
  Login,
  NotFound,
  Settings,
  List,
  Edit,
  Notifications,
  // NoAuth,
  // Profile
}