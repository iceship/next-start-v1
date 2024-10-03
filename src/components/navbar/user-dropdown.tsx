import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from "@nextui-org/react";
import { IconBrandGoogle } from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";

export default function UserDropdown() {
  const { data, status } = useSession();

  if (status === "authenticated") {
    const signOutClick = () =>
      signOut({
        callbackUrl: "/",
      });

    return (
      <Dropdown>
        <NavbarItem>
          <DropdownTrigger>
            <Avatar
              as="button"
              color="secondary"
              size="md"
              showFallback={!data.user?.image}
              src={data?.user?.image || ""}
            />
          </DropdownTrigger>
        </NavbarItem>
        <DropdownMenu
          aria-label="User menu actions"
          onAction={(actionKey) => console.log({ actionKey })}
        >
          <DropdownItem
            aria-label="Signed in as user email"
            key="profile"
            className="h-14 gap-2"
            showDivider
          >
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{data.user?.email}</p>
          </DropdownItem>
          <DropdownItem
            key="sign-out"
            color="danger"
            className="text-danger"
            onPress={signOutClick}
          >
            Sign Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
  return (
    <Button color="danger" variant="ghost">
      <IconBrandGoogle />
      Sign In
    </Button>
  );
}
