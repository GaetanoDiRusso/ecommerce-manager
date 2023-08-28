import React from "react";
import CircleImageMenu from "src/components/ui/CircleImageMenu";
import useViewModel from "./useViewModel";

const Navbar = () => {
  const { user, onLogout } = useViewModel();

  return (
    <div className="flex py-2 px-5 h-[80px] w-full items-center justify-between bg-zinc-100">
      <h1 className="text-5xl font-bold">Ecommerce manager</h1>
      <CircleImageMenu
        username={`${user!.firstName} ${user!.lastName}`}
        menuItems={[{ label: "Cerrar sesion", onClick: onLogout }]}
      />
    </div>
  );
};

// const styles = {
//   mainContainer: css({
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     height: "80px",
//     width: "100%",
//     padding: "30px",
//     background: colors.primary,
//   }),
// };

export default Navbar;
