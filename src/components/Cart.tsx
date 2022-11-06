import React, { createRef } from "react";
import { FiShoppingCart } from "react-icons/fi";
import CartCss from "./cart.module.css";
import { AppStateContext } from "./AppState";

interface Props {}

interface State {
  isOpen: boolean;
}

class Cart extends React.Component<Props, State> {
  #containerRef: React.RefObject<HTMLDivElement>;
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.#containerRef = createRef();
  }

  handleOutsideclicks = (e: MouseEvent) => {
    if (
      this.#containerRef.current &&
      !this.#containerRef.current.contains(e.target as Node)
    ) {
      this.setState({ isOpen: false });
    }
  };

  componentDidMount(): void {
    document.addEventListener("mousedown", (e) => {
      this.handleOutsideclicks(e);
    });
  }

  componentWillUnmount(): void {
    document.removeEventListener("mousedown", (e) => {
      this.handleOutsideclicks(e);
    });
  }

  handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if ((e.target as HTMLElement).nodeName === "SPAN") {
    }
    this.setState((prev) => ({ isOpen: !prev.isOpen }));
  }

  render() {
    return (
      <AppStateContext.Consumer>
        {(state) => {
          const itemCount = state.cart.items.reduce((sum, item) => {
            return sum + item.quantity;
          }, 0);
          return (
            <div className={CartCss.cartContainer} ref={this.#containerRef}>
              <button
                type="button"
                className={CartCss.button}
                onClick={this.handleClick}
              >
                <FiShoppingCart />
                <span>{itemCount} pizza(s)</span>
              </button>
              <div
                style={{ display: this.state.isOpen ? "block" : "none" }}
                className={CartCss.cartDropDown}
              >
                <ul>
                  {state.cart.items.map((i) => {
                    return (
                      <li key={i.id}>
                        {i.name} &times; {i.quantity}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        }}
      </AppStateContext.Consumer>
    );
  }
}

export default Cart;
