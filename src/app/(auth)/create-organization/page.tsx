import { CreateOrganization } from "@clerk/nextjs";

export default function CreateOrganizationPage() {
  return (
    <CreateOrganization
      appearance={{
        elements: {
          card: "shadow-none",
        },
      }}
    />
  );
}
