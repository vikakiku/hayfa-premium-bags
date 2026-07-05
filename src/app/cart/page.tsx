"use client";

import { useCart } from "@/lib/cart-context";
import { getProductImage } from "@/lib/product-images";

const fmtIDR = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

export default function CartPage() {
  const {
    items,
    increase,
    decrease,
    removeItem,
    subtotal,
    tax,
    grandTotal,
    totalItems,
  } = useCart();

  const isEmpty = items.length === 0;

  return (
    <main className="container" style={{ padding: "64px 24px" }}>
      <h1 className="section-title" style={{ marginBottom: "32px" }}>
        Your Cart
      </h1>

      {isEmpty && <p>Your cart is empty.</p>}

      {!isEmpty && (
        <section
          className="cart-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)",
            gap: "32px",
          }}
        >
          {/* LEFT: daftar item */}
          <div className="cart-items">
            {items.map((item) => {
              const imgSrc = item.imageUrl
                ? item.imageUrl
                : getProductImage(item.name);

              return (
                <article
                  key={item.id}
                  className="cart-item-card"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "16px 20px",
                    borderRadius: "20px",
                    background: "#ffffff",
                    boxShadow: "0 18px 40px rgba(24, 15, 10, 0.08)",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      width: 96,
                      height: 96,
                      borderRadius: "16px",
                      overflow: "hidden",
                      background: "#f7f2ee",
                      flexShrink: 0,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imgSrc}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <div style={{ flex: 1 }}>
                    <h2
                      style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        marginBottom: 4,
                      }}
                    >
                      {item.name}
                    </h2>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#9b7f71",
                        marginBottom: 8,
                      }}
                    >
                      {item.price ? fmtIDR(item.price) : "Price on request"}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          borderRadius: "999px",
                          background: "#f6eee9",
                          padding: "4px 10px",
                          gap: "8px",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => decrease(item.id)}
                          style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                            fontSize: "16px",
                          }}
                        >
                          −
                        </button>
                        <span
                          style={{
                            minWidth: 20,
                            textAlign: "center",
                            fontSize: "14px",
                          }}
                        >
                          {item.qty.toString().padStart(2, "0")}
                        </span>
                        <button
                          type="button"
                          onClick={() => increase(item.id)}
                          style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                            fontSize: "16px",
                          }}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        style={{
                          border: "none",
                          background: "transparent",
                          color: "#b1433b",
                          fontSize: "13px",
                          cursor: "pointer",
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* RIGHT: ringkasan harga */}
          <aside
            className="cart-summary"
            style={{
              alignSelf: "flex-start",
              background: "#ffffff",
              padding: "24px 24px 28px",
              borderRadius: "24px",
              boxShadow: "0 24px 60px rgba(24, 15, 10, 0.12)",
            }}
          >
            <h2
              style={{
                fontSize: "18px",
                fontWeight: 600,
                marginBottom: "16px",
              }}
            >
              Order Summary
            </h2>

            <p
              style={{
                fontSize: "13px",
                color: "#9b7f71",
                marginBottom: "16px",
              }}
            >
              {totalItems} item{totalItems > 1 ? "s" : ""} in your cart.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "14px",
                marginBottom: 8,
              }}
            >
              <span>Subtotal</span>
              <span>{fmtIDR(subtotal)}</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "14px",
                marginBottom: 8,
              }}
            >
              <span>Tax (11%)</span>
              <span>{fmtIDR(tax)}</span>
            </div>

            <hr
              style={{
                border: 0,
                borderTop: "1px solid #f0e0d6",
                margin: "12px 0 16px",
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "15px",
                fontWeight: 600,
                marginBottom: 20,
              }}
            >
              <span>Total</span>
              <span>{fmtIDR(grandTotal)}</span>
            </div>

            <button
              type="button"
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
                background: "#5e1110",
                color: "#fff8f2",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              Proceed to Checkout
            </button>
          </aside>
        </section>
      )}
    </main>
  );
}
