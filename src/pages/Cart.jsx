import PageIntro from "../components/common/PageIntro";
import CartContents from "../components/cart/CartContents";
import "./Cart.css";

export default function Cart() {
  return (
    <>
      <PageIntro eyebrow="Cart" title="Your Cart" text="Review your items before checkout." />
      <section className="cart-page">
        <div className="container cart-page__inner">
          <CartContents />
        </div>
      </section>
    </>
  );
}
