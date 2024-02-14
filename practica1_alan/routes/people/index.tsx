import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import { People } from "../types.tsx";

export type Rs = {
  results: People[];
};

export const handler: Handlers = {
  async GET(req: Request, ctx: FreshContext<unknown, Rs>) {
    try {
      const url = new URL(req.url);
      const name = url.searchParams.get("name");

      const people = await Axios.get<Rs>(
        `https://swapi.dev/api/people/?search=${name}`,
      );
      return ctx.render(people.data);
    } catch (error) {
      console.error(error);
      throw new Error("Ha ocurrido un Error");
    }
  },
};

const Page = (props: PageProps<Rs>) => {
  try {
    console.log(props);
    const people = props.data;
    return (
      <div>
        <ul>
          <li>{people.results[0]?.name}</li>
          <li>{people.results[0]?.height}</li>
          <li>{people.results[0]?.mass}</li>
          <li>{people.results[0]?.gender}</li>
          <li>{people.results[0]?.birth_year}</li>
        </ul>
        <button>
          <a href={`http://localhost:8000/`}>Menu</a>
        </button>
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>Ha ocurrido un error al obtener los datos del personaje</div>;
  }
};

export default Page;
