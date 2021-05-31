# react-axios-hooks-graphql-style

> A wrapper for axios to behave as graphql request

[![NPM](https://img.shields.io/npm/v/react-axios-hooks-graphql-style.svg)](https://www.npmjs.com/package/react-axios-hooks-graphql-style) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-axios-hooks-graphql-style
```

## Usage

# useGet
### Behaves like useQuery from graghql
```tsx
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

```

## License

MIT © [Mushud](https://github.com/Mushud)
