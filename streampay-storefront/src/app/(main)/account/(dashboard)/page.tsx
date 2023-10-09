import OverviewTemplate from "@modules/account/templates/overview-template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
  description: "Overview of your account activity.",
};

function Account() {
  // Optional: Add any component-level logic here.
  // For instance, you might fetch some basic user info to display
  // a personalized welcome message or other interactive elements.

  return (
    <div className="account-container">
      <OverviewTemplate />
      {/* Optional: Consider adding more features here */}
    </div>
  );
}

// Optional: Consider adding styles, for instance with styled-components or CSS Modules.
// .account-container {
//     padding: 20px;
//     background-color: #f9f9f9;
// }

export default Account;
