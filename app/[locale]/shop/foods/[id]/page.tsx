import FoodsStore from "@/components/shop/foods-store";

type Params = Promise<{ id: string }>


export default async function FoodsPage(props : {params :Params }) {
  const params = await props.params
  const foodcategory = params.id
  console.log(foodcategory);
  
  

  return (
    <section className="w-full pt-24">
      <FoodsStore params={params} />
    </section>
  )
}