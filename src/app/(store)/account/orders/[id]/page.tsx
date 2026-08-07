import { PageHeader } from "@/components/common/page-header";

type OrderPageProps = {
  params: Promise<{ id: string }>;
};

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = await params;
  return <PageHeader title={`Order ${id}`} description="Order detail placeholder." />;
}
