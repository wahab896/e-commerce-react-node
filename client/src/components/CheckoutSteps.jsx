import { NavLink } from "react-router-dom";
const CheckoutSteps = ({ activeSteps = [] }) => {
  const steps = [
    { text: "Sign In", to: "/login" },
    { text: "Shipping", to: "/shipping" },
    { text: "Payment", to: "/payment" },
    { text: "Place Order", to: "/placeorder" },
  ];
  return (
    <div className="flex gap-x-8">
      {steps.map((s, i) => {
        return activeSteps.includes(i) ? (
          <NavLink className="text-gray-600" key={i} to={s.to}>
            {s.text}
          </NavLink>
        ) : (
          <span className="text-gray-300 cursor-default" key={i}>
            {s.text}
          </span>
        );
      })}
    </div>
  );
};

export default CheckoutSteps