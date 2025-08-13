// server/tests/integration/api.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../src/index'); // Your Express app
const User = require('../../src/models/User');
const Player = require('../../src/models/Player');
const League = require('../../src/models/League');
const Fixture = require('../../src/models/Fixture');
const NewsArticle = require('../../src/models/NewsArticle');
const Product = require('../../src/models/Product');
const Order = require('../../src/models/Order');
const Payment = require('../../src/models/Payment');
const { jwtSecret } = require('../../src/config/jwt');
const jwt = require('jsonwebtoken');

let adminToken;
let userToken;
let adminUser;
let regularUser;

// Connect to a test database before all tests
beforeAll(async () => {
  // Use a different database for testing to avoid conflicts with development data
  const mongoUri = process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/realsoccer_test';
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Clear the database before tests
  await User.deleteMany({});
  await Player.deleteMany({});
  await League.deleteMany({});
  await Fixture.deleteMany({});
  await NewsArticle.deleteMany({});
  await Product.deleteMany({});
  await Order.deleteMany({});
  await Payment.deleteMany({});

  // Create an admin user
  adminUser = await User.create({
    username: 'adminuser',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin',
  });
  adminToken = jwt.sign({ id: adminUser._id }, jwtSecret, { expiresIn: '1h' });

  // Create a regular user
  regularUser = await User.create({
    username: 'regularuser',
    email: 'user@example.com',
    password: 'password123',
    role: 'user',
  });
  userToken = jwt.sign({ id: regularUser._id }, jwtSecret, { expiresIn: '1h' });
});

// Close the database connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('API Integration Tests', () => {
  // Test Auth Routes
  describe('Auth Routes', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'newtestuser',
          email: 'newtest@example.com',
          password: 'password123',
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.email).toBe('newtest@example.com');
    });

    it('should login an existing user', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'user@example.com',
          password: 'password123',
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should get authenticated user profile', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.email).toBe('user@example.com');
      expect(res.body).not.toHaveProperty('password');
    });
  });

  // Test Player Routes
  describe('Player Routes', () => {
    let testPlayerId;
    it('should allow admin to create a player', async () => {
      const res = await request(app)
        .post('/api/players')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Test Player',
          team: 'Test Team',
          position: 'Forward',
          nationality: 'Testland',
          dateOfBirth: '2000-01-01',
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body.name).toBe('Test Player');
      testPlayerId = res.body._id;
    });

    it('should get all players (public)', async () => {
      const res = await request(app).get('/api/players');
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('should get a player by ID (public)', async () => {
      const res = await request(app).get(`/api/players/${testPlayerId}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toBe('Test Player');
    });

    it('should allow admin to update a player', async () => {
      const res = await request(app)
        .put(`/api/players/${testPlayerId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          team: 'Updated Team',
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body.team).toBe('Updated Team');
    });

    it('should allow admin to delete a player', async () => {
      const res = await request(app)
        .delete(`/api/players/${testPlayerId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toBe('Player removed');
    });

    it('should prevent non-admin from creating a player', async () => {
      const res = await request(app)
        .post('/api/players')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'Unauthorized Player',
          team: 'Unauthorized Team',
          position: 'Midfielder',
          nationality: 'Any',
          dateOfBirth: '1990-01-01',
        });
      expect(res.statusCode).toEqual(403); // Forbidden
    });
  });

  // Test League Routes
  describe('League Routes', () => {
    let testLeagueId;
    it('should allow admin to create a league', async () => {
      const res = await request(app)
        .post('/api/leagues')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Test League',
          country: 'Test Country',
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body.name).toBe('Test League');
      testLeagueId = res.body._id;
    });

    it('should get all leagues (public)', async () => {
      const res = await request(app).get('/api/leagues');
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('should get a league by ID (public)', async () => {
      const res = await request(app).get(`/api/leagues/${testLeagueId}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toBe('Test League');
    });

    it('should allow admin to update a league', async () => {
      const res = await request(app)
        .put(`/api/leagues/${testLeagueId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          description: 'Updated description',
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body.description).toBe('Updated description');
    });

    it('should allow admin to delete a league', async () => {
      const res = await request(app)
        .delete(`/api/leagues/${testLeagueId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toBe('League removed');
    });
  });

  // Test Fixture Routes
  describe('Fixture Routes', () => {
    let testFixtureId;
    let createdLeague; // Need a league to create a fixture

    beforeAll(async () => {
      createdLeague = await League.create({
        name: 'Fixture Test League',
        country: 'Test Country',
      });
    });

    it('should allow admin to create a fixture', async () => {
      const res = await request(app)
        .post('/api/fixtures')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          homeTeam: 'Team A',
          awayTeam: 'Team B',
          league: createdLeague._id,
          date: new Date().toISOString(),
          location: 'Test Stadium',
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body.homeTeam).toBe('Team A');
      testFixtureId = res.body._id;
    });

    it('should get all fixtures (public)', async () => {
      const res = await request(app).get('/api/fixtures');
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('should get a fixture by ID (public)', async () => {
      const res = await request(app).get(`/api/fixtures/${testFixtureId}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.homeTeam).toBe('Team A');
    });

    it('should allow admin to update a fixture', async () => {
      const res = await request(app)
        .put(`/api/fixtures/${testFixtureId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          status: 'finished',
          score: { home: 2, away: 1 },
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toBe('finished');
      expect(res.body.score.home).toBe(2);
    });

    it('should get live fixtures (none after previous update)', async () => {
      const res = await request(app).get('/api/fixtures/live');
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toEqual(0); // Because we just finished the only test fixture
    });

    it('should allow admin to delete a fixture', async () => {
      const res = await request(app)
        .delete(`/api/fixtures/${testFixtureId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toBe('Fixture removed');
    });
  });

  // Test News Routes
  describe('News Routes', () => {
    let testNewsArticleId;
    it('should allow admin to create a news article', async () => {
      const res = await request(app)
        .post('/api/news')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Test News Article',
          content: 'This is the content of the test news article. It is quite informative and covers recent events.',
          author: 'Admin Writer',
          category: 'general',
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body.title).toBe('Test News Article');
      testNewsArticleId = res.body._id;
    });

    it('should get all news articles (public)', async () => {
      const res = await request(app).get('/api/news');
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('should get a news article by ID (public)', async () => {
      const res = await request(app).get(`/api/news/${testNewsArticleId}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.title).toBe('Test News Article');
    });

    it('should allow admin to update a news article', async () => {
      const res = await request(app)
        .put(`/api/news/${testNewsArticleId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          category: 'transfer news',
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body.category).toBe('transfer news');
    });

    it('should allow admin to delete a news article', async () => {
      const res = await request(app)
        .delete(`/api/news/${testNewsArticleId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toBe('News article removed');
    });
  });

  // Test Shop/Product Routes
  describe('Shop/Product Routes', () => {
    let testProductId;
    it('should allow admin to create a product', async () => {
      const res = await request(app)
        .post('/api/shop/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Test Jersey',
          description: 'A comfortable test jersey.',
          price: 59.99,
          category: 'jersey',
          stock: 100,
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body.name).toBe('Test Jersey');
      testProductId = res.body._id;
    });

    it('should get all products (public)', async () => {
      const res = await request(app).get('/api/shop/products');
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('should get a product by ID (public)', async () => {
      const res = await request(app).get(`/api/shop/products/${testProductId}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toBe('Test Jersey');
    });

    it('should allow admin to update a product', async () => {
      const res = await request(app)
        .put(`/api/shop/products/${testProductId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          price: 49.99,
          stock: 90,
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body.price).toBe(49.99);
      expect(res.body.stock).toBe(90);
    });

    it('should allow admin to delete a product', async () => {
      const res = await request(app)
        .delete(`/api/shop/products/${testProductId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toBe('Product removed');
    });
  });

  // Test Order Routes
  describe('Order Routes', () => {
    let testOrderId;
    let productForOrder;

    beforeAll(async () => {
      productForOrder = await Product.create({
        name: 'Order Test Ball',
        description: 'A ball for testing orders.',
        price: 25.00,
        category: 'ball',
        stock: 5, // Sufficient stock
      });
    });

    it('should allow a user to create an order', async () => {
      const res = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          orderItems: [
            {
              name: productForOrder.name,
              qty: 2,
              imageUrl: productForOrder.imageUrl,
              price: productForOrder.price,
              product: productForOrder._id,
            },
          ],
          shippingAddress: {
            address: '123 Test St',
            city: 'Test City',
            postalCode: '12345',
            country: 'Testland',
          },
          paymentMethod: 'PayPal',
          taxPrice: 2.00,
          shippingPrice: 5.00,
          totalPrice: 57.00, // 2 * 25 + 2 + 5
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body.user.toString()).toBe(regularUser._id.toString());
      expect(res.body.orderItems[0].product.toString()).toBe(productForOrder._id.toString());
      testOrderId = res.body._id;

      // Verify stock decreased
      const updatedProduct = await Product.findById(productForOrder._id);
      expect(updatedProduct.stock).toBe(3); // 5 - 2
    });

    it('should prevent order creation with insufficient stock', async () => {
      const res = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          orderItems: [
            {
              name: productForOrder.name,
              qty: 10, // More than available stock (3 remaining)
              imageUrl: productForOrder.imageUrl,
              price: productForOrder.price,
              product: productForOrder._id,
            },
          ],
          shippingAddress: {
            address: '123 Test St',
            city: 'Test City',
            postalCode: '12345',
            country: 'Testland',
          },
          paymentMethod: 'PayPal',
          taxPrice: 2.00,
          shippingPrice: 5.00,
          totalPrice: 57.00,
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toContain('Not enough stock');
    });

    it('should allow admin to get all orders', async () => {
      const res = await request(app)
        .get('/api/orders')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('should allow user to get their own order by ID', async () => {
      const res = await request(app)
        .get(`/api/orders/${testOrderId}`)
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body._id.toString()).toBe(testOrderId.toString());
    });

    it('should allow admin to get any order by ID', async () => {
      const res = await request(app)
        .get(`/api/orders/${testOrderId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body._id.toString()).toBe(testOrderId.toString());
    });

    it('should allow admin to update order to delivered', async () => {
      const res = await request(app)
        .put(`/api/orders/${testOrderId}/deliver`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.isDelivered).toBe(true);
      expect(res.body).toHaveProperty('deliveredAt');
    });

    it('should allow user to get their own orders list', async () => {
      const res = await request(app)
        .get('/api/orders/myorders')
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0].user.toString()).toBe(regularUser._id.toString());
    });
  });

  // Test Payment Routes
  describe('Payment Routes', () => {
    let testOrderIdForPayment;
    let testPaymentId;

    beforeAll(async () => {
      // Create an order that needs to be paid
      const product = await Product.create({
        name: 'Payment Test Item',
        description: 'For payment testing',
        price: 10.00,
        category: 'accessories',
        stock: 10,
      });
      const order = new Order({
        user: regularUser._id,
        orderItems: [{
          name: product.name,
          qty: 1,
          imageUrl: product.imageUrl,
          price: product.price,
          product: product._id,
        }],
        shippingAddress: { address: 'a', city: 'b', postalCode: 'c', country: 'd' },
        paymentMethod: 'Stripe',
        taxPrice: 1.00,
        shippingPrice: 2.00,
        totalPrice: 13.00,
        isPaid: false,
      });
      const createdOrder = await order.save();
      testOrderIdForPayment = createdOrder._id;
    });

    it('should allow creating a payment for an order', async () => {
      const res = await request(app)
        .post('/api/payments')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          order: testOrderIdForPayment,
          paymentGateway: 'Stripe',
          transactionId: 'txn_12345',
          amount: 13.00,
          currency: 'USD',
          status: 'completed',
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body.order.toString()).toBe(testOrderIdForPayment.toString());
      expect(res.body.status).toBe('completed');
      testPaymentId = res.body._id;

      // Also update the order's paid status
      await request(app)
        .put(`/api/orders/${testOrderIdForPayment}/pay`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          id: 'pay_txn_123',
          status: 'COMPLETED',
          update_time: new Date().toISOString(),
          email_address: regularUser.email,
        });
      const updatedOrder = await Order.findById(testOrderIdForPayment);
      expect(updatedOrder.isPaid).toBe(true);
    });

    it('should allow admin to get all payments', async () => {
      const res = await request(app)
        .get('/api/payments')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('should allow user to get their own payment by ID', async () => {
      const res = await request(app)
        .get(`/api/payments/${testPaymentId}`)
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body._id.toString()).toBe(testPaymentId.toString());
    });

    it('should allow admin to update payment status', async () => {
      const res = await request(app)
        .put(`/api/payments/${testPaymentId}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'refunded' });
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toBe('refunded');
    });
  });

  // Test Admin Routes
  describe('Admin Routes', () => {
    it('should get admin dashboard stats', async () => {
      const res = await request(app)
        .get('/api/admin/dashboard')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('usersCount');
      expect(res.body).toHaveProperty('ordersCount');
    });

    it('should allow admin to update user role', async () => {
      const newUserForRoleTest = await User.create({
        username: 'rolechangeuser',
        email: 'rolechange@example.com',
        password: 'password123',
        role: 'user',
      });

      const res = await request(app)
        .put(`/api/admin/users/${newUserForRoleTest._id}/role`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ role: 'admin' });
      expect(res.statusCode).toEqual(200);
      expect(res.body.role).toBe('admin');

      const updatedUser = await User.findById(newUserForRoleTest._id);
      expect(updatedUser.role).toBe('admin');
    });

    it('should allow admin to update order status', async () => {
      const product = await Product.create({
        name: 'Order Status Test Item',
        description: 'For order status testing',
        price: 10.00,
        category: 'accessories',
        stock: 10,
      });
      const order = new Order({
        user: regularUser._id,
        orderItems: [{
          name: product.name,
          qty: 1,
          imageUrl: product.imageUrl,
          price: product.price,
          product: product._id,
        }],
        shippingAddress: { address: 'a', city: 'b', postalCode: 'c', country: 'd' },
        paymentMethod: 'Stripe',
        taxPrice: 1.00,
        shippingPrice: 2.00,
        totalPrice: 13.00,
        isPaid: true,
        paidAt: new Date(),
        isDelivered: false,
      });
      const orderForStatusTest = await order.save();

      const res = await request(app)
        .put(`/api/admin/orders/${orderForStatusTest._id}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'shipped' });
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toBe('shipped');

      const updatedOrder = await Order.findById(orderForStatusTest._id);
      expect(updatedOrder.status).toBe('shipped');
    });

    it('should generate a sales report', async () => {
      const res = await request(app)
        .get('/api/admin/reports/sales')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.reportType).toBe('sales');
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should generate a users report', async () => {
      const res = await request(app)
        .get('/api/admin/reports/users')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.reportType).toBe('users');
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should generate a products-stock report', async () => {
      const res = await request(app)
        .get('/api/admin/reports/products-stock')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.reportType).toBe('products-stock');
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should prevent non-admin from accessing admin dashboard', async () => {
      const res = await request(app)
        .get('/api/admin/dashboard')
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toEqual(403); // Forbidden
    });
  });
});