import MovieDetail from "./movie";

interface PageProps {
  params: { id: string };
}

export default async function MoviePage({ params }: PageProps) {
  const { id } = params;

  return (
    <div>
      <MovieDetail id={id} />
    </div>
  );
}
