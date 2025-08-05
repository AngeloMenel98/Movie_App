import MovieDetail from "./movie";

interface PageProps {
  params: { id: string };
}

export default async function MoviePage(props: PageProps) {
  const { id } = await props.params;

  return (
    <div>
      <MovieDetail id={id} />
    </div>
  );
}
