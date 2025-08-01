'use client';

import { useEffect, useState } from 'react';

interface ServiceTesterProps<T> {
  service: () => Promise<T>;
  title?: string;
}

export function ServiceTester<T>({ service, title = 'Service Output' }: ServiceTesterProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    service()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [service]);

  return (
    <div className="p-4 border rounded shadow bg-white max-w-3xl mx-auto mt-4">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      {loading && <p>Cargando...</p>}
      {error && (
        <pre className="text-red-500 whitespace-pre-wrap">
          {JSON.stringify(error, null, 2)}
        </pre>
      )}
      {data && (
        <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto whitespace-pre-wrap">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}