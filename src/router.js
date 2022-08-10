import React, { lazy, useEffect, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router';
import { connect, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import MainLayout from 'layouts';
import MainPage from 'pages/main';

const routes = [
  {
    path: '/login',
    Component: lazy(() => import('pages/login')),
    exact: true,
  },
  {
    path: '/',
    Component: lazy(() => import('pages/main')),
    exact: true,
    authed: true
  },
]

const Router = ({ history }) => {
  const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn)
  const location = useSelector(({ router }) => router.location)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return (
    <ConnectedRouter history={history}>
      <MainLayout>
        <Route
          render={state => {
            const { location } = state
            return (
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  classNames='fade'
                  timeout={300}
                >
                  <div>
                    <Switch location={location}>
                      {routes.map(({ path, Component, exact, authed }) => (
                        <Route
                          path={path}
                          key={path}
                          exact={exact}
                          render={() => {
                            if (authed) {
                              if (isLoggedIn) {
                                return (
                                  <Suspense fallback={<>Loading...</>}>
                                    <Component />
                                  </Suspense>
                                )
                              } else {
                                return <Redirect to={{ pathname: '/login' }} />
                              }
                            } else {
                              return (
                                <Suspense fallback={<>Loading...</>}>
                                  <Component />
                                </Suspense>
                              )
                            }
                          }}
                        />
                      ))}
                    </Switch>
                  </div>
                </CSSTransition>
              </TransitionGroup>
            )
          }}
        />
      </MainLayout>
    </ConnectedRouter>
  );
}

export default connect()(Router);