export const users = [
    {
      id: '1',
      email: 'user1@example.com',
      password: 'password1',
      orders: [
        {
          id: '1',
          date: '2023-04-15',
          total: 29.97,
          items: [
            {
              id: '1',
              name: 'Product 1',
              price: 9.99,
              quantity: 3,
            },
          ],
        },
      ],
    },
    {
      id: '2',
      email: 'user2@example.com',
      password: 'password2',
      orders: [
        {
          id: '2',
          date: '2023-03-20',
          total: 44.98,
          items: [
            {
              id: '2',
              name: 'Product 2',
              price: 14.99,
              quantity: 2,
            },
            {
              id: '3',
              name: 'Product 3',
              price: 19.99,
              quantity: 1,
            },
          ],
        },
      ],
    },
    // Add more users as needed
  ];