export default function Benefits() {
  const points = [
    'Promotes hair growth',
    'Controls hair fall & dandruff',
    'Balances scalp heat',
    'Strengthens roots',
    'Suitable for all hair types',
  ]
  return (
    <section id="benefits" className="container-section py-12">
      <h2 className="font-heading text-2xl sm:text-3xl font-semibold">Benefits</h2>
      <ul className="mt-6 grid sm:grid-cols-2 gap-4 text-gray-800">
        {points.map((p) => (
          <li key={p} className="rounded-lg border border-gray-100 p-4 bg-white shadow-sm">{p}</li>
        ))}
      </ul>
    </section>
  )
}
