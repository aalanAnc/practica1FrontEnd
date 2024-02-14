import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import { StarShip } from "../types.tsx";

type Data = {
  page: string;
  results: StarShip[];
};

export const handler: Handlers<Data> = {
  async GET(_req: Request, ctx: FreshContext<unknown, Data>) {
    try {
      const { page } = ctx.params;
      const response = await Axios.get<Data>(
        `https://swapi.dev/api/starships/?page=${page}`,
      );
      return ctx.render({ ...response.data, page });
    } catch (error) {
      console.error(error);
      throw new Error("Ha ocurrido un Error");
    }
  },
};

const Page = (props: PageProps<Data>) => {
  console.log(props);
  const { results, page } = props.data;
  return (
    <div>
      <ul>
        {results.map((starship) => (
          <li key={starship.name}>
            <p>Name: {starship.name}</p>
            <p>Model: {starship.model}</p>
            <p>Manufactura: {starship.manufacturer}</p>
            <p>Credits: {starship.cost_in_credits}</p>
          </li>
        ))}
      </ul>
      {parseInt(page) > 1 && (
        <button>
          <a href={`/starships/${parseInt(page) - 1}`}>Previous</a>
        </button>
      )}
      {parseInt(page) < 4 && (
        <button>
          <a href={`/starships/${parseInt(page) + 1}`}>Next</a>
        </button>
      )}
      <button>
        <a href={`http://localhost:8000/`}>Menu</a>
      </button>
      <form method="get">
        <input type="text" name="page" />
        <button type="submit">Ir a pagina</button>
      </form>
    </div>
  );
};
/**
 * He tenido que eliminar action="/starships/page"
 * porque al hacer la busqueda me llevaba a http://localhost:8000/starships/3?page=7
 * y no consegui hacer que me llevase a http://localhost:8000/starships/(pagina en el textfield)
 */
export default Page;
