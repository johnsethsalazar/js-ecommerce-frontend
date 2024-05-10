import { getOrders } from '@/lib/actions/actions'
import { auth } from '@clerk/nextjs'
import React from 'react'

const Orders = async() => {
  const {userId} = auth()

  const orders = await getOrders(userId as string)

  console.log(orders)
  
  return (
    <div>Orders</div>
  )
}

export default Orders