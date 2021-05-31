// import { AxiosResponse } from 'axios'
import React, { Fragment } from 'react'

import { useGet } from 'react-axios-hooks-graphql-style'


const App = () => {
  const { loading, data, error } = useGet(
    'https://api.publicapis.org/entries',
    {}, // headers object
    (success: any) => {
      //TODO: Do something here
      console.log(success)
    },
    (error: any) => {
      //TODO: Do something here
      console.log(error)
    }
  )

  return (
    <Fragment>
      <div style={{ paddingLeft: 20 }}>
        {loading && <h3>Loading ...</h3>}
        {error && <h3>{error.message}</h3>}
        {data &&
          data?.entries.map((item: any) => (
            <div>
              <h3>API: {item?.API}</h3>
              <a href={item?.Link}>URL: {item?.Link}</a>
              <p>Description: {item?.Description}</p>
            </div>
          ))}
      </div>
    </Fragment>
  )
}

export default App
