import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const { totalAmount, customer, cartItems } = location.state || {};

  // 🔴 Redirect safely AFTER first render
  useEffect(() => {
    if (!totalAmount || !customer || !cartItems) {
      navigate("/shop", { replace: true });
    }
  }, [totalAmount, customer, cartItems, navigate]);

  if (!totalAmount || !customer || !cartItems) return null;

  /* ---------------- PAYMENT METHOD ---------------- */
  const [method, setMethod] = useState<"upi" | "card">("upi");

  /* ---------------- UPI STATE ---------------- */
  const [upiId, setUpiId] = useState("");
  const [upiError, setUpiError] = useState(false);

  /* ---------------- CARD STATE ---------------- */
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardError, setCardError] = useState(false);

  /* ---------------- PAY HANDLER ---------------- */
  const handleRazorpayPay = async () => {
  // ---------------- VALIDATION FIRST ----------------

  if (method === "upi") {
    if (!upiId.trim()) {
      setUpiError(true);
      return;
    }
  }

  if (method === "card") {
    if (!cardNumber.trim()) {
      setCardError(true);
      return;
    }
  }

  // ---------------- THEN OPEN RAZORPAY ----------------
  try {
    const res = await fetch("http://localhost:5000/api/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalAmount }),
    });

    const data = await res.json();

    const options = {
      key: "rzp_test_xxxxxxxx", // ONLY KEY ID
      amount: data.order.amount,
      currency: "INR",
      name: "My Shop",
      description: "Test Transaction",
      order_id: data.order.id,

      handler: async function (response: any) {
        const verifyRes = await fetch(
          "http://localhost:5000/api/payment/verify",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          }
        );

        const verifyData = await verifyRes.json();

        if (verifyData.success) {
          alert("Payment Successful!");
          navigate("/success");
        } else {
          alert("Payment verification failed");
        }
      },

      prefill: {
        name: customer.name,
        email: customer.email,
      },

      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();

  } catch (error) {
    console.error(error);
    alert("Payment failed to start");
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-6 px-2">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow overflow-hidden">

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3">

          {/* ---------------- LEFT SECTION ---------------- */}
          <div className="lg:col-span-2 border-b lg:border-b-0 lg:border-r">

            {/* HEADER */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg sm:text-xl font-semibold">Complete Payment</h2>
              <span className="text-sm text-gray-600 font-medium">
                100% Secure
              </span>
            </div>

            <div className="flex flex-col lg:flex-row">

              {/* -------- LEFT MENU -------- */}
              <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r bg-gray-50">

                {/* UPI */}
                <button
                  onClick={() => setMethod("upi")}
                  className={`w-full text-left px-4 py-4 border-b ${
                    method === "upi"
                      ? "bg-white font-semibold"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <p>UPI</p>
                  <p className="text-sm text-gray-600">Pay by any UPI app</p>
                </button>

                {/* CARD */}
                <button
                  onClick={() => setMethod("card")}
                  className={`w-full text-left px-4 py-4 border-b ${
                    method === "card"
                      ? "bg-white font-semibold"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <p>Credit / Debit / ATM Card</p>
                  <p className="text-sm text-gray-600">
                    Add and secure cards as per RBI guidelines
                  </p>
                </button>

                <div className="px-4 py-4 text-gray-400 border-b">EMI</div>
                <div className="px-4 py-4 text-gray-400 border-b">
                  Gift Card
                </div>
                <div className="px-4 py-4 text-gray-400">
                  Cash on Delivery (Unavailable)
                </div>
              </div>

              {/* -------- RIGHT CONTENT -------- */}
              <div className="flex-1 p-4 sm:p-8">

                {/* ---------------- UPI UI ---------------- */}
                {method === "upi" && (
                  <div className="max-w-md mx-auto">

                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <input type="radio" checked readOnly />
                        <h3 className="font-semibold">Add new UPI ID</h3>
                      </div>
                      <span className="text-blue-600 text-sm cursor-pointer">
                        How to find?
                      </span>
                    </div>

                    <label className="block text-sm font-medium mb-1">
                      UPI ID
                    </label>

                    <div className="flex flex-col sm:flex-row gap-3 mb-3">
                      <input
                        type="text"
                        placeholder="Enter your UPI ID"
                        value={upiId}
                        onChange={(e) => {
                          setUpiId(e.target.value);
                          setUpiError(false);
                        }}
                        className={`flex-1 border rounded px-3 py-2 focus:outline-none ${
                          upiError ? "border-red-400" : "focus:border-blue-500"
                        }`}
                      />

                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold">
                        Verify
                      </button>
                    </div>

                    {upiError && (
                      <p className="text-red-500 text-sm mb-3">
                        This field is required
                      </p>
                    )}

                    <button
                      onClick={handleRazorpayPay}
                      className="w-full bg-gray-700 hover:bg-gray-800 text-white py-3 rounded font-semibold"
                    >
                      Pay ₹{totalAmount}
                    </button>
                  </div>
                )}

                {/* ---------------- CARD UI ---------------- */}
                {method === "card" && (
                  <div className="max-w-md mx-auto">

                    <p className="text-sm text-gray-600 mb-4">
                      Note: Please ensure your card can be used for online
                      transactions.{" "}
                      <span className="text-blue-600 cursor-pointer">
                        Learn More
                      </span>
                    </p>

                    {/* CARD NUMBER */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">
                        Card Number
                      </label>

                      <input
                        type="text"
                        placeholder="XXXX XXXX XXXX XXXX"
                        value={cardNumber}
                        onChange={(e) => {
                          setCardNumber(e.target.value);
                          setCardError(false);
                        }}
                        className={`w-full border px-4 py-3 rounded focus:outline-none ${
                          cardError
                            ? "border-red-500"
                            : "focus:border-blue-500"
                        }`}
                      />

                      {cardError && (
                        <p className="text-red-600 text-sm mt-1">
                          Card number is required
                        </p>
                      )}
                    </div>

                    {/* EXPIRY + CVV */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Valid Thru
                        </label>
                        <input
                          type="text"
                          placeholder="MM / YY"
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          className="w-full border px-4 py-3 rounded focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          CVV
                        </label>
                        <input
                          type="password"
                          placeholder="CVV"
                          maxLength={3}
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          className="w-full border px-4 py-3 rounded focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* PAY BUTTON */}
                    <button
                      onClick={handleRazorpayPay}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded text-lg"
                    >
                      Pay ₹{totalAmount}
                    </button>
                  </div>
                )}

              </div>
            </div>
          </div>

          {/* ---------------- RIGHT PRICE SUMMARY ---------------- */}
          <div className="p-4 sm:p-6 bg-blue-50">

            <h3 className="text-lg font-semibold mb-4">Price Details</h3>

            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Price</span>
                <span>₹{totalAmount}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-green-600">Free</span>
              </div>

              <hr />

              <div className="flex justify-between text-lg font-bold text-blue-700">
                <span>Total Amount</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
