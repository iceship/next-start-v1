import { Card, CardBody, User } from "@nextui-org/react";

import requireAuth from "@/utils/require-auth";

export default async function Profile() {
  const session = (await requireAuth())!;
  //const session = (await getServerAuthSession())!;
  return (
    <Card className="mx-auto mt-4 max-w-md">
      <CardBody>
        <User
          name={session.user?.name}
          description={session.user?.email}
          avatarProps={{
            showFallback: !session.user?.image,
            src: session.user?.image || "",
          }}
        />
      </CardBody>
    </Card>
  );
}
