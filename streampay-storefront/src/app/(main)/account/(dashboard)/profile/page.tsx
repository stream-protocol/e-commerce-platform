import ProfileTemplate from "@modules/account/templates/profile-template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "View and edit your StreamPay™ profile.",
};

function Profile() {
  // Optional: Implement any component-level logic here.
  // For instance, a hook to fetch user profile data, or state to track any changes made.

  return (
    <div className="profile-container">
      {/* Optional: Add any other components or features here, like a password change section or avatar upload feature. */}
      <ProfileTemplate />
    </div>
  );
}

// Optional: Add styles for better visualization of the profile details and edit sections.
// .profile-container {
//     padding: 20px;
//     background-color: #f9f9f9;
// }

export default Profile;
