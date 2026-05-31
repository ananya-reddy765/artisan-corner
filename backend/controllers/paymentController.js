const Stripe =
  require("stripe");

const stripe =
  Stripe(
    process.env
      .STRIPE_SECRET_KEY
  );

const createCheckoutSession =
  async (
    req,
    res
  ) => {
    try {
      const {
        products,
      } = req.body;

      const session =
        await stripe.checkout.sessions.create({
          payment_method_types: [
            "card",
          ],

          line_items:
            products.map(
              (
                product
              ) => ({
                price_data: {
                  currency:
                    "inr",

                  product_data:
                    {
                      name:
                        product.title,
                    },

                  unit_amount:
                    Math.round(
                      product.price *
                        100
                    ),
                },

                quantity:
                  product.quantity ||
                  1,
              })
            ),

          mode: "payment",

          success_url:
            "http://localhost:5173/payment-success",

          cancel_url:
            "http://localhost:5173/cart",
        });

      res.json({
        success: true,
        url: session.url,
      });
    } catch (error) {
      console.error(
        error
      );

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

module.exports = {
  createCheckoutSession,
};