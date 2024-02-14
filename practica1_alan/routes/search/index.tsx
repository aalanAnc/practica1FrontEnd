import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

type Data = {
  name?: string;
};

const Page = (props: PageProps<Data>) => {
  return (
    <div>
      <form method="get" action="/people">
        <input type="text" name="name" />
        <button type="submit">Buscar personaje</button>
      </form>
      <button>
        <a href={`http://localhost:8000/`}>Menu</a>
      </button>
    </div>
  );
};

export default Page;
