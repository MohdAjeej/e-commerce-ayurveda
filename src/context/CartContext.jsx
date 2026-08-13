import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { useToast } from "./ToastContext";
import { loadCart, saveCart, loadBuyNowItem, saveBuyNowItem, GUEST_KEY } from "../utils/cartStorage";

const CartContext = createContext(null);

const itemKey = (id, variant) => `${id}::${variant ?? ""}`;

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity, variant } = action;
      const key = itemKey(product.id, variant);
      const existing = state.items.find((i) => itemKey(i.id, i.variant) === key);
      const items = existing
        ? state.items.map((i) => (itemKey(i.id, i.variant) === key ? { ...i, quantity: i.quantity + quantity } : i))
        : [...state.items, { id: product.id, name: product.name, image: product.image, price: product.price, quantity, variant: variant ?? null }];
      return { ...state, items };
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => itemKey(i.id, i.variant) !== itemKey(action.id, action.variant)) };
    case "INCREASE_QTY":
      return {
        ...state,
        items: state.items.map((i) =>
          itemKey(i.id, i.variant) === itemKey(action.id, action.variant) ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    case "DECREASE_QTY": {
      const key = itemKey(action.id, action.variant);
      const target = state.items.find((i) => itemKey(i.id, i.variant) === key);
      if (!target) return state;
      if (target.quantity <= 1) {
        return { ...state, items: state.items.filter((i) => itemKey(i.id, i.variant) !== key) };
      }
      return { ...state, items: state.items.map((i) => (itemKey(i.id, i.variant) === key ? { ...i, quantity: i.quantity - 1 } : i)) };
    }
    case "SET_QTY": {
      const key = itemKey(action.id, action.variant);
      if (action.quantity <= 0) return { ...state, items: state.items.filter((i) => itemKey(i.id, i.variant) !== key) };
      return { ...state, items: state.items.map((i) => (itemKey(i.id, i.variant) === key ? { ...i, quantity: action.quantity } : i)) };
    }
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "SET_BUY_NOW":
      return { ...state, buyNowItem: action.item };
    case "CLEAR_BUY_NOW":
      return { ...state, buyNowItem: null };
    case "OPEN_DRAWER":
      return { ...state, isDrawerOpen: true };
    case "CLOSE_DRAWER":
      return { ...state, isDrawerOpen: false };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const toast = useToast();
  const [state, dispatch] = useReducer(cartReducer, {
    items: loadCart(GUEST_KEY),
    buyNowItem: loadBuyNowItem(),
    isDrawerOpen: false,
  });

  useEffect(() => {
    saveCart(GUEST_KEY, state.items);
  }, [state.items]);

  useEffect(() => {
    saveBuyNowItem(state.buyNowItem);
  }, [state.buyNowItem]);

  const totalQuantity = useMemo(() => state.items.reduce((sum, i) => sum + i.quantity, 0), [state.items]);
  const subtotal = useMemo(() => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0), [state.items]);

  const value = useMemo(
    () => ({
      items: state.items,
      buyNowItem: state.buyNowItem,
      isDrawerOpen: state.isDrawerOpen,
      totalQuantity,
      subtotal,
      addToCart: (product, quantity = 1, variant = null) => {
        dispatch({ type: "ADD_ITEM", product, quantity, variant });
        toast.success(`${product.name} added to your cart`);
      },
      removeFromCart: (id, variant = null) => dispatch({ type: "REMOVE_ITEM", id, variant }),
      increaseQty: (id, variant = null) => dispatch({ type: "INCREASE_QTY", id, variant }),
      decreaseQty: (id, variant = null) => dispatch({ type: "DECREASE_QTY", id, variant }),
      setQty: (id, variant, quantity) => dispatch({ type: "SET_QTY", id, variant, quantity }),
      clearCart: () => dispatch({ type: "CLEAR_CART" }),
      setBuyNowItem: (product, quantity = 1, variant = null) =>
        dispatch({
          type: "SET_BUY_NOW",
          item: { id: product.id, name: product.name, image: product.image, price: product.price, quantity, variant: variant ?? null },
        }),
      clearBuyNowItem: () => dispatch({ type: "CLEAR_BUY_NOW" }),
      openDrawer: () => dispatch({ type: "OPEN_DRAWER" }),
      closeDrawer: () => dispatch({ type: "CLOSE_DRAWER" }),
      toggleDrawer: () => dispatch({ type: state.isDrawerOpen ? "CLOSE_DRAWER" : "OPEN_DRAWER" }),
    }),
    [state.items, state.buyNowItem, state.isDrawerOpen, totalQuantity, subtotal, toast]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
