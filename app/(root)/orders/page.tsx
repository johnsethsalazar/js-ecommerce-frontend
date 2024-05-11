import { getOrders } from '@/lib/actions/actions'
import { auth } from '@clerk/nextjs'
import React from 'react'

const Orders = async() => {
  const {userId} = auth()

  const orders = await getOrders(userId as string)

  console.log(orders)
  
  return (
    <div className='px-10 py-5 max-sm:px-3'>
      <p className='text-heading3-bold my-10'>Your Orders</p>
      {!orders || orders.length === 0 && (
        <p className='text-body-bold my-5'>You have no orders yet.</p>
      )}

      <div className='flex flex-col gap-10'>
        {orders?.map((order: OrderType) => (
          <div key={order._id} className='flex flex-col gap-8 p-4 hover:bg-grey-1'>
            <div className='flex gap-20 max-md:flex-col max-md:gap-3'>
              <p className='text-base-bold'>Order ID: {order._id}</p>
              <p className='text-body-bold'>Total: ${order.totalAmount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders