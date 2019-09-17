const ORDER_API = {
    //获取订单列表
    getOrders: {
        method: 'get',
        url: '/5g-orders'
    },
    //创建订单
    createOrder: {
        method: 'post',
        url: '/5g-orders'
    },
    //创建订单
    activeOrder: {
        method: 'post',
        url: '/5g-orders/{orderId}/active',
    },
    //登录
    login: {
        method: 'post',
        url: '/login'
    },
    //登出
    logout: {
        method: 'delete',
        url: '/logout'
    }
}

export default ORDER_API