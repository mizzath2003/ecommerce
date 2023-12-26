import React from 'react'

import classes from './index.module.scss'
import { Blocks } from '../Blocks'

const NewCollection = ({ blocks }) => {
  return (
    <div className={classes.newCollection}>
      <h3 className={classes.title}>New Collection</h3>
      <Blocks blocks={blocks} />
    </div>
  )
}

export default NewCollection
