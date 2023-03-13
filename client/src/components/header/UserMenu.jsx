import { useState } from "react";
import UserMainMenu from "./userMenuParts/UserMainMenu";
import UserSettingsPrivacy from "./userMenuParts/UserSettingsPrivacy";
import UserHelpSupport from "./userMenuParts/UserHelpSupport";
import UserDisplay from "./userMenuParts/UserDisplay";

const UserMenu = ({ user }) => {
  const [visible, setVisible] = useState(0);

  return (
    <div className="mmenu">
      {visible === 0 && <UserMainMenu user={user} setVisible={setVisible} />}
      {visible === 1 && <UserSettingsPrivacy setVisible={setVisible} />}
      {visible === 2 && <UserHelpSupport setVisible={setVisible} />}
      {visible === 3 && <UserDisplay setVisible={setVisible} />}
    </div>
  );
};

export default UserMenu;
