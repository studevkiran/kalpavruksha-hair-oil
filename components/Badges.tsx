export default function Badges() {
  const items = [
    { label: 'Power of Natural Herbs' },
    { label: 'Hand Made' },
    { label: 'Chemical Free' },
    { label: 'Easy to use' },
    { label: 'For all ages & genders' },
    { label: 'Prevents greying' },
    { label: 'Strengthens roots' },
  ]
  return (
    <section className="container-section py-10">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {items.map((it) => (
          <div key={it.label} className="badge justify-center text-center">
            {it.label}
          </div>
        ))}
      </div>
    </section>
  )
}
