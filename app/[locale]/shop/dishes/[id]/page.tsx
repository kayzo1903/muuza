import DishShowPage from "@/components/shop/dishes-show-page";

type Params = Promise<{ id: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>


export default async function DishesPage(props : {params :Params , searchParams : SearchParams}) {
  const params = await props.params
  
  
  return (
    <main className="pt-32 pb-8 lg:pt-16">
      <DishShowPage params={params} />
    </main>
  );
}
