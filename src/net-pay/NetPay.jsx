import React              from 'react'
import { Route, Switch }  from 'react-router-dom'

import NotFound     from '../errors/NotFound'
import Forbidden    from '../errors/Forbidden'
import ServerError  from '../errors/ServerError'
import Registration from './views/registration/Registration'
import Login        from './views/login/Login'
import Home         from './views/home/Home'
import Profile      from './views/profile/Profile'
import Credit       from './views/home/transcations/Credit'
import P2P          from './views/home/transcations/P2P'
import Bank         from './views/home/transcations/Bank'
import PersonalInformation from './views/profile/PersonalInformation'

import ColorScheme  from '../Colors.json'

function NetPay () {

  return (
    <Switch>
      <Route path = '/'         component = { () => <Home           />      } exact />
      <Route path = '/profile'  component = { () => <Profile        />      } exact />
      <Route path = '/register' component = { () => <Registration   />      } />

    
      <Route path = '/transcation/credit'       component = { () => <Credit               /> } />
      <Route path = '/transcation/p2p'          component = { () => <P2P                  /> } />
      <Route path = '/transcation/bank'         component = { () => <Bank                  /> } />
      <Route path = '/profile/update-profile'   component = { () => <PersonalInformation  /> } />

      <Route path = '/login'    component = { () => <Login          />      } />
      <Route path = '/403'      component = { () => <Forbidden    color = { ColorScheme.netpay }  />      } />
      <Route path = '/500'      component = { () => <ServerError  color = { ColorScheme.netpay }  />      } />
      <Route                    component = { () => <NotFound     color = { ColorScheme.netpay }  />      } />
    </Switch>
  )
}

export default NetPay
