import OrdersTemplate from "@modules/account/templates/orders-template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders",
  description: "Overview of your previous orders.",
};

function Orders() {
  // Optional: Implement any component-level logic here.
  // For instance, a hook to fetch the first page of orders, 
  // or state to track selected filters.

  return (
    <div className="orders-container">
      {/* Optional: Add interactivity features here like filters or search */}
      <OrdersTemplate />
    </div>
  );
}

// Optional: Add styles for better visualization of the orders list.
// .orders-container {
//     padding: 20px;
//     background-color: #f9f9f9;
// }

export default Orders;
