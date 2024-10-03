import { Card, CardBody } from "@nextui-org/react";

import AuthButton from "./auth-button";

export default async function Login() {
  return (
    <div className="mb-6 text-center text-[25px] font-bold">
      <Card className="mx-auto mt-4 max-w-md">
        <CardBody className="text-center">
          <div className="justify-center">
            <div>
              <AuthButton />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
